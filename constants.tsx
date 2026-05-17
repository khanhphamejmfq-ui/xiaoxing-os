import React from 'react';
import { AppConfig, AppID } from './types';
import {
  ChatTeardrop,
  GearSix,
  Palette,
  BookOpenText,
  SealCheck,
  House,
  Fire,
  Books,
  Question,
  Globe,
  PiggyBank,
  Sparkle,
  MusicNotes,
  PhoneCall,
  Brain,
  IdentificationCard,
  Heart,
  Sun,
} from '@phosphor-icons/react';

export const Icons: Record<string, React.FC<{ className?: string }>> = {
  User: ({ className }) => <IdentificationCard className={className} weight="bold" />,
  Chat: ({ className }) => <ChatTeardrop className={className} weight="bold" />,
  Settings: ({ className }) => <GearSix className={className} weight="bold" />,
  Appearance: ({ className }) => <Palette className={className} weight="bold" />,
  Date: ({ className }) => <Heart className={className} weight="bold" />,
  Journal: ({ className }) => <BookOpenText className={className} weight="bold" />,
  Schedule: ({ className }) => <SealCheck className={className} weight="bold" />,
  Room: ({ className }) => <House className={className} weight="bold" />,
  Social: ({ className }) => <Fire className={className} weight="bold" />,
  Study: ({ className }) => <Books className={className} weight="bold" />,
  FAQ: ({ className }) => <Question className={className} weight="bold" />,
  Worldbook: ({ className }) => <Globe className={className} weight="bold" />,
  Bank: ({ className }) => <PiggyBank className={className} weight="bold" />,
  SpecialMoments: ({ className }) => <Sparkle className={className} weight="bold" />,
  Music: ({ className }) => <MusicNotes className={className} weight="fill" />,
  Call: ({ className }) => <PhoneCall className={className} weight="bold" />,
  MemoryPalace: ({ className }) => <Brain className={className} weight="bold" />,
};

export const INSTALLED_APPS: AppConfig[] = [
  { id: AppID.Chat, name: '聊天', icon: 'Chat', color: 'green' },
  { id: AppID.MemoryPalace, name: '记忆宫殿', icon: 'MemoryPalace', color: 'violet' },
  { id: AppID.Call, name: '电话', icon: 'Call', color: 'emerald' },
  { id: AppID.Room, name: '小星的家', icon: 'Room', color: 'rose' },
  { id: AppID.User, name: '档案', icon: 'User', color: 'blue' },
  { id: AppID.Bank, name: '星星币', icon: 'Bank', color: 'amber' },
  { id: AppID.Journal, name: '日记本', icon: 'Journal', color: 'amber' },
  { id: AppID.Social, name: '朋友圈', icon: 'Social', color: 'pink' },
  { id: AppID.Study, name: '自习室', icon: 'Study', color: 'emerald' },
  { id: AppID.Music, name: '音乐', icon: 'Music', color: 'rose' },
  { id: AppID.Schedule, name: '提醒', icon: 'Schedule', color: 'cyan' },
  { id: AppID.Worldbook, name: '世界书', icon: 'Worldbook', color: 'indigo' },
  { id: AppID.Appearance, name: '外观', icon: 'Appearance', color: 'slate' },
  { id: AppID.FAQ, name: '使用帮助', icon: 'FAQ', color: 'indigo' },
  { id: AppID.Settings, name: '设置', icon: 'Settings', color: 'slate' },
];

export const DOCK_APPS = [AppID.Chat, AppID.Social, AppID.Music, AppID.Settings];
