
import React, { useState } from 'react';
import type { Template, GeneratedContent } from '../types';
import { TEMPLATES } from '../constants';
import { generateText } from '../services/geminiService';
import GeneratedContentCard from './GeneratedContentCard';

interface ContentGeneratorProps {
    onContentGenerated: (content: GeneratedContent) => void;
    onToggleFavorite: (id: string) => void;
    onDelete: (id: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onSelect }: { selectedTemplate: Template | null; onSelect: (template: Template) => void; }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Choose a Template</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEMPLATES.map(template => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template)}
                    className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                        selectedTemplate?.id === template.id
                            ? 'border-brand-light dark:border-brand-dark ring-2 ring-brand-light dark:ring-brand-dark bg-purple-50 dark:bg-slate-700'
                            : 'border-gray-300 dark:border-slate-600 hover:border-brand-light dark:hover:border-brand-dark hover:shadow-lg'
                    }`}
                >
                    {template.icon}
                    <h4 className="font-bold mt-2 text-gray-800 dark:text-white">{template.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
                </button>
            ))}
        </div>
    </div>
);

const ContentGenerator = ({ onContentGenerated, onToggleFavorite, onDelete }: ContentGeneratorProps) => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(TEMPLATES[0]);
    const [keywords, setKeywords] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [latestResult, setLatestResult] = useState<GeneratedContent | null>(null);

    const handleGenerate = async () => {
        if (!selectedTemplate || !keywords.trim()) {
            setError('Please select a template and enter some keywords.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setLatestResult(null);

        try {
            const prompt = selectedTemplate.prompt(keywords);
            const resultText = await generateText(prompt);
            const newContent: GeneratedContent = {
                id: `gen_${Date.now()}`,
                templateName: selectedTemplate.name,
                prompt: keywords,
                result: resultText,
                timestamp: Date.now(),
                isFavorite: false,
            };
            onContentGenerated(newContent);
            setLatestResult(newContent);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDeleteResult = (id: string) => {
        onDelete(id);
        if (latestResult?.id === id) {
            setLatestResult(null);
        }
    }

    return (
        <div className="p-6 h-full overflow-y-auto space-y-8 animate-fade-in">
            <TemplateSelector selectedTemplate={selectedTemplate} onSelect={(t) => {
                setSelectedTemplate(t);
                setError(null);
            }} />
            
            {selectedTemplate && (
                <div className="animate-slide-in">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        Enter Your Keywords
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Describe what you want to generate. The more specific, the better!
                    </p>
                    <textarea
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder={selectedTemplate.placeholder}
                        className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition"
                        rows={4}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-brand-light to-brand-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            'Generate Content'
                        )}
                    </button>
                    {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                </div>
            )}
            
            <div className="space-y-4">
                {latestResult && (
                    <>
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Your Latest Creation</h3>
                         <GeneratedContentCard 
                            content={latestResult} 
                            onToggleFavorite={onToggleFavorite} 
                            onDelete={handleDeleteResult} 
                         />
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentGenerator;
