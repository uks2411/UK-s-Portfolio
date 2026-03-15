import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, Code2, Heart, CircleUser, Briefcase, X,
  QrCode, ArrowUpRight, Github, ChevronLeft
} from 'lucide-react';
import { HeartGame } from './components/HeartGame';
import { Analytics } from "@vercel/analytics/react";

type Section = 'hub' | 'about' | 'linkedin' | 'leetcode' | 'support' | 'projects' | 'github';

// Replaced emojis with technical terms for a more professional, cyberpunk/developer aesthetic
const RAIN_ITEMS = [
  'TECH', 'stonks', 'pizzaa', '💸','🧑‍💻','🏀','porsche','bmw','📈','💰','😵‍💫','🙂‍↔️','👾'
];

const RainfallBackground = ({ mode = 'default' }: { mode?: 'default' | 'github' }) => {
  const isGithub = mode === 'github';
  
  const [defaultDrops] = useState(() => 
    Array.from({ length: 60 }).map((_, i) => ({
      id: `def-${i}`,
      content: RAIN_ITEMS[Math.floor(Math.random() * RAIN_ITEMS.length)],
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 15 + 15}s`, 
      delay: `-${Math.random() * 30}s`,
      opacity: Math.random() * 0.35 + 0.1,
      scale: Math.random() * 0.3 + 0.7,
      color: '#00FF66'
    }))
  );

  const [githubDrops] = useState(() => 
    Array.from({ length: 100 }).map((_, i) => ({
      id: `gh-${i}`,
      content: Math.random() > 0.5 ? '0' : '1',
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 10}s`, 
      delay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.3 + 0.7,
      color: Math.random() > 0.5 ? '#06B6D4' : '#1E3A8A'
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes rain-fall {
          0% { transform: translateY(-30vh); }
          100% { transform: translateY(130vh); }
        }
      `}</style>
      
      {/* Default Drops */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isGithub ? 'opacity-0' : 'opacity-100'}`}>
        {defaultDrops.map(drop => (
          <div
            key={drop.id}
            className="absolute top-0 font-mono font-medium flex flex-col items-center justify-center transition-colors duration-1000"
            style={{
              left: drop.left,
              opacity: drop.opacity,
              color: drop.color,
              transform: `scale(${drop.scale})`,
              animation: `rain-fall ${drop.duration} linear infinite`,
              animationDelay: drop.delay,
            }}
          >
            {drop.content}
          </div>
        ))}
      </div>

      {/* Github Drops */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isGithub ? 'opacity-100' : 'opacity-0'}`}>
        {githubDrops.map(drop => (
          <div
            key={drop.id}
            className="absolute top-0 font-mono font-medium flex flex-col items-center justify-center transition-colors duration-1000"
            style={{
              left: drop.left,
              opacity: drop.opacity,
              color: drop.color,
              transform: `scale(${drop.scale})`,
              animation: `rain-fall ${drop.duration} linear infinite`,
              animationDelay: drop.delay,
            }}
          >
            {drop.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const Typewriter = ({ text, speed = 150, continuous = true }: { text: string, speed?: number, continuous?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (continuous && !isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setIsTyping(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    if (!continuous && !isTyping) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, isTyping, continuous]);

  return (
    <span className="font-mono">
      {displayedText}
      {isTyping && <span className="animate-pulse">_</span>}
    </span>
  );
};

const Hint: React.FC<{ icon: React.ReactNode, label: string, angle: number, active: boolean, colorTheme?: 'white' | 'green' | 'purple' | 'blue' | 'orange' | 'red' | 'yellow', index: number }> = ({ icon, label, angle, active, colorTheme = 'white', index }) => {
  const angleRad = (angle * Math.PI) / 180;
  const mobileR = 130;
  const desktopR = 180;
  const txM = mobileR * Math.cos(angleRad);
  const tyM = mobileR * Math.sin(angleRad);
  const txD = desktopR * Math.cos(angleRad);
  const tyD = desktopR * Math.sin(angleRad);

  const colors = {
    white: { text: 'text-white', border: 'border-white/40', activeBorder: 'border-white', glow: 'shadow-[0_0_15px_rgba(255,255,255,0.3)]', activeGlow: 'shadow-[0_0_35px_rgba(255,255,255,0.8)]', bg: 'bg-white/20' },
    green: { text: 'text-[#00FF66]', border: 'border-[#00FF66]/40', activeBorder: 'border-[#00FF66]', glow: 'shadow-[0_0_15px_rgba(0,255,102,0.3)]', activeGlow: 'shadow-[0_0_35px_rgba(0,255,102,0.8)]', bg: 'bg-[#00FF66]/20' },
    purple: { text: 'text-[#D946EF]', border: 'border-[#D946EF]/40', activeBorder: 'border-[#D946EF]', glow: 'shadow-[0_0_15px_rgba(217,70,239,0.3)]', activeGlow: 'shadow-[0_0_35px_rgba(217,70,239,0.8)]', bg: 'bg-[#D946EF]/20' },
    blue: { text: 'text-[#38BDF8]', border: 'border-[#38BDF8]/40', activeBorder: 'border-[#38BDF8]', glow: 'shadow-[0_0_15px_rgba(56,189,248,0.3)]', activeGlow: 'shadow-[0_0_35px_rgba(56,189,248,0.8)]', bg: 'bg-[#38BDF8]/20' },
    orange: { text: 'text-[#FB923C]', border: 'border-[#FB923C]/40', activeBorder: 'border-[#FB923C]', glow: 'shadow-[0_0_15px_rgba(251,146,60,0.3)]', activeGlow: 'shadow-[0_0_35px_rgba(251,146,60,0.8)]', bg: 'bg-[#FB923C]/20' },
    red: { text: 'text-[#F87171]', border: 'border-[#F87171]/40', activeBorder: 'border-[#F87171]', glow: 'shadow-[0_0_15px_rgba(248,113,113,0.3)]', activeGlow: 'shadow-[0_0_35px_rgba(248,113,113,0.8)]', bg: 'bg-[#F87171]/20' },
    yellow: { text: 'text-[#FDE047]', border: 'border-[#FDE047]/40', activeBorder: 'border-[#FDE047]', glow: 'shadow-[0_0_15px_rgba(253,224,71,0.3)]', activeGlow: 'shadow-[0_0_35px_rgba(253,224,71,0.8)]', bg: 'bg-[#FDE047]/20' },
  };
  const activeStyle = colors[colorTheme];

  return (
    <div 
      className="absolute flex items-center justify-center pointer-events-none translate-x-[var(--tx-m)] translate-y-[var(--ty-m)] md:translate-x-[var(--tx-d)] md:translate-y-[var(--ty-d)]"
      style={{
        '--tx-m': `${txM}px`,
        '--ty-m': `${tyM}px`,
        '--tx-d': `${txD}px`,
        '--ty-d': `${tyD}px`,
      } as React.CSSProperties}
    >
      <motion.div 
        animate={{ 
          scale: active ? 1.15 : 1,
        }}
        className="flex flex-col items-center transition-all duration-500 relative"
      >
        <div 
          className={`p-3 md:p-5 rounded-full border backdrop-blur-md transition-all duration-500 relative overflow-hidden ${
            active 
              ? `${activeStyle.bg} ${activeStyle.activeBorder} ${activeStyle.activeGlow}` 
              : `bg-black/60 ${activeStyle.border} ${activeStyle.glow}`
          }`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 z-0"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3, delay: index * 0.4 }}
          />
          <div className="relative z-10">
            {React.cloneElement(icon as React.ReactElement, { 
              className: `w-5 h-5 md:w-7 md:h-7 transition-colors duration-500 ${activeStyle.text} ${active ? 'opacity-100' : 'opacity-70'}`
            })}
          </div>
        </div>
        <span 
          className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] absolute -bottom-6 md:-bottom-8 whitespace-nowrap transition-colors duration-500 ${activeStyle.text} ${active ? 'opacity-100 drop-shadow-[0_0_8px_currentColor]' : 'opacity-50'}`}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
};

const TARGETS = [
  { id: 'about', angle: -90, label: 'About', icon: <CircleUser />, colorTheme: 'purple' as const },
  { id: 'support', angle: -30, label: 'Support', icon: <Heart />, colorTheme: 'red' as const },
  { id: 'linkedin', angle: 30, label: 'LinkedIn', icon: <Linkedin />, colorTheme: 'blue' as const },
  { id: 'projects', angle: 90, label: 'Projects', icon: <Briefcase />, colorTheme: 'yellow' as const },
  { id: 'leetcode', angle: 150, label: 'LeetCode', icon: <Code2 />, colorTheme: 'orange' as const },
  { id: 'github', angle: -150, label: 'GitHub', icon: <Github />, colorTheme: 'green' as const },
];

const UKLogoHub = ({ onNavigate }: { onNavigate: (s: Section) => void }) => {
  const [dragInfo, setDragInfo] = useState({ x: 0, y: 0 });

  const dragDist = Math.sqrt(dragInfo.x ** 2 + dragInfo.y ** 2);
  const dragAngle = Math.atan2(dragInfo.y, dragInfo.x) * (180 / Math.PI);
  
  const getActiveTarget = () => {
    if (dragDist < 40) return null;
    let closest = null;
    let minDiff = Infinity;
    TARGETS.forEach(t => {
      let diff = Math.abs(dragAngle - t.angle);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closest = t.id;
      }
    });
    if (minDiff <= 36) return closest;
    return null;
  };
  const activeTarget = getActiveTarget();

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Navigation Hints Container */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center z-10">
        {TARGETS.map((t, i) => (
          <Hint 
            key={t.id} 
            icon={t.icon} 
            label={t.label} 
            angle={t.angle} 
            active={activeTarget === t.id} 
            colorTheme={t.colorTheme} 
            index={i}
          />
        ))}
      </div>

      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.4}
        onDrag={(_, info) => setDragInfo({ x: info.offset.x, y: info.offset.y })}
        onDragEnd={(_, info) => {
          const { x, y } = info.offset;
          const dist = Math.sqrt(x * x + y * y);
          const threshold = typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 100;
          
          if (dist > threshold) {
            const angle = Math.atan2(y, x) * (180 / Math.PI);
            let closest = null;
            let minDiff = Infinity;
            TARGETS.forEach(t => {
              let diff = Math.abs(angle - t.angle);
              if (diff > 180) diff = 360 - diff;
              if (diff < minDiff) {
                minDiff = diff;
                closest = t.id;
              }
            });
            if (minDiff <= 36 && closest) {
              onNavigate(closest as Section);
            }
          }
          setDragInfo({ x: 0, y: 0 });
        }}
        className="relative z-20 cursor-grab active:cursor-grabbing"
      >
        <motion.div 
          animate={{ 
            scale: dragInfo.x !== 0 || dragInfo.y !== 0 ? 1.02 : 1,
            boxShadow: dragInfo.x !== 0 || dragInfo.y !== 0 ? '0 0 40px rgba(0,255,102,0.25)' : '0 0 20px rgba(255,255,255,0.15)'
          }}
          className="relative flex items-center justify-center w-28 h-28 md:w-44 md:h-44 border-2 border-white rounded-full bg-black/80 backdrop-blur-2xl transition-shadow duration-500"
        >
          <span className="text-5xl md:text-7xl font-serif italic tracking-tighter text-white select-none inline-flex -translate-y-1 md:-translate-y-2">
            <span>U</span>
            <span className="text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.4)] translate-y-[0.45em] -ml-1 md:-ml-2">K</span>
          </span>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t border-[#00FF66]/40 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-8px] border-b border-white/20 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

const Spotlight = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');
  const fullText = "SYSTEM.COOK() ... CONTACTING WALL-E ...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const sequence = isMobile ? [
    { x: 0, y: 400, s: 0.5 },
    { x: 0, y: 130, s: 1 },    // Projects
    { x: 113, y: 65, s: 1 },   // LinkedIn
    { x: 113, y: -65, s: 1 },  // Support
    { x: 0, y: -130, s: 1 },   // About
    { x: -113, y: -65, s: 1 }, // GitHub
    { x: -113, y: 65, s: 1 },  // LeetCode
    { x: 0, y: 0, s: 2 },
    { x: 0, y: 0, s: 40 },
  ] : [
    { x: 0, y: 500, s: 0.5 },
    { x: 0, y: 180, s: 1 },    // Projects
    { x: 156, y: 90, s: 1 },   // LinkedIn
    { x: 156, y: -90, s: 1 },  // Support
    { x: 0, y: -180, s: 1 },   // About
    { x: -156, y: -90, s: 1 }, // GitHub
    { x: -156, y: 90, s: 1 },  // LeetCode
    { x: 0, y: 0, s: 2.5 },
    { x: 0, y: 0, s: 50 },
  ];

  return (
    <motion.div 
      className="absolute inset-0 z-[60] flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 7.5, duration: 1.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="absolute w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full"
        style={{
          boxShadow: 'inset 0 0 40px rgba(255,255,255,0.8), 0 0 70px 30px rgba(255,255,255,0.6), 0 0 0 9999px #000',
          background: 'transparent',
        }}
        initial={{ x: sequence[0].x, y: sequence[0].y, scale: sequence[0].s }}
        animate={{ 
          x: sequence.map(p => p.x),
          y: sequence.map(p => p.y),
          scale: sequence.map(p => p.s)
        }}
        transition={{ 
          duration: 9, 
          times: [0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72, 0.85, 1],
          ease: "easeInOut"
        }}
      />
      <div className="absolute bottom-24 md:bottom-32 text-[#00FF66] font-mono tracking-widest text-xs md:text-sm z-50 text-center px-4">
        {text}
        <motion.span 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
        >_</motion.span>
      </div>
    </motion.div>
  );
};

const BLUE_EMOJIS = ['👤', '👥'];

const BouncingBlueEmojis = () => {
  const [emojis] = useState(() => 
    Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      emoji: BLUE_EMOJIS[Math.floor(Math.random() * BLUE_EMOJIS.length)],
      size: Math.random() * 32 + 32, // 32px to 64px
      startX: Math.random() * 100, // vw
      startY: Math.random() * 100, // vh
      endX: Math.random() * 100, // vw
      endY: Math.random() * 100, // vh
      durationX: Math.random() * 15 + 15, // 15s to 30s for smoother, slower movement
      durationY: Math.random() * 15 + 15,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {emojis.map((item) => (
        <motion.div
          key={item.id}
          className="absolute opacity-20"
          initial={{ x: `${item.startX}vw`, y: `${item.startY}vh` }}
          animate={{ x: `${item.endX}vw`, y: `${item.endY}vh`, rotate: 360 }}
          transition={{
            x: { duration: item.durationX, repeat: Infinity, repeatType: "mirror", ease: "linear" },
            y: { duration: item.durationY, repeat: Infinity, repeatType: "mirror", ease: "linear" },
            rotate: { duration: item.durationX * 2, repeat: Infinity, ease: "linear" }
          }}
          style={{ fontSize: item.size, willChange: 'transform' }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedNumber = ({ from, to, duration = 2000, delay = 0, format = (v: number) => v.toString() }: { from: number, to: number, duration?: number, delay?: number, format?: (v: number) => string }) => {
  const [value, setValue] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    let timeoutId: NodeJS.Timeout;

    const update = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const current = from + (to - from) * easeProgress;
      setValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      } else {
        setValue(to);
      }
    };

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        animationFrame = requestAnimationFrame(update);
      }, delay);
    } else {
      animationFrame = requestAnimationFrame(update);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [from, to, duration, delay]);

  return <>{format(Math.round(value))}</>;
};

const AnimatedWords = () => {
  const words = [
    { text: 'Tech', color: '#00FF66' },    // Neon Green
    { text: 'Finance', color: '#38BDF8' }, // Neon Blue
    { text: 'Cars', color: '#F87171' }     // Neon Red
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= words.length - 1) {
          setDirection(-1);
          return prev - 1;
        }
        if (prev <= 0) {
          setDirection(1);
          return prev + 1;
        }
        return prev + direction;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [direction, words.length]);

  return (
    <div className="mt-16 flex justify-center items-center gap-8 md:gap-16">
      {words.map((wordObj, index) => {
        const isActive = index === activeIndex;
        const activeColor = wordObj.color;
        
        return (
          <div key={wordObj.text} className="relative flex flex-col items-center">
            <motion.span 
              animate={{ 
                opacity: isActive ? 1 : 0.4,
                scale: isActive ? 1.05 : 1,
                color: isActive ? activeColor : '#A1A1AA',
                textShadow: isActive ? `0 0 12px ${activeColor}80` : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="text-sm md:text-lg font-medium tracking-widest uppercase font-mono"
            >
              {wordObj.text}
            </motion.span>
            {isActive && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-4 w-full h-[2px]"
                style={{ backgroundColor: activeColor }}
                animate={{
                  boxShadow: [`0 0 5px ${activeColor}`, `0 0 20px ${activeColor}`, `0 0 5px ${activeColor}`],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  boxShadow: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                  opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                  layout: { duration: 0.5, ease: "circInOut" }
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [section, setSection] = useState<Section>('hub');
  const [introStage, setIntroStage] = useState<'loading' | 'waiting' | 'spotlight' | 'done'>('loading');
  const [secretClicks, setSecretClicks] = useState(0);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    if (introStage === 'loading') {
      const timer = setTimeout(() => {
        setIntroStage('waiting');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [introStage]);

  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleHeartClick = () => {
    setSecretClicks(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowGame(true);
        return 0;
      }
      return newCount;
    });
  };

  const handleIntroComplete = () => {
    setIntroStage('done');
  };

  const getSectionColor = (sec: Section) => {
    switch (sec) {
      case 'about': return { hex: '#D946EF', hoverBg: 'hover:bg-[#D946EF]', hoverBorder: 'hover:border-[#D946EF]', hoverShadow: 'hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]' };
      case 'linkedin': return { hex: '#38BDF8', hoverBg: 'hover:bg-[#38BDF8]', hoverBorder: 'hover:border-[#38BDF8]', hoverShadow: 'hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]' };
      case 'leetcode': return { hex: '#FB923C', hoverBg: 'hover:bg-[#FB923C]', hoverBorder: 'hover:border-[#FB923C]', hoverShadow: 'hover:shadow-[0_0_15px_rgba(251,146,60,0.4)]' };
      case 'support': return { hex: '#F87171', hoverBg: 'hover:bg-[#F87171]', hoverBorder: 'hover:border-[#F87171]', hoverShadow: 'hover:shadow-[0_0_15px_rgba(248,113,113,0.4)]' };
      case 'projects': return { hex: '#FDE047', hoverBg: 'hover:bg-[#FDE047]', hoverBorder: 'hover:border-[#FDE047]', hoverShadow: 'hover:shadow-[0_0_15px_rgba(253,224,71,0.4)]' };
      case 'github': return { hex: '#00FF66', hoverBg: 'hover:bg-[#00FF66]', hoverBorder: 'hover:border-[#00FF66]', hoverShadow: 'hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]' };
      default: return { hex: '#00FF66', hoverBg: 'hover:bg-[#00FF66]', hoverBorder: 'hover:border-[#00FF66]', hoverShadow: 'hover:shadow-[0_0_15px_rgba(0,255,102,0.4)]' };
    }
  };
  const sectionColor = getSectionColor(section);

  return (
    <div className="fixed inset-0 bg-[#0a0a0c] text-white overflow-hidden font-sans selection:bg-[#00FF66] selection:text-black">
      {/* Page Border */}
      <div className="absolute inset-2 md:inset-4 border-2 border-white/30 rounded-2xl md:rounded-3xl pointer-events-none z-50"></div>

      {/* Constrain backgrounds to within the border */}
      <div className="absolute inset-2 md:inset-4 rounded-2xl md:rounded-3xl overflow-hidden pointer-events-none z-0">
        {/* Refined Grid Background - Very subtle neon green */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF660A_1px,transparent_1px),linear-gradient(to_bottom,#00FF660A_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent_10%,#000000_100%)] pointer-events-none"></div>

        {/* Subtle Rainfall Background */}
        {(introStage === 'spotlight' || introStage === 'done') && (
          <RainfallBackground mode={section === 'github' ? 'github' : 'default'} />
        )}
      </div>

      <AnimatePresence>
        {(introStage === 'loading' || introStage === 'waiting') && (
          <motion.div
            key="intro-bg"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[80] bg-black"
          >
            <AnimatePresence mode="wait">
              {introStage === 'loading' && (
                <motion.div 
                  key="loading"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <motion.div className="absolute inset-0 border-2 border-[#00FF66]/20 rounded-full" />
                      <motion.div 
                        className="absolute inset-0 border-2 border-[#00FF66] border-t-transparent border-r-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div 
                        className="absolute inset-2 border-2 border-[#00FF66] border-b-transparent border-l-transparent rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div 
                        className="absolute w-2 h-2 bg-[#00FF66] rounded-full"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="text-[#00FF66] font-mono tracking-[0.3em] text-xs md:text-sm animate-pulse drop-shadow-[0_0_8px_rgba(0,255,102,0.8)]">
                      PREPPING
                    </div>
                  </div>
                </motion.div>
              )}
              {introStage === 'waiting' && (
                <motion.div 
                  key="waiting"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-end justify-center pb-24 md:pb-32 cursor-pointer"
                  onClick={() => setIntroStage('spotlight')}
                >
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-[#00FF66] font-mono tracking-widest text-sm md:text-base"
                  >
                    [ TAP ME ]
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {introStage === 'spotlight' && (
        <Spotlight onComplete={handleIntroComplete} />
      )}

      <AnimatePresence mode="wait">
        {section === 'hub' ? (
          <motion.div 
            key="hub"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <UKLogoHub onNavigate={setSection} />
            <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 text-center w-full px-4 pointer-events-none">
              <motion.div 
                animate={introStage === 'done' ? { opacity: [0.4, 1, 0.4], scale: [0.98, 1.02, 0.98] } : { opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center justify-center text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              >
                Drag 
                <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border border-white rounded-full bg-black/80 backdrop-blur-md mx-3 relative align-middle">
                  <span className="text-xs md:text-sm font-serif italic tracking-tighter text-white select-none inline-flex -translate-y-[1px]">
                    <span>U</span>
                    <span className="text-[#00FF66] drop-shadow-[0_0_2px_rgba(0,255,102,0.4)] translate-y-[0.3em] -ml-[1px]">K</span>
                  </span>
                  <span className="absolute inset-0 border-t border-[#00FF66]/40 rounded-full animate-[spin_20s_linear_infinite]" />
                  <span className="absolute inset-[-2px] border-b border-white/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                </span>
                to navigate
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-2 md:inset-4 rounded-2xl md:rounded-3xl overflow-hidden z-10"
          >
            <button 
              onClick={() => {
                setSection('hub');
                setSelectedProject(null);
              }}
              className={`absolute top-6 right-6 md:top-12 md:right-12 p-3 md:p-4 rounded-full border border-white/10 bg-black/50 ${sectionColor.hoverBg} hover:text-black ${sectionColor.hoverBorder} ${sectionColor.hoverShadow} transition-all duration-300 group z-50 backdrop-blur-md`}
            >
              <X className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative">
              <div className="min-h-full w-full flex flex-col items-center justify-center p-6 pt-20 pb-12 md:p-12 md:py-24">

            {section === 'about' && (
              <div className="max-w-3xl text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="w-32 h-32 md:w-40 md:h-40 bg-black border-4 border-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(217,70,239,0.2)] relative overflow-hidden group"
                >
                  <img 
                    src="/profile.jpg" 
                    alt="S Uday Karthik" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/uday/400/400'; }} 
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }} />
                </motion.div>
                <div className="space-y-6 text-base md:text-lg text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
                  <p>
                    Hello! I’m <span className="text-white font-medium">S Uday Karthik</span>. I build things with <span className="text-[#D946EF] font-medium">AI</span>, obsess over <span className="text-[#D946EF] font-medium">Finance</span>, and spend my spare time thinking about <span className="text-[#D946EF] font-medium">Cars</span>. My toolkit is fueled by a love for <span className="text-[#D946EF] font-medium">CSE</span> and a desire to create tech that actually helps people (while making sure it looks cool).
                  </p>
                  <p>
                    Currently experimenting at the crossroads of <span className="text-[#D946EF] font-medium">data and design</span>.
                  </p>
                </div>
                
                <AnimatedWords />
              </div>
            )}

            {section === 'linkedin' && (
              <>
                <BouncingBlueEmojis />
                <div className="text-center relative z-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-black border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-[#38BDF8]/5"></div>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }} />
                    <Linkedin className="w-10 h-10 md:w-12 md:h-12 text-[#38BDF8] relative z-10" />
                  </motion.div>
                  <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-white">LinkedIn</h2>
                  <p className="text-[#38BDF8] text-xs md:text-sm tracking-[0.2em] uppercase mb-10 font-mono">Professional Network</p>
                  <a 
                    href="https://www.linkedin.com/in/uday-karthik-silaparasetty-47a3b937b/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden px-8 py-4 bg-transparent border border-[#38BDF8] text-[#38BDF8] font-medium rounded-full hover:bg-[#38BDF8] hover:text-black hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300 flex items-center gap-3 mx-auto w-fit text-sm group"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }} />
                    <span className="relative z-10 flex items-center gap-3">Connect <ArrowUpRight className="w-4 h-4" /></span>
                  </a>
                </div>
              </>
            )}

            {section === 'leetcode' && (
              <div className="text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-20 h-20 md:w-24 md:h-24 bg-black border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[#FB923C]/5"></div>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }} />
                  <Code2 className="w-10 h-10 md:w-12 md:h-12 text-[#FB923C] relative z-10" />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-white">LeetCode</h2>
                <p className="text-[#FB923C] text-xs md:text-sm tracking-[0.2em] uppercase mb-10 font-mono">Algorithm Mastery</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <div className="px-8 py-4 rounded-2xl bg-black border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#FB923C]/5"></div>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 4 }} />
                    <span className="text-white font-medium text-lg relative z-10">
                      <AnimatedNumber from={0} to={50} duration={2000} delay={1000} />+
                    </span> <span className="text-zinc-500 text-sm ml-2 relative z-10">Solved</span>
                  </div>
                  <div className="px-8 py-4 rounded-2xl bg-black border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#FB923C]/5"></div>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 4, delay: 0.5 }} />
                    <span className="text-zinc-500 text-sm mr-2 relative z-10">Rank</span>
                    <span className="text-white font-medium text-lg relative z-10">
                      <AnimatedNumber 
                        from={5000000} 
                        to={2251362} 
                        duration={2500} 
                        delay={1000}
                        format={(v) => v.toLocaleString()} 
                      />
                    </span>
                  </div>
                </div>
                <a 
                  href="https://leetcode.com/u/UKcodes/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden px-8 py-4 bg-transparent border border-[#FB923C] text-[#FB923C] font-medium rounded-full hover:bg-[#FB923C] hover:text-black hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-all duration-300 flex items-center gap-3 mx-auto w-fit text-sm group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }} />
                  <span className="relative z-10 flex items-center gap-3">View Profile <ArrowUpRight className="w-4 h-4" /></span>
                </a>
              </div>
            )}

            {section === 'github' && (
              <div className="text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-20 h-20 md:w-24 md:h-24 bg-black border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[#00FF66]/5"></div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }}
                  />
                  <Github className="w-10 h-10 md:w-12 md:h-12 text-[#00FF66] relative z-10" />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-white">GitHub</h2>
                <p className="text-[#00FF66] text-xs md:text-sm tracking-[0.2em] uppercase mb-10 font-mono">Open Source</p>
                <a 
                  href="https://github.com/uks2411" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden px-8 py-4 bg-transparent border border-[#00FF66] text-[#00FF66] font-medium rounded-full hover:bg-[#00FF66] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all duration-300 flex items-center gap-3 mx-auto w-fit text-sm group"
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }} />
                  <span className="relative z-10 flex items-center gap-3">View GitHub <ArrowUpRight className="w-4 h-4" /></span>
                </a>
              </div>
            )}

            {section === 'support' && (
              <div className="text-center w-full max-w-4xl mx-auto">
                {/* NEW ANIMATION + TEXT */}
                <div className="mb-12">
                  <motion.div
                    initial={{ opacity: 1 }}
                    className="text-2xl md:text-4xl font-mono text-white mb-2 relative inline-block"
                  >
                    <span>Buy me a coffee 🥤</span>
                    <motion.div
                      className="absolute inset-0 bg-red-500 h-0.5 top-1/2"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1, duration: 0.5 }}
                    />
                  </motion.div>
                  <div className="text-2xl md:text-4xl font-mono text-white h-12">
                    <Typewriter text="Help me save for my dream ride instead" speed={100} continuous={false} />
                  </div>
                </div>

                {/* 3D Model Embed */}
                <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10 mt-8 mb-12 relative group bg-black">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <span className="text-white font-mono text-sm tracking-widest bg-black/80 px-4 py-2 rounded-full border border-white/20">DRAG TO ROTATE</span>
                  </div>
                  <iframe 
                    title="2025 Porsche Taycan Turbo GT Weissach Package" 
                    frameBorder="0" 
                    allowFullScreen 
                    mozallowfullscreen="true" 
                    webkitallowfullscreen="true" 
                    allow="autoplay; fullscreen; xr-spatial-tracking" 
                    src="https://sketchfab.com/models/4e1abafe7cf5413587a421377624ba08/embed?autostart=1&ui_theme=dark&dnt=1" 
                    className="w-full h-full relative z-0"
                  ></iframe>
                </div>

                <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-4 text-white">Support</h2>

                {/* QR Code (MOVED) */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="relative inline-block mb-10"
                >
                  <div className="relative p-2 bg-black border-2 border-[#F87171] rounded-3xl shadow-[0_0_30px_rgba(248,113,113,0.4)] overflow-hidden group max-w-[250px] mx-auto">
                    <div className="absolute inset-0 bg-[#F87171]/10"></div>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 3 }} />
                    <img src="/qr.png" alt="UPI QR Code" className="w-full h-auto relative z-10 rounded-2xl" />
                  </div>
                </motion.div>

                <div className="flex flex-col items-center justify-center mt-12">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleHeartClick}
                    className="flex items-center justify-center gap-2 text-[#F87171] text-lg tracking-widest uppercase font-mono bg-white/5 px-8 py-4 rounded-full border border-[#F87171]/30 hover:bg-[#F87171]/10 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-5 h-5 transition-all duration-300 ${secretClicks > 0 ? 'fill-[#F87171] scale-110' : ''}`} /> 
                    <span>Thank You</span>
                  </motion.button>
                  <p className="text-zinc-600 text-xs mt-4 font-mono">
                    (tap heart for secret x {5 - secretClicks})
                  </p>
                </div>
              </div>
            )}

            {section === 'projects' && (
              <div className="max-w-5xl w-full">
                <AnimatePresence mode="wait">
                  {!selectedProject ? (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full"
                    >
                      <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-6">
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white">Selected Work</h2>
                        <div className="text-[#FDE047] font-mono text-xs">01 — 02</div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Project 1: This Page */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          onClick={() => setSelectedProject('this-page')}
                          className="group cursor-pointer relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black transition-all duration-500 hover:border-[#FDE047]/50 hover:shadow-[0_0_30px_rgba(253,224,71,0.1)]"
                        >
                          <div className="w-full h-full flex items-center justify-center bg-zinc-900/50 group-hover:bg-zinc-900/80 transition-colors duration-500">
                            <div className="relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 border-2 border-white rounded-full bg-black/80 backdrop-blur-2xl shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_40px_rgba(0,255,102,0.25)] transition-shadow duration-500">
                              <span className="text-4xl md:text-6xl font-serif italic tracking-tighter text-white select-none inline-flex -translate-y-1 md:-translate-y-2">
                                <span>U</span>
                                <span className="text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.4)] translate-y-[0.45em] -ml-1 md:-ml-2">K</span>
                              </span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 4 }} />
                          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 relative z-10">
                            <div className="text-[#FDE047] text-[10px] font-mono tracking-widest uppercase mb-3">React • Tailwind • Motion</div>
                            <h3 className="text-xl md:text-2xl font-medium mb-2 text-white">This Page</h3>
                            <p className="text-zinc-400 text-xs md:text-sm line-clamp-2 font-light">An interactive, cyberpunk-inspired personal portfolio.</p>
                          </div>
                        </motion.div>

                        {/* Project 2: Coming Soon */}
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="group relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black transition-all duration-500 hover:border-[#FDE047]/50 hover:shadow-[0_0_30px_rgba(253,224,71,0.1)]"
                        >
                          <div className="w-full h-full flex items-center justify-center bg-zinc-900/30 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]">
                            <div className="text-zinc-600 opacity-50">
                              <Code2 className="w-16 h-16" />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 4, delay: 0.5 }} />
                          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 relative z-10">
                            <div className="text-[#FDE047] text-[10px] font-mono tracking-widest uppercase mb-3">
                              <Typewriter text="COMING SOON" speed={150} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-medium mb-2 text-white">
                              Classified
                            </h3>
                            <p className="text-zinc-400 text-xs md:text-sm line-clamp-2 font-light">Currently brewing something extraordinary.</p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md relative overflow-hidden"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 z-0" animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 5 }} />
                      
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="relative z-10 flex items-center gap-2 text-zinc-400 hover:text-[#FDE047] transition-colors mb-8 text-sm font-mono uppercase tracking-widest"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back to Projects
                      </button>

                      <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-10 items-start">
                        <div className="flex flex-col items-center md:items-start">
                          <div className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 border-2 border-white rounded-full bg-black/80 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] mb-8">
                            <span className="text-5xl md:text-7xl font-serif italic tracking-tighter text-white select-none inline-flex -translate-y-2 md:-translate-y-3">
                              <span>U</span>
                              <span className="text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.4)] translate-y-[0.45em] -ml-2 md:-ml-3">K</span>
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-white mb-4 border-b border-white/10 w-full pb-2">Technologies</h3>
                          <div className="flex flex-wrap gap-2">
                            {['React 18', 'Tailwind CSS', 'Framer Motion', 'Gemini 3.1 Pro', 'Vite', 'Lucide Icons'].map(tech => (
                              <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-zinc-300 font-mono">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2">This Page</h2>
                          <div className="text-[#FDE047] font-mono text-sm tracking-widest uppercase mb-8">Interactive Portfolio</div>
                          
                          <div className="space-y-6 text-zinc-300 font-light leading-relaxed text-base md:text-lg">
                            <p>
                              Developing this interactive portfolio was a comprehensive 12+ hour journey from conceptualization to deployment. 
                            </p>
                            <p>
                              While leveraging advanced AI tools like <span className="text-[#00FF66] font-medium">Gemini 3.1 Pro</span> accelerated the process, it required continuous iteration, debugging, and refined prompting to achieve this exact cyberpunk aesthetic and fluid user experience. Every animation, glow effect, and interaction was meticulously tuned.
                            </p>
                            <p className="p-6 bg-white/5 border-l-2 border-[#FDE047] rounded-r-xl italic text-zinc-400">
                              "This project reinforced a paradigm shift in modern web development: we are transitioning from purely writing boilerplate code to focusing on high-level system design, creative direction, and orchestrating AI to bring our visions to life."
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {showGame && (
        <HeartGame onClose={() => setShowGame(false)} />
      )}
      <Analytics />
    </div>
  );
}