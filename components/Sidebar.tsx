
import React from 'react';
import type { View } from '../types';
import { MagicWandIcon, HistoryIcon, StarIcon } from './Icons';

interface SidebarProps {
    currentView: View;
    onViewChange: (view: View) => void;
}

// Fix: Extracted props to an interface and typed NavItem as a React.FC
// for better type checking and to resolve issues with the 'key' prop.
interface NavItemProps {
    icon: JSX.Element;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
            isActive
                ? 'bg-gradient-to-r from-brand-light to-brand-dark text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
        }`}
    >
        {React.cloneElement(icon, { className: 'w-5 h-5 mr-3' })}
        <span className="flex-1 text-left">{label}</span>
    </button>
);

const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
    const navItems = [
        { id: 'generator', label: 'Generator', icon: <MagicWandIcon /> },
        { id: 'history', label: 'History', icon: <HistoryIcon /> },
        { id: 'favorites', label: 'Favorites', icon: <StarIcon /> },
    ];

    return (
        <aside className="w-64 p-4 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex-shrink-0">
            <nav className="space-y-2">
                {navItems.map(item => (
                    <NavItem
                        key={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={currentView === item.id}
                        onClick={() => onViewChange(item.id as View)}
                    />
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
