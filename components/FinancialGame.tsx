
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Play, Pause, RotateCcw, Coins, Heart, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Shield, Rocket, Trophy } from 'lucide-react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const PLAYER_SIZE = 40;
const ITEM_SIZE = 25;
const INITIAL_LIVES = 5;

type ItemType = 'income' | 'expense' | 'shield' | 'multiplier' | 'life';

interface GameObject {
  x: number;
  y: number;
  type: ItemType;
  speed: number;
  id: string;
}

const FinancialGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [isPaused, setIsPaused] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [player, setPlayer] = useState({ x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2, y: CANVAS_HEIGHT - 60 });
  const [items, setItems] = useState<GameObject[]>([]);
  const [highScores, setHighScores] = useState<number[]>(() => {
    const saved = localStorage.getItem('finkidz_high_scores');
    return saved ? JSON.parse(saved) : [0];
  });
  const [hitFlash, setHitFlash] = useState(false);
  
  // Power-up states
  const [shieldActive, setShieldActive] = useState(0); // Time remaining
  const [multiplierActive, setMultiplierActive] = useState(0); // Time remaining

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const resetGame = () => {
    setScore(0);
    setLives(INITIAL_LIVES);
    setGameOver(false);
    setIsPaused(false);
    setPlayer({ x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2, y: CANVAS_HEIGHT - 60 });
    setItems([]);
    setHitFlash(false);
    setShieldActive(0);
    setMultiplierActive(0);
  };

  const spawnItem = useCallback(() => {
    const random = Math.random();
    let type: ItemType = 'income';
    
    if (random < 0.05) type = 'life';
    else if (random < 0.10) type = 'shield';
    else if (random < 0.15) type = 'multiplier';
    else if (random < 0.45) type = 'expense';
    else type = 'income';

    const newItem: GameObject = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * (CANVAS_WIDTH - ITEM_SIZE),
      y: -ITEM_SIZE,
      type,
      speed: 2 + Math.random() * 2 + (score / 5000), 
    };
    setItems(prev => [...prev, newItem]);
  }, [score]);

  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (isPaused || gameOver) return;
    const step = 25;
    switch (direction) {
      case 'up': setPlayer(p => ({ ...p, y: Math.max(0, p.y - step) })); break;
      case 'down': setPlayer(p => ({ ...p, y: Math.min(CANVAS_HEIGHT - PLAYER_SIZE, p.y + step) })); break;
      case 'left': setPlayer(p => ({ ...p, x: Math.max(0, p.x - step) })); break;
      case 'right': setPlayer(p => ({ ...p, x: Math.min(CANVAS_WIDTH - PLAYER_SIZE, p.x + step) })); break;
    }
  }, [isPaused, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused || gameOver) return;
      switch (e.key.toLowerCase()) {
        case 'w': case 'arrowup': movePlayer('up'); break;
        case 's': case 'arrowdown': movePlayer('down'); break;
        case 'a': case 'arrowleft': movePlayer('left'); break;
        case 'd': case 'arrowright': movePlayer('right'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, isPaused, gameOver]);

  const update = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      const dt = time - lastTimeRef.current;
      
      if (!isPaused && !gameOver) {
        // Handle Power-up timers
        if (shieldActive > 0) setShieldActive(prev => Math.max(0, prev - dt));
        if (multiplierActive > 0) setMultiplierActive(prev => Math.max(0, prev - dt));

        setItems(prevItems => {
          const nextItems = prevItems
            .map(item => ({ ...item, y: item.y + item.speed }))
            .filter(item => item.y < CANVAS_HEIGHT);

          let newScore = score;
          let newLives = lives;
          
          const remainingItems = nextItems.filter(item => {
            const hasCollided = 
              item.x < player.x + PLAYER_SIZE &&
              item.x + ITEM_SIZE > player.x &&
              item.y < player.y + PLAYER_SIZE &&
              item.y + ITEM_SIZE > player.y;

            if (hasCollided) {
              switch(item.type) {
                case 'income':
                  newScore += multiplierActive > 0 ? 200 : 100;
                  break;
                case 'expense':
                  if (shieldActive <= 0) {
                    newLives -= 1;
                    setHitFlash(true);
                    setTimeout(() => setHitFlash(false), 200);
                  }
                  break;
                case 'shield':
                  setShieldActive(8000); // 8 seconds
                  break;
                case 'multiplier':
                  setMultiplierActive(10000); // 10 seconds
                  break;
                case 'life':
                  newLives = Math.min(INITIAL_LIVES, newLives + 1);
                  break;
              }
              if (newLives <= 0) {
                setGameOver(true);
                setIsPaused(true);
              }
              return false;
            }
            return true;
          });

          if (newScore !== score) setScore(newScore);
          if (newLives !== lives) setLives(newLives);
          return remainingItems;
        });

        if (Math.random() < 0.04) spawnItem();
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(update);
  }, [isPaused, gameOver, player, score, lives, spawnItem, shieldActive, multiplierActive]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [update]);

  useEffect(() => {
    if (gameOver) {
      const newScores = [...highScores, score].sort((a, b) => b - a).slice(0, 5);
      setHighScores(newScores);
      localStorage.setItem('finkidz_high_scores', JSON.stringify(newScores));
    }
  }, [gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (hitFlash) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // Grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.5;
    for(let i=0; i<CANVAS_WIDTH; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, CANVAS_HEIGHT); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(CANVAS_WIDTH, i); ctx.stroke();
    }

    // Shield effect
    if (shieldActive > 0) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(player.x + PLAYER_SIZE/2, player.y + PLAYER_SIZE/2, PLAYER_SIZE/1.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.fill();
    }

    // Multiplier effect
    if (multiplierActive > 0) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(player.x + PLAYER_SIZE/2, player.y + PLAYER_SIZE/2, PLAYER_SIZE/1.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Player
    ctx.fillStyle = hitFlash ? '#ef4444' : (shieldActive > 0 ? '#38bdf8' : '#f472b6'); 
    ctx.beginPath();
    ctx.roundRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE, 10);
    ctx.fill();
    ctx.fillStyle = '#db2777';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🐖', player.x + PLAYER_SIZE/2, player.y + PLAYER_SIZE/1.4);

    // Items
    items.forEach(item => {
      ctx.font = '22px Arial';
      let icon = '💰';
      switch(item.type) {
        case 'expense': icon = '💸'; break;
        case 'shield': icon = '🛡️'; break;
        case 'multiplier': icon = '🚀'; break;
        case 'life': icon = '❤️'; break;
      }
      ctx.fillText(icon, item.x + ITEM_SIZE/2, item.y + ITEM_SIZE/1.2);
    });

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 36px Rubik';
      ctx.textAlign = 'center';
      ctx.fillText('המשחק נגמר!', CANVAS_WIDTH/2, 100);
      
      ctx.fillStyle = 'white';
      ctx.font = '24px Rubik';
      ctx.fillText(`ניקוד: ${score}`, CANVAS_WIDTH/2, 140);
      
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 20px Rubik';
      ctx.fillText('שיאי כל הזמנים:', CANVAS_WIDTH/2, 200);
      highScores.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? '#fbbf24' : '#94a3b8';
        ctx.font = '18px Rubik';
        ctx.fillText(`${i+1}. ${s}`, CANVAS_WIDTH/2, 230 + (i * 25));
      });
    } else if (isPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 28px Rubik';
      ctx.textAlign = 'center';
      ctx.fillText('מוכן להתחיל?', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    }
  }, [player, items, isPaused, gameOver, score, hitFlash, shieldActive, multiplierActive, highScores]);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl max-w-lg mx-auto">
      <div className="w-full flex justify-between items-center text-white">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black text-indigo-400">מרוץ החיסכון</h2>
          <div className="flex gap-1">
            {[...Array(INITIAL_LIVES)].map((_, i) => (
              <Heart key={i} className={`w-4 h-4 transition-all ${i < lives ? 'fill-red-500 text-red-500 scale-100' : 'text-slate-600 scale-90 opacity-40'}`} />
            ))}
          </div>
          <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
            {shieldActive > 0 && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full flex items-center gap-1 border border-blue-500/30"><Shield className="w-2.5 h-2.5" /> SHIELD</span>}
            {multiplierActive > 0 && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full flex items-center gap-1 border border-amber-500/30"><Rocket className="w-2.5 h-2.5" /> X2</span>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-yellow-400 flex items-center justify-end gap-2">
             <Coins className="w-6 h-6" />
             {score}
          </div>
          <div className="text-xs text-slate-500 uppercase flex items-center gap-1 justify-end mt-1">
            <Trophy className="w-3 h-3" /> BEST: {highScores[0]}
          </div>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-2xl shadow-inner border border-slate-700">
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className={`bg-slate-900 transition-all ${hitFlash ? 'scale-95' : 'scale-100'}`} />
        
        {/* Controls Overlay for desktop to inform keys */}
        {!gameOver && isPaused && (
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/40 text-[10px] pointer-events-none">
            USE WASD OR ARROWS TO MOVE
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-[220px] md:hidden mb-4 mx-auto">
          <div />
          <button onTouchStart={() => movePlayer('up')} className="p-4 bg-slate-700 rounded-2xl flex items-center justify-center border border-slate-600">
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
          <div />
          <button onTouchStart={() => movePlayer('left')} className="p-4 bg-slate-700 rounded-2xl flex items-center justify-center border border-slate-600">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button onTouchStart={() => movePlayer('down')} className="p-4 bg-slate-700 rounded-2xl flex items-center justify-center border border-slate-600">
            <ArrowDown className="w-5 h-5 text-white" />
          </button>
          <button onTouchStart={() => movePlayer('right')} className="p-4 bg-slate-700 rounded-2xl flex items-center justify-center border border-slate-600">
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button onClick={() => setIsPaused(!isPaused)} disabled={gameOver} className={`flex-1 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${isPaused ? 'bg-green-600 hover:bg-green-500 shadow-green-900/20' : 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-900/20'}`}>
          {isPaused ? 'המשך' : 'השהה'}
        </button>
        <button onClick={resetGame} className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold shadow-lg shadow-black/20">איפוס</button>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full text-[10px] text-slate-500 text-center font-bold">
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center bg-blue-500/10 rounded-full text-blue-400">🛡️</div>
          <span>מגן (8 ש')</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center bg-amber-500/10 rounded-full text-amber-400">🚀</div>
          <span>ניקוד X2</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center bg-red-500/10 rounded-full text-red-400">❤️</div>
          <span>חיים נוספים</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialGame;
