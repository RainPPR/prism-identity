import React from 'react';
import { Section } from '../types';
import * as Icons from 'lucide-react';

interface ModuleListProps {
  sections: Section[];
  color: 'blue' | 'pink' | 'purple' | 'cyan';
  onSelect: (section: Section) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({ sections, color, onSelect }) => {
  const colorConfig = {
    blue: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-100',
      iconColor: 'text-blue-500',
      hoverShadow: 'hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.3)]',
    },
    pink: {
      bg: 'bg-pink-50/50',
      border: 'border-pink-100',
      iconColor: 'text-pink-500',
      hoverShadow: 'hover:shadow-[0_10px_40px_-15px_rgba(236,72,153,0.3)]',
    },
    purple: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-100',
      iconColor: 'text-purple-500',
      hoverShadow: 'hover:shadow-[0_10px_40px_-15px_rgba(168,85,247,0.3)]',
    },
    cyan: {
      bg: 'bg-cyan-50/50',
      border: 'border-cyan-100',
      iconColor: 'text-cyan-600',
      hoverShadow: 'hover:shadow-[0_10px_40px_-15px_rgba(6,182,212,0.3)]',
    },
  }[color];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section, index) => {
        const IconComponent = (Icons as any)[section.icon] || Icons.Feather; 

        return (
          <div
            key={section.id}
            onClick={() => onSelect(section)}
            className={`
              group relative p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer
              backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 overflow-hidden
              bg-white/70 ${colorConfig.border} ${colorConfig.hoverShadow}
            `}
          >
            {/* Soft Gradient Blob interaction */}
            <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 blur-3xl ${color === 'pink' ? 'bg-pink-300' : 'bg-blue-300'} group-hover:scale-125`}></div>

            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3.5 rounded-2xl bg-white shadow-sm ${colorConfig.iconColor} transition-colors duration-500`}>
                  <IconComponent size={22} strokeWidth={2} />
                </div>
                <div className="opacity-0 group-hover:opacity-50 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                  <Icons.MoveRight size={20} className={colorConfig.iconColor} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-ink-text mb-3 leading-tight font-serif tracking-wide group-hover:text-blue-600 transition-colors">
                {section.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-light">
                {section.shortDescription}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ModuleList;