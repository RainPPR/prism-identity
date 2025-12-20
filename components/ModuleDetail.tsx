import React from 'react';
import { Section, ContentBlock } from '../types';
import { X, ArrowLeft, ExternalLink, Info, Quote } from 'lucide-react';

interface ModuleDetailProps {
  section: Section;
  onClose: () => void;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ section, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Darker backdrop for focus */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Container - Fresh Glassmorphism Style */}
      <div className="relative bg-white/80 backdrop-blur-xl w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-scale-in border border-white/80 ring-1 ring-white">
        
        {/* Soft Ambient Blobs - Blue and Pink */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[80px] -z-10 translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100/50 rounded-full blur-[80px] -z-10 -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        
        {/* Header */}
        <div className="p-6 md:px-10 md:py-6 bg-white/50 backdrop-blur-md flex items-center justify-between shrink-0 border-b border-white/60 relative z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2.5 rounded-full bg-white hover:bg-blue-50 text-slate-500 hover:text-blue-500 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-text tracking-wide font-serif">{section.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="hidden md:block p-2.5 rounded-full bg-white hover:bg-pink-50 text-slate-500 hover:text-pink-500 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:px-12 md:py-10 space-y-12 custom-scrollbar relative z-10 scroll-smooth">
          {section.content.map((block, idx) => (
            <div 
              key={idx} 
              // Staggered slide up for general content
              className="opacity-0 animate-slide-up" 
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
            >
              {renderBlock(block)}
            </div>
          ))}
          
          <div className="pt-12 pb-6 text-center opacity-0 animate-slide-up" style={{ animationDelay: `${section.content.length * 100}ms`, animationFillMode: 'forwards' }}>
             {/* Simple Divider */}
            <div className="flex items-center justify-center gap-3 mb-8 opacity-40">
                <div className="h-px w-12 bg-slate-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <div className="h-px w-12 bg-slate-300 rounded-full"></div>
            </div>
            <button 
              onClick={onClose}
              className="px-10 py-3 rounded-full bg-white text-slate-500 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50 hover:text-slate-700 transition-all duration-300 text-sm tracking-widest border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              已阅 · 返回
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderBlock = (block: ContentBlock) => {
  switch (block.type) {
    case 'text':
      return (
        <p className="text-[17px] text-slate-700 leading-9 whitespace-pre-line tracking-wide font-light font-sans text-justify">
          {(block.value as string).split('**').map((part, i) => 
            i % 2 === 1 ? <span key={i} className="font-bold text-ink-text bg-gradient-to-r from-blue-100/50 to-pink-100/50 px-1 rounded-md box-decoration-clone">{part}</span> : part
          )}
        </p>
      );
    case 'info-box':
      return (
        <div className="bg-gradient-to-br from-blue-50/60 to-white border border-blue-100 rounded-[2rem] p-8 my-8 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-[100%] opacity-60"></div>
          
          <h4 className="text-lg font-bold text-blue-900/90 mb-4 flex items-center gap-2 font-serif relative z-10 tracking-wider">
            <Info size={18} className="text-blue-500" />
            {block.title}
          </h4>
          <p className="text-slate-700 leading-8 whitespace-pre-line relative z-10 font-sans text-justify text-[16px]">
             {(block.value as string).split('**').map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="text-blue-700 font-semibold">{part}</strong> : part
            )}
          </p>
        </div>
      );
    case 'image':
      return (
        <div className="rounded-[2rem] overflow-hidden shadow-lg my-12 group border-[4px] border-white bg-white relative">
          <img src={block.value as string} alt={block.alt} className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]" />
          {block.alt && (
            <div className="p-3 text-center bg-white/80 backdrop-blur-sm absolute bottom-4 left-4 right-4 rounded-xl border border-white/50">
              <p className="text-xs text-slate-500 font-serif tracking-[0.2em] uppercase">
                {block.alt}
              </p>
            </div>
          )}
        </div>
      );
    case 'quote':
      return (
        // Added 'animate-fade-scale' for the requested effect
        <div className="relative pl-10 pr-6 py-10 my-12 group rounded-3xl animate-fade-scale hover:bg-white/40 transition-colors duration-500">
           
           {/* 
              FLUID GRADIENT BAR (Left Side)
              Colors: Blue -> Pink -> Cyan
              Animation: pulsing and flowing
           */}
           <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-full overflow-hidden shadow-[0_0_15px_rgba(244,114,182,0.3)]">
             <div className="absolute inset-0 bg-gradient-to-b from-[#5BCEFA] via-[#F5A9B8] to-[#5BCEFA] bg-[length:400%_400%] animate-gradient-xy opacity-90 blur-[0.5px]"></div>
           </div>

           {/* Subtle background highlight behind text */}
           <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl -z-10"></div>

           {/* Quote Icon watermark */}
           <Quote className="absolute top-4 left-6 text-slate-200/50 -z-10" size={64} />

           {/* Quote Text - Using Zhi Mang Xing but keeping it readable */}
           <p className="relative z-10 text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-500 font-art leading-[1.6] select-none tracking-wide text-justify pl-4 drop-shadow-sm group-hover:scale-[1.01] transition-transform duration-700 ease-out origin-left">
            {block.value as string}
           </p>
        </div>
      );
    case 'list':
      return (
        <ul className="space-y-4 my-8">
          {(block.value as string[]).map((item, i) => (
            <li key={i} className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-white/60 border border-white/80 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
              <span className="mt-2.5 w-2 h-2 rounded-full bg-blue-300 group-hover:bg-pink-300 transition-colors duration-500 shrink-0 shadow-sm" />
              <span className="text-slate-700 leading-8 font-sans text-justify">
                {item.split('**').map((part, idx) => 
                  idx % 2 === 1 ? <strong key={idx} className="text-ink-text font-semibold">{part}</strong> : part
                )}
              </span>
            </li>
          ))}
        </ul>
      );
    case 'link-grid':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8">
          {(block.value as {title: string, url: string, desc: string}[]).map((link, i) => (
             <a 
               key={i} 
               href={link.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block p-6 rounded-[1.5rem] border border-white/80 bg-white/60 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
             >
               <div className="flex items-center justify-between mb-3">
                 <h4 className="font-bold text-ink-text text-lg group-hover:text-blue-500 transition-colors font-serif">{link.title}</h4>
                 <ExternalLink size={18} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
               </div>
               <p className="text-sm text-slate-500 leading-relaxed font-sans">{link.desc}</p>
             </a>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default ModuleDetail;