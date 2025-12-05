import React, { useState } from 'react';
import { Tone, Length } from '../types';
import { Send, Eraser } from 'lucide-react';

interface InputSectionProps {
  input: string;
  setInput: (value: string) => void;
  tone: Tone;
  setTone: (value: Tone) => void;
  length: Length;
  setLength: (value: Length) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  input,
  setInput,
  tone,
  setTone,
  length,
  setLength,
  onGenerate,
  isGenerating,
}) => {
  const handleClear = () => setInput('');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-1">入力</h2>
        <p className="text-sm text-slate-500">単語、箇条書き、メモを入力してください</p>
      </div>

      <div className="flex-1 mb-4 relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`例：\n明日 会議 10時\n予算案について議論\nA案 B案 比較\n結論出したい\n遅刻厳禁`}
          className="w-full h-full min-h-[200px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400 text-base leading-relaxed transition-all"
          disabled={isGenerating}
        />
        {input && !isGenerating && (
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="クリア"
          >
            <Eraser className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">トーン</label>
          <div className="relative">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              disabled={isGenerating}
            >
              {Object.values(Tone).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">長さ</label>
          <div className="relative">
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as Length)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              disabled={isGenerating}
            >
              {Object.values(Length).map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!input.trim() || isGenerating}
        className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
          !input.trim() || isGenerating
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span>文章を生成中...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>文章に変換する</span>
          </>
        )}
      </button>
    </div>
  );
};

export default InputSection;