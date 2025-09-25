
import React from 'react';
import type { Template } from './types';
import { PostIcon, SocialIcon, AdIcon, BusinessIcon } from './components/Icons';

export const TEMPLATES: Template[] = [
  {
    id: 'blog-post',
    name: 'Blog Post Ideas',
    description: 'Generate creative blog post titles and ideas.',
    icon: <PostIcon className="w-8 h-8 text-rose-500" />,
    prompt: (keywords) => `Generate 5 engaging blog post ideas about: ${keywords}.`,
    placeholder: 'e.g., sustainable living, productivity hacks',
  },
  {
    id: 'social-media',
    name: 'Social Media Post',
    description: 'Create catchy captions for social media platforms.',
    icon: <SocialIcon className="w-8 h-8 text-sky-500" />,
    prompt: (keywords) => `Write 3 short and engaging social media captions for a post about: ${keywords}. Include relevant hashtags.`,
    placeholder: 'e.g., new product launch, behind the scenes',
  },
  {
    id: 'ad-copy',
    name: 'Ad Copy',
    description: 'Write compelling copy for digital advertisements.',
    icon: <AdIcon className="w-8 h-8 text-amber-500" />,
    prompt: (keywords) => `Generate 2 variations of compelling ad copy for a product described as: ${keywords}. Focus on benefits and a clear call to action.`,
    placeholder: 'e.g., eco-friendly coffee cups, AI-powered scheduling app',
  },
  {
    id: 'product-description',
    name: 'Product Description',
    description: 'Craft persuasive descriptions for your products.',
    icon: <BusinessIcon className="w-8 h-8 text-emerald-500" />,
    prompt: (keywords) => `Write a persuasive and detailed product description for: ${keywords}. Highlight key features and benefits for the target customer.`,
    placeholder: 'e.g., handmade leather wallet, online yoga course',
  },
];
