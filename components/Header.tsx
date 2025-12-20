import React from 'react';
import { Heart, BookOpen, Activity, Users, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavClick: (id: string) => void;
  onEasterEgg?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavClick, onEasterEgg }) => {
  const navItems = [
    { id: 'cognition', label: '认知', icon: Sparkles, color: 'text-blue-400' },
    { id: 'life', label: '生活', icon: BookOpen, color: 'text-pink-400' },
    { id: 'medical', label: '医疗', icon: Activity, color: 'text-purple-400' },
    { id: 'community', label: '社群', icon: Users, color: 'text-cyan-400' },
  ];

  const handleLogoIconClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the scroll-to-top from the parent
    if (onEasterEgg) {
      onEasterEgg();
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b-0 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group select-none py-4"
          onClick={() => onNavClick('top')}
        >
          <div className="relative" onClick={handleLogoIconClick} title="✨ 秘密入口">
             {/* Gradient Halo */}
             <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-pink-200 to-blue-200 blur-md rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
             
             {/* Main Icon Container - Trans Flag Colors Gradient */}
             <div className="relative p-2.5 bg-gradient-to-br from-trans-blue via-trans-pink to-trans-white rounded-xl shadow-md group-hover:shadow-pink-200 transition-all duration-500 transform group-hover:rotate-6 border border-white/50 active:scale-95">
               <Heart size={20} className="text-white drop-shadow-sm" fill="currentColor" />
             </div>
          </div>
          <span className="text-xl font-bold text-ink-text tracking-wide group-hover:text-trans-blue transition-colors duration-500 font-serif">
            光棱自我
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-white/50 hover:text-slate-800 transition-all duration-300 flex items-center gap-2 group"
            >
              <item.icon size={16} className={`opacity-60 group-hover:opacity-100 ${item.color} transition-opacity`} />
              {item.label}
            </button>
          ))}
        </nav>
        
        {/* Mobile menu placeholder */}
        <div className="md:hidden text-slate-400 text-sm font-serif">
           目录
        </div>
      </div>
    </header>
  );
};

export default Header;