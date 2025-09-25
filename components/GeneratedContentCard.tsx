
import React, { useState } from 'react';
import type { GeneratedContent } from '../types';
import { StarIcon, CopyIcon, DownloadIcon, TrashIcon, CheckIcon } from './Icons';

interface GeneratedContentCardProps {
    content: GeneratedContent;
    onToggleFavorite: (id: string) => void;
    onDelete: (id: string) => void;
}

// Fix: Extracted props to an interface for better type checking and to fix JSX namespace error.
interface ActionButtonProps {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
    >
        {icon}
        {text}
    </button>
);

// Fix: Added React.FC to explicitly type as a Functional Component, fixing 'key' prop issue in parent components.
const GeneratedContentCard: React.FC<GeneratedContentCardProps> = ({ content, onToggleFavorite, onDelete }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content.result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content.result], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${content.templateName.replace(/\s+/g, '_')}_${content.id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden animate-fade-in border border-gray-200 dark:border-slate-700">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="uppercase tracking-wide text-sm text-brand-light dark:text-brand-light font-semibold">{content.templateName}</div>
                        <p className="block mt-1 text-xs leading-tight font-medium text-black dark:text-white">
                            Generated on {new Date(content.timestamp).toLocaleString()}
                        </p>
                    </div>
                    <button onClick={() => onToggleFavorite(content.id)} className="text-gray-400 hover:text-amber-400 transition-colors">
                        <StarIcon className="w-6 h-6" filled={content.isFavorite} />
                    </button>
                </div>
                <p className="mt-4 text-gray-500 dark:text-gray-300 whitespace-pre-wrap">{content.result}</p>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-700 flex items-center gap-2 flex-wrap">
                <ActionButton
                    icon={copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                    text={copied ? "Copied!" : "Copy"}
                    onClick={handleCopy}
                />
                <ActionButton
                    icon={<DownloadIcon className="w-4 h-4" />}
                    text="Download"
                    onClick={handleDownload}
                />
                <div className="flex-grow" />
                <button
                    onClick={() => onDelete(content.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete content"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default GeneratedContentCard;
