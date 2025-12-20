import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ModuleList from './components/ModuleList';
import ModuleDetail from './components/ModuleDetail';
import QuoteCollection from './components/QuoteCollection';
import FloatingElements from './components/FloatingElements';
import { categories } from './data';
import { Section } from './types';
import * as Icons from 'lucide-react';

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [showQuoteCollection, setShowQuoteCollection] = useState(false);

  // Extract all quotes from data.ts
  const allQuotes = useMemo(() => {
    const quotes: string[] = [];
    categories.forEach(category => {
      category.sections.forEach(section => {
        section.content.forEach(block => {
          if (block.type === 'quote' && typeof block.value === 'string') {
            quotes.push(block.value);
          }
        });
      });
    });
    return quotes;
  }, []);

  const handleNavClick = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-800 selection:bg-trans-pink selection:text-white flex flex-col">
      <FloatingElements />
      
      <Header 
        onNavClick={handleNavClick} 
        onEasterEgg={() => setShowQuoteCollection(true)}
      />

      <main className="container mx-auto px-4 md:px-6 flex-grow pb-16">
        <Hero onStart={() => handleNavClick('cognition')} />
        
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          {categories.map((category) => {
            const IconComponent = (Icons as any)[category.icon] || Icons.Sparkles;
            
            return (
              <section id={category.id} key={category.id} className="scroll-mt-24">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-10 items-start md:items-end">
                  <div className={`p-4 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm border border-white group`}>
                    <IconComponent size={32} className={`text-${category.color}-400 group-hover:scale-110 transition-transform duration-500`} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-ink-text mb-3 font-serif">
                      {category.title}
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-light">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <ModuleList 
                   sections={category.sections} 
                   color={category.color}
                   onSelect={setSelectedSection} 
                />
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-200/50 bg-white/40 backdrop-blur-md w-full mt-auto">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-serif tracking-widest text-slate-500 mb-2">PRISM IDENTITY</p>
          <p>© 2024 光棱自我 · 探索无限可能</p>
          <p className="mt-4 opacity-70 text-xs leading-relaxed">
            Made with 🏳️‍⚧️ love, respect & courage. <br/>
            内容仅供参考，不构成专业医疗或法律建议。
          </p>
        </div>
      </footer>

      {/* Modal for Details */}
      {selectedSection && (
        <ModuleDetail 
          section={selectedSection} 
          onClose={() => setSelectedSection(null)} 
        />
      )}

      {/* Easter Egg Modal */}
      {showQuoteCollection && (
        <QuoteCollection 
          quotes={allQuotes} 
          onClose={() => setShowQuoteCollection(false)} 
        />
      )}
    </div>
  );
};

export default App;