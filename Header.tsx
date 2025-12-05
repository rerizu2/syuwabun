import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            WordExpander <span className="text-indigo-600">AI</span>
          </h1>
        </div>
        <div className="text-xs sm:text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
          Powered by Gemini 2.5
        </div>
      </div>
    </header>
  );
};

export default Header;