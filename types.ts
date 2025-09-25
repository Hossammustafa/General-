
import React from 'react';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  prompt: (keywords: string) => string;
  placeholder: string;
}

export interface GeneratedContent {
  id: string;
  templateName: string;
  prompt: string;
  result: string;
  timestamp: number;
  isFavorite: boolean;
}

export type View = 'generator' | 'history' | 'favorites';
