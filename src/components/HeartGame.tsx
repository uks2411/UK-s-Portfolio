import React, { useEffect, useRef, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeartGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const requestRef = useRef<number>();
  
  const gameState = useRef({
    ball: { x: 50, y: 50, dx: 5, dy: 5, size: 24 },
    paddle: { x: 0, width: 120, height: 16 },
    score: 0,
    speedMultiplier: 1
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      if (gameState.current.paddle.x === 0) {
        gameState.current.paddle.x = canvas.width / 2 - gameState.current.paddle.width / 2;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      gameState.current.paddle.x = Math.max(0, Math.min(mouseX - gameState.current.paddle.width / 2, canvas.width - gameState.current.paddle.width));
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      gameState.current.paddle.x = Math.max(0, Math.min(touchX - gameState.current.paddle.width / 2, canvas.width - gameState.current.paddle.width));
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      const scale = size / 24;
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.moveTo(12, 21.35);
      ctx.lineTo(10.55, 20.03);
      ctx.bezierCurveTo(5.4, 15.36, 2, 12.28, 2, 8.5);
      ctx.bezierCurveTo(2, 5.42, 4.42, 3, 7.5, 3);
      ctx.bezierCurveTo(9.24, 3, 10.91, 3.81, 12, 5.09);
      ctx.bezierCurveTo(13.09, 3.81, 14.76, 3, 16.5, 3);
      ctx.bezierCurveTo(19.58, 3, 22, 5.42, 22, 8.5);
      ctx.bezierCurveTo(22, 12.28, 18.6, 15.36, 13.45, 20.04);
      ctx.lineTo(12, 21.35);
      ctx.fillStyle = '#F87171';
      ctx.fill();
      ctx.shadowColor = '#F87171';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      if (gameOver) return;

      const state = gameState.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update ball
      state.ball.x += state.ball.dx * state.speedMultiplier;
      state.ball.y += state.ball.dy * state.speedMultiplier;

      // Wall collisions
      if (state.ball.x <= 0 || state.ball.x + state.ball.size >= canvas.width) {
        state.ball.dx *= -1;
        state.ball.x = state.ball.x <= 0 ? 0 : canvas.width - state.ball.size;
      }
      if (state.ball.y <= 0) {
        state.ball.dy *= -1;
        state.ball.y = 0;
      }

      // Paddle collision
      const paddleY = canvas.height - state.paddle.height - 40;
      const hitPaddleX = state.ball.x + state.ball.size >= state.paddle.x && state.ball.x <= state.paddle.x + state.paddle.width;
      const hitPaddleY = state.ball.y + state.ball.size >= paddleY && state.ball.y <= paddleY + state.paddle.height;

      if (hitPaddleX && hitPaddleY && state.ball.dy > 0) {
        state.ball.dy *= -1;
        state.ball.y = paddleY - state.ball.size;
        state.score += 1;
        state.speedMultiplier += 0.05; // Increase speed
        setScore(state.score);
        
        // Add a little english (spin/angle change) based on where it hit the paddle
        const hitPoint = (state.ball.x + state.ball.size / 2) - (state.paddle.x + state.paddle.width / 2);
        state.ball.dx = (hitPoint / (state.paddle.width / 2)) * 6;
      }

      // Game over
      if (state.ball.y + state.ball.size > canvas.height) {
        setGameOver(true);
        return;
      }

      // Draw paddle
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(state.paddle.x, paddleY, state.paddle.width, state.paddle.height, 8);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw ball (heart)
      drawHeart(ctx, state.ball.x, state.ball.y, state.ball.size);

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameOver]);

  const restart = () => {
    gameState.current = {
      ball: { x: 50, y: 50, dx: 5, dy: 5, size: 24 },
      paddle: { ...gameState.current.paddle },
      score: 0,
      speedMultiplier: 1
    };
    setScore(0);
    setGameOver(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden rounded-2xl md:rounded-3xl"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="absolute top-8 left-8 flex items-center gap-3 text-2xl font-mono text-white z-10">
        <Trophy className="w-6 h-6 text-[#FDE047]" />
        <span>{score}</span>
      </div>

      <canvas 
        ref={canvasRef} 
        className="w-full h-full touch-none cursor-none"
      />

      {gameOver && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">GAME OVER</h2>
          <p className="text-xl text-zinc-400 mb-8 font-mono">Final Score: <span className="text-[#FDE047]">{score}</span></p>
          <button 
            onClick={restart}
            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[#FDE047] hover:shadow-[0_0_30px_rgba(253,224,71,0.5)] transition-all duration-300"
          >
            PLAY AGAIN
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
