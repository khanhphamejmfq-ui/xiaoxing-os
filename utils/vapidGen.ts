/**
 * Browser-only VAPID key-pair generator built on Web Crypto.
 *
 * Extracted from `worker/proactive-push/vapid-gen.html` so the Instant Push
 * settings modal can produce a fresh key pair in-app instead of asking the
 * user to open a standalone HTML file. Algorithm matches the standalone
 * tool: ECDSA P-256 → raw-export public key (uncompressed 0x04||X||Y, 65
 * bytes → ~87 base64url chars) and JWK `d` private key (~43 chars).
 *
 * Pure `crypto.subtle` — no deps. Requires a secure context (HTTPS or
 * localhost); falls back to a clear error message otherwise.
 */

const SECURE_CONTEXT_HINT =
  'Web Crypto (crypto.subtle) 不可用。请在 HTTPS 站点或 localhost 下打开 SullyOS。';

function getSubtleOrThrow(): SubtleCrypto {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error(SECURE_CONTEXT_HINT);
  }
  return crypto.subtle;
}

/** Encode an ArrayBuffer / Uint8Array as RFC 4648 §5 base64url (no padding). */
export function bytesToBase64Url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Decode a base64url string into a Uint8Array. Accepts padded or unpadded input. */
export function base64UrlToBytes(b64u: string): Uint8Array {
  const padded = b64u.replace(/-/g, '+').replace(/_/g, '/')
    + '='.repeat((4 - (b64u.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export interface VapidKeyPair {
  /** ~87 chars. Used for `applicationServerKey` and the Worker's `VAPID_PUBLIC_KEY` env. */
  publicKey: string;
  /** ~43 chars. Only destined for the Worker's `VAPID_PRIVATE_KEY` env — never persisted client-side. */
  privateKey: string;
}

/**
 * Generate a fresh VAPID (ECDSA P-256) key pair entirely client-side.
 * Identical to the standalone `vapid-gen.html` tool, just callable from React.
 */
export async function generateVapidKeyPair(): Promise<VapidKeyPair> {
  const subtle = getSubtleOrThrow();
  const kp = await subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign', 'verify'],
  );
  const pubRaw = await subtle.exportKey('raw', kp.publicKey);
  const privJwk = await subtle.exportKey('jwk', kp.privateKey);
  if (typeof privJwk.d !== 'string' || !privJwk.d) {
    throw new Error('VAPID 生成失败：私钥 JWK 中缺少 d 字段');
  }
  return { publicKey: bytesToBase64Url(pubRaw), privateKey: privJwk.d };
}

/**
 * Generate a cryptographically random base64url token suitable for
 * `AMSG_CLIENT_TOKEN`. Optional — the Worker also runs without one.
 * 32 random bytes → ~43 base64url chars, plenty of entropy for a casual
 * URL-direct abuse gate.
 */
export function generateClientToken(byteLength = 32): string {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error(SECURE_CONTEXT_HINT);
  }
  const buf = new Uint8Array(byteLength);
  crypto.getRandomValues(buf);
  return bytesToBase64Url(buf);
}
