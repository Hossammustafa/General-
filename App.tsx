
import React, { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import type { View, GeneratedContent } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ContentGenerator from './components/ContentGenerator';
import ContentView from './components/ContentView';

const App = () => {
    const [currentView, setCurrentView] = useState<View>('generator');
    const [contentHistory, setContentHistory] = useLocalStorage<GeneratedContent[]>('contentHistory', []);

    const handleContentGenerated = (newContent: GeneratedContent) => {
        setContentHistory(prev => [newContent, ...prev]);
    };

    const handleToggleFavorite = (id: string) => {
        setContentHistory(prev =>
            prev.map(item =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    const handleDelete = (id: string) => {
        setContentHistory(prev => prev.filter(item => item.id !== id));
    };

    const favoriteContent = useMemo(() => {
        return contentHistory.filter(item => item.isFavorite).sort((a, b) => b.timestamp - a.timestamp);
    }, [contentHistory]);
    
    const sortedHistory = useMemo(() => {
        return [...contentHistory].sort((a, b) => b.timestamp - a.timestamp);
    }, [contentHistory]);

    const renderView = () => {
        switch (currentView) {
            case 'generator':
                return (
                    <ContentGenerator
                        onContentGenerated={handleContentGenerated}
                        onToggleFavorite={handleToggleFavorite}
                        onDelete={handleDelete}
                    />
                );
            case 'history':
                return (
                    <ContentView
                        title="Content History"
                        content={sortedHistory}
                        onToggleFavorite={handleToggleFavorite}
                        onDelete={handleDelete}
                        emptyStateMessage="You haven't generated any content yet."
                    />
                );
            case 'favorites':
                return (
                    <ContentView
                        title="Favorites"
                        content={favoriteContent}
                        onToggleFavorite={handleToggleFavorite}
                        onDelete={handleDelete}
                        emptyStateMessage="You haven't marked any content as favorite."
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen w-full flex-col font-sans text-gray-900 dark:text-gray-100">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar currentView={currentView} onViewChange={setCurrentView} />
                <main className="flex-1 bg-gray-100 dark:bg-slate-900 overflow-hidden">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
