import React, { useMemo } from 'react';

const FloatingElements: React.FC = () => {
  // Generate random particles for a magical, healing atmosphere
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 4}s`,
      size: Math.random() > 0.7 ? 'w-2 h-2' : 'w-1 h-1',
      type: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm rotate-45', // Dots and diamonds
      opacity: 0.3 + Math.random() * 0.4,
      color: Math.random() > 0.6 ? 'bg-blue-300' : (Math.random() > 0.5 ? 'bg-pink-200' : 'bg-white')
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Watercolor Stains - Blue primary */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-cyan-50/40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl animate-float mix-blend-multiply"></div>
      
      {/* Watercolor Stains - Pink accent */}
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-pink-100/40 to-purple-50/40 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-3xl animate-float-delayed mix-blend-multiply"></div>
      
      {/* Center White Wash */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-white/30 rounded-full blur-[80px] opacity-60"></div>

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.type} ${p.size} ${p.color} animate-twinkle shadow-[0_0_8px_rgba(255,255,255,0.8)]`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;