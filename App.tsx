import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { Tone, Length } from './types';
import { generateExpandedTextStream } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.Business);
  const [length, setLength] = useState<Length>(Length.Standard);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!input.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setOutput('');

    try {
      const streamResult = await generateExpandedTextStream(input, tone, length);
      
      // Fixed: Iterate directly over the result and use .text property
      for await (const chunk of streamResult) {
        const chunkText = chunk.text;
        if (chunkText) {
          setOutput((prev) => prev + chunkText);
        }
      }
    } catch (err) {
      console.error(err);
      setError('文章の生成中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsGenerating(false);
    }
  }, [input, tone, length, isGenerating]);

  // Optional: Scroll to output on mobile when generation starts
  React.useEffect(() => {
    if (isGenerating && window.innerWidth < 1024) {
        const outputElement = document.getElementById('output-section');
        if (outputElement) {
            outputElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
  }, [isGenerating]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro / Banner */}
        <div className="mb-8 text-center sm:text-left">
           <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
             アイデアを、伝わる文章へ。
           </h2>
           <p className="text-slate-600 max-w-2xl">
             箇条書きや断片的なメモを入力するだけで、ビジネスメールからブログ記事まで、
             TPOに合わせた自然な文章をAIが瞬時に作成します。
           </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-auto lg:h-[600px]">
          {/* Left Column: Input */}
          <section className="h-full">
            <InputSection
              input={input}
              setInput={setInput}
              tone={tone}
              setTone={setTone}
              length={length}
              setLength={setLength}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </section>

          {/* Right Column: Output */}
          <section id="output-section" className="h-full min-h-[400px]">
            <OutputSection
              output={output}
              isGenerating={isGenerating}
              onRegenerate={handleGenerate}
            />
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} WordExpander AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;