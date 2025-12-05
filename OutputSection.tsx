import React, { useState } from 'react';
import { Copy, Check, RefreshCw, FileText } from 'lucide-react';

interface OutputSectionProps {
  output: string;
  isGenerating: boolean;
  onRegenerate: () => void; // Optional: If we want to allow quick retry
}

const OutputSection: React.FC<OutputSectionProps> = ({ output, isGenerating, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-md relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">生成結果</h2>
          <p className="text-sm text-slate-500">AIが整形した文章がここに表示されます</p>
        </div>
        
        {output && !isGenerating && (
          <div className="flex gap-2">
            {/* 
            <button 
              onClick={onRegenerate}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="再生成"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'コピー完了' : 'コピー'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative">
        {!output && !isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-sm font-medium">
              左側のフォームに単語を入力して<br />
              変換ボタンを押してください
            </p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-5 custom-scrollbar">
             {output ? (
               <div className="prose prose-slate prose-sm max-w-none whitespace-pre-wrap leading-7 text-slate-800">
                 {output}
                 {isGenerating && (
                   <span className="inline-block w-2 h-4 ml-1 align-middle bg-indigo-500 animate-pulse"></span>
                 )}
               </div>
             ) : (
                <div className="space-y-4 p-4 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
             )}
          </div>
        )}
      </div>
      
      {/* Decorative gradient blur for loading state background effect */}
      {isGenerating && !output && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>
      )}
    </div>
  );
};

export default OutputSection;