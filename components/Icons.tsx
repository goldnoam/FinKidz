import React from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  Landmark, 
  Wallet, 
  Target, 
  Coins, 
  Globe, 
  School,
  BrainCircuit,
  PieChart,
  BarChart3,
  ArrowRightLeft,
  ShieldCheck,
  Gamepad2,
  Newspaper,
  Medal,
  Crown,
  Star,
  Flame,
  Book,
  Trophy
} from 'lucide-react';

export const getIcon = (name: string, className?: string) => {
  const props = { className: className || "w-6 h-6" };
  switch (name) {
    case 'savings': return <PiggyBank {...props} />;
    case 'investing': return <TrendingUp {...props} />;
    case 'bank': return <Landmark {...props} />;
    case 'budget': return <Wallet {...props} />;
    case 'goals': return <Target {...props} />;
    case 'target': return <Target {...props} />;
    case 'money': return <Coins {...props} />;
    case 'global': return <Globe {...props} />;
    case 'learn': return <School {...props} />;
    case 'ai': return <BrainCircuit {...props} />;
    case 'pie': return <PieChart {...props} />;
    case 'chart': return <BarChart3 {...props} />;
    case 'exchange': return <ArrowRightLeft {...props} />;
    case 'safe': return <ShieldCheck {...props} />;
    case 'game': return <Gamepad2 {...props} />;
    case 'news': return <Newspaper {...props} />;
    
    // Badge Icons
    case 'medal': return <Medal {...props} />;
    case 'crown': return <Crown {...props} />;
    case 'star': return <Star {...props} />;
    case 'flame': return <Flame {...props} />;
    case 'book': return <Book {...props} />;
    case 'trophy': return <Trophy {...props} />;
    
    default: return <Coins {...props} />;
  }
};