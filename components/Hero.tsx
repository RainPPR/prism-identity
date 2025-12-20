import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative py-32 px-6 text-center max-w-5xl mx-auto overflow-visible">
      
      {/* Background Soft Blobs (Healing Aesthetic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-100/60 rounded-full blur-[80px] animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-100/60 rounded-full blur-[80px] animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Decorative tag */}
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 border border-white shadow-sm mb-10 animate-fade-in backdrop-blur-md">
        <Sparkles size={16} className="text-trans-blue" />
        <span className="text-sm font-serif text-slate-600 tracking-widest">
          独一无二 · 灵魂光谱
        </span>
        <Sparkles size={16} className="text-trans-pink" />
      </div>
      
      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-bold text-ink-text mb-8 leading-tight tracking-tight font-serif relative">
        <span className="relative z-10">探索心中的</span>
        <br className="md:hidden" />
        <span className="relative inline-block mx-2">
           <span className="relative z-10 font-art text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
             彩虹山水
           </span>
           {/* Soft Underline */}
           <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200/50 via-pink-200/50 to-blue-200/50 blur-sm rounded-full -z-10"></div>
        </span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
        性别非黑白之分，亦如水墨晕染，浓淡相宜。
        <br/>
        于此间，听风吟，观澜起，寻回真实的自己。
      </p>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white transition-all duration-500 ease-out bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-[0_10px_30px_-10px_rgba(168,85,247,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(245,169,184,0.6)] hover:-translate-y-1"
      >
        <span className="relative z-10 flex items-center font-serif tracking-widest">
          开启卷轴
          <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
      </button>
    </div>
  );
};

export default Hero;