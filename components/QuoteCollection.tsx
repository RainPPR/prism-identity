import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { X, Download, Sparkles, Heart } from 'lucide-react';

interface QuoteCollectionProps {
  quotes: string[];
  onClose: () => void;
}

const QuoteCollection: React.FC<QuoteCollectionProps> = ({ quotes, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveImage = async () => {
    if (!contentRef.current) return;

    setIsSaving(true);
    try {
      // High Quality Capture
      const canvas = await html2canvas(contentRef.current, {
        scale: 4, 
        backgroundColor: '#FDFBF7', // Keeps the warm rice paper look for export
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `prism-ink-collection-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('保存图片失败，可能图片过长，请尝试分段保存或使用电脑浏览器。');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up border border-white/40">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200/50 bg-[#FDFBF7]/90 backdrop-blur-sm flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="text-trans-pink" size={20} />
            <h2 className="text-xl font-bold text-ink-text font-serif tracking-wide">拾光集 · 墨染流年</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto custom-scrollbar flex-grow bg-[#FDFBF7]">
           {/* 
              CAPTURE AREA 
           */}
           <div 
             ref={contentRef} 
             id="quote-collection-capture"
             className="relative p-8 md:p-16 space-y-20 min-h-full overflow-hidden"
             style={{
                backgroundColor: '#FDFBF7', 
                color: '#2C3E50',
             }}
           >
             {/* 1. Paper Texture Overlay */}
             <div 
               className="absolute inset-0 pointer-events-none opacity-[0.06] z-0" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               }}
             />

             {/* 2. Background Ink Wash (Subtle) */}
             <div 
                className="absolute top-0 right-[-10%] w-[600px] h-[600px] opacity-10 blur-[80px]"
                style={{
                  background: 'radial-gradient(circle at center, #5BCEFA 0%, transparent 60%)',
                }}
             />
             <div 
                className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] opacity-10 blur-[80px]"
                style={{
                  background: 'radial-gradient(circle at center, #F5A9B8 0%, transparent 60%)',
                }}
             />
             
             {/* Inner Frame */}
             <div className="absolute inset-6 border border-stone-800/5 rounded-[1rem] pointer-events-none z-0"></div>

             {/* 3. Title Section */}
             <div className="relative z-10 text-center mb-16 pt-8">
               <h3 className="text-5xl font-art text-ink-text leading-tight opacity-90 drop-shadow-sm mb-4">
                 光棱自我
               </h3>
               <p className="text-stone-400 text-xs font-serif tracking-[0.4em] uppercase">
                 Prism Identity Collection
               </p>
             </div>

             {/* 4. Quotes Content - Fixed Layout */}
             <div className="relative z-10 space-y-16">
               {quotes.map((quote, idx) => (
                 <div key={idx} className="flex gap-6 items-stretch relative group">
                    
                    {/* Left Column: Number and Line */}
                    <div className="flex flex-col items-center shrink-0 w-12 pt-1">
                        {/* No. X Identifier */}
                        <div className="text-center mb-2">
                           <span className="block text-[10px] text-stone-300 font-serif tracking-widest uppercase">No.</span>
                           <span className="block text-xl font-serif text-stone-400 font-bold leading-none">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                        
                        {/* Gradient Line - Using flex-grow to stretch full height of content */}
                        <div className="flex-grow w-[2px] bg-gradient-to-b from-stone-200 via-stone-300 to-transparent rounded-full mt-2"></div>
                    </div>

                    {/* Right Column: Quote Text */}
                    <div className="flex-grow pb-8">
                       <p className="text-2xl md:text-3xl font-art text-stone-700 leading-[1.8] text-justify drop-shadow-sm">
                         {quote}
                       </p>
                    </div>
                 </div>
               ))}
             </div>

             {/* 5. Footer Seal */}
             <div className="relative z-10 pt-20 mt-10 text-center border-t border-stone-100/50">
               <div className="flex flex-col items-center justify-center gap-6 mt-8">
                 {/* The Red Seal */}
                 <div className="w-12 h-12 bg-red-800/80 rounded-lg flex items-center justify-center shadow-sm border border-red-900/10 rotate-3 opacity-90">
                   <div className="border border-white/40 w-9 h-9 flex flex-col items-center justify-center text-white/90 font-art text-[10px] leading-none p-0.5">
                     <span>光棱</span>
                     <span>印记</span>
                   </div>
                 </div>

                 <div className="flex items-center gap-3 text-stone-400 text-xs font-serif opacity-70">
                   <div className="h-px w-6 bg-stone-300"></div>
                   <span>Made with love, respect & courage</span>
                   <div className="h-px w-6 bg-stone-300"></div>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Footer Actions (UI Only) */}
        <div className="p-6 border-t border-stone-200/50 bg-[#FDFBF7]/90 backdrop-blur-md flex justify-between items-center shrink-0 z-20">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-stone-500 font-serif hover:bg-stone-100 transition-colors"
          >
            关闭
          </button>
          
          <button 
            onClick={handleSaveImage}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed font-serif tracking-wide"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>宣纸铺展中...</span>
              </>
            ) : (
              <>
                <Download size={18} />
                <span>保存珍藏长卷</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCollection;