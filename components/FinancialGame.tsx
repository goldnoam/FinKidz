import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coins, Skull, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const PLAYER_SIZE = 40;
const ITEM_SIZE = 25;

interface GameObject {
  x: number;
  y: number;
  type: 'income' | 'expense';
  speed: number;
}

const FinancialGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [player, setPlayer] = useState({ x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2, y: CANVAS_HEIGHT - 60 });
  const [items, setItems] = useState<GameObject[]>([]);
  const [highScore, setHighScore] = useState(Number(localStorage.getItem('finkidz_high_score') || 0));

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setPlayer({ x: CANVAS_WIDTH / 2 - PLAYER_SIZE / 2, y: CANVAS_HEIGHT - 60 });
    setItems([]);
  };

  const spawnItem = useCallback(() => {
    const types: ('income' | 'expense')[] = ['income', 'income', 'expense'];
    const type = types[Math.floor(Math.random() * types.length)];
    const newItem: GameObject = {
      x: Math.random() * (CANVAS_WIDTH - ITEM_SIZE),
      y: -ITEM_SIZE,
      type,
      speed: 2 + Math.random() * 2 + (score / 1000), // Speed up as score increases
    };
    setItems(prev => [...prev, newItem]);
  }, [score]);

  const movePlayer = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (isPaused || gameOver) return;
    const step = 20;
    switch (direction) {
      case 'up':
        setPlayer(p => ({ ...p, y: Math.max(0, p.y - step) }));
        break;
      case 'down':
        setPlayer(p => ({ ...p, y: Math.min(CANVAS_HEIGHT - PLAYER_SIZE, p.y + step) }));
        break;
      case 'left':
        setPlayer(p => ({ ...p, x: Math.max(0, p.x - step) }));
        break;
      case 'right':
        setPlayer(p => ({ ...p, x: Math.min(CANVAS_WIDTH - PLAYER_SIZE, p.x + step) }));
        break;
    }
  }, [isPaused, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          movePlayer('up');
          break;
        case 's':
        case 'arrowdown':
          movePlayer('down');
          break;
        case 'a':
        case 'arrowleft':
          movePlayer('left');
          break;
        case 'd':
        case 'arrowright':
          movePlayer('right');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  const update = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      if (!isPaused && !gameOver) {
        setItems(prevItems => {
          const nextItems = prevItems
            .map(item => ({ ...item, y: item.y + item.speed }))
            .filter(item => item.y < CANVAS_HEIGHT);

          // Collision detection
          let newScore = score;
          const remainingItems = nextItems.filter(item => {
            const hasCollided = 
              item.x < player.x + PLAYER_SIZE &&
              item.x + ITEM_SIZE > player.x &&
              item.y < player.y + PLAYER_SIZE &&
              item.y + ITEM_SIZE > player.y;

            if (hasCollided) {
              if (item.type === 'income') {
                newScore += 100;
              } else {
                setGameOver(true);
                setIsPaused(true);
              }
              return false;
            }
            return true;
          });

          if (newScore !== score) setScore(newScore);
          return remainingItems;
        });

        if (Math.random() < 0.03) spawnItem();
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(update);
  }, [isPaused, gameOver, player, score, spawnItem]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [update]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('finkidz_high_score', score.toString());
    }
  }, [score, highScore]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.5;
    for(let i=0; i<CANVAS_WIDTH; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, CANVAS_HEIGHT); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(CANVAS_WIDTH, i); ctx.stroke();
    }

    // Draw Player (Piggy Bank style)
    ctx.fillStyle = '#f472b6'; // Pink-400
    ctx.beginPath();
    ctx.roundRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE, 10);
    ctx.fill();
    ctx.fillStyle = '#db2777'; // Pink-600
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🐖', player.x + PLAYER_SIZE/2, player.y + PLAYER_SIZE/1.4);

    // Draw Items
    items.forEach(item => {
      ctx.font = '20px Arial';
      ctx.fillText(item.type === 'income' ? '💰' : '💸', item.x + ITEM_SIZE/2, item.y + ITEM_SIZE/1.2);
    });

    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 36px Rubik';
      ctx.textAlign = 'center';
      ctx.fillText('הפסדת!', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 20);
      ctx.fillStyle = 'white';
      ctx.font = '20px Rubik';
      ctx.fillText(`ניקוד סופי: ${score}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 25);
    } else if (isPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 28px Rubik';
      ctx.textAlign = 'center';
      ctx.fillText('משחק מושהה', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      ctx.font = '16px Rubik';
      ctx.fillText('לחץ על "המשך" כדי לשחק', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 35);
    }
  }, [player, items, isPaused, gameOver, score]);

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl max-w-lg mx-auto">
      <div className="w-full flex justify-between items-center text-white">
        <div>
          <h2 className="text-2xl font-black text-indigo-400">מרוץ החיסכון</h2>
          <p className="text-sm text-slate-400">אסוף הכנסות, הימנע מהוצאות!</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-yellow-400 flex items-center justify-end gap-2">
             <Coins className="w-5 h-5" />
             {score}
          </div>
          <div className="text-xs text-slate-500">שיא: {highScore}</div>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-2xl shadow-inner border border-slate-700">
        <canvas 
          ref={canvasRef} 
          width={CANVAS_WIDTH} 
          height={CANVAS_HEIGHT} 
          className="bg-slate-900"
        />
        
        {/* On-screen Controls (WASD) for Mobile */}
        <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-[200px] md:hidden mb-4 mx-auto">
          <div />
          <button 
            onTouchStart={(e) => { e.preventDefault(); movePlayer('up'); }}
            onMouseDown={(e) => { e.preventDefault(); movePlayer('up'); }}
            className="p-5 bg-slate-700/80 backdrop-blur rounded-2xl active:bg-indigo-600 active:scale-95 transition-all flex justify-center shadow-lg border border-slate-600"
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </button>
          <div />
          <button 
            onTouchStart={(e) => { e.preventDefault(); movePlayer('left'); }}
            onMouseDown={(e) => { e.preventDefault(); movePlayer('left'); }}
            className="p-5 bg-slate-700/80 backdrop-blur rounded-2xl active:bg-indigo-600 active:scale-95 transition-all flex justify-center shadow-lg border border-slate-600"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onTouchStart={(e) => { e.preventDefault(); movePlayer('down'); }}
            onMouseDown={(e) => { e.preventDefault(); movePlayer('down'); }}
            className="p-5 bg-slate-700/80 backdrop-blur rounded-2xl active:bg-indigo-600 active:scale-95 transition-all flex justify-center shadow-lg border border-slate-600"
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
          <button 
            onTouchStart={(e) => { e.preventDefault(); movePlayer('right'); }}
            onMouseDown={(e) => { e.preventDefault(); movePlayer('right'); }}
            className="p-5 bg-slate-700/80 backdrop-blur rounded-2xl active:bg-indigo-600 active:scale-95 transition-all flex justify-center shadow-lg border border-slate-600"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          disabled={gameOver}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all transform active:scale-95 ${
            isPaused ? 'bg-green-600 hover:bg-green-500 shadow-green-900/40' : 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-900/40'
          } text-white shadow-lg disabled:opacity-50`}
        >
          {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
          {isPaused ? 'המשך' : 'השהה'}
        </button>
        <button 
          onClick={resetGame}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-black/20"
        >
          <RotateCcw className="w-6 h-6" />
          איפוס
        </button>
      </div>

      <div className="text-slate-500 text-xs text-center flex items-center gap-2">
        <span className="hidden md:inline">השתמש ב-WASD או במקשי החיצים כדי לזוז</span>
        <span className="md:hidden">השתמש בכפתורי החיצים כדי לזוז</span>
      </div>
    </div>
  );
};

export default FinancialGame;