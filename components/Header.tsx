
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, MagicWandIcon } from './Icons';

const useTheme = () => {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
};

// A simplified version of useLocalStorage for client-side theme switching
function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}


const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </button>
    );
};


const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-brand-light to-brand-dark rounded-lg">
                    <MagicWandIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    ContentGenie Pro
                </h1>
            </div>
            <ThemeToggle />
        </header>
    );
};

export default Header;
