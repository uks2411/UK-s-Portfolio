import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const PixelatedReveal = ({ children }: { children: React.ReactNode }) => {
  const [revealed, setRevealed] = useState(false);
  const rows = 12;
  const cols = 12;
  const blocks = Array.from({ length: rows * cols }).map((_, i) => ({
    id: i,
    r: Math.floor(i / cols),
    c: i % cols
  }));

  return (
    <div 
      className="relative w-full h-full cursor-pointer"
      onClick={() => setRevealed(true)}
    >
      <div className="w-full h-full">
        {children}
      </div>
      
      <div 
        className={`absolute inset-0 z-20 grid overflow-hidden rounded-2xl ${revealed ? 'pointer-events-none' : ''}`}
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, 
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` 
        }}
      >
        {blocks.map(b => (
          <motion.div
            key={b.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: revealed ? 0 : 1 }}
            transition={{ 
              duration: 0.15,
              delay: revealed ? (b.r + b.c) * 0.04 : 0,
              ease: "linear"
            }}
            className="bg-black border-[0.5px] border-zinc-900"
          />
        ))}
      </div>

      <AnimatePresence>
        {!revealed && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
             <span className="bg-black/60 text-[#F87171] px-4 py-2 rounded-xl font-mono text-xs md:text-sm tracking-widest border border-[#F87171]/40 backdrop-blur-md animate-pulse shadow-[0_0_20px_rgba(248,113,113,0.3)]">
               TAP TO REVEAL
             </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
