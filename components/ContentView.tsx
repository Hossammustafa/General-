
import React from 'react';
import type { GeneratedContent } from '../types';
import GeneratedContentCard from './GeneratedContentCard';

interface ContentViewProps {
    title: string;
    content: GeneratedContent[];
    onToggleFavorite: (id: string) => void;
    onDelete: (id: string) => void;
    emptyStateMessage: string;
}

const ContentView = ({ title, content, onToggleFavorite, onDelete, emptyStateMessage }: ContentViewProps) => {
    return (
        <div className="p-6 h-full overflow-y-auto animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{title}</h2>
            {content.length > 0 ? (
                <div className="space-y-4">
                    {content.map(item => (
                        <GeneratedContentCard
                            key={item.id}
                            content={item}
                            onToggleFavorite={onToggleFavorite}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-1/2">
                    <p className="text-gray-500 dark:text-gray-400">{emptyStateMessage}</p>
                </div>
            )}
        </div>
    );
};

export default ContentView;
