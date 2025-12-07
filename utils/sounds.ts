export const playSound = (type: 'click' | 'success' | 'hover') => {
  try {
    // Prevent sounds if user hasn't interacted with document yet (browser policy)
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      // Soft click - high pitch short sine
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } 
    else if (type === 'success') {
      // Success chord - ascending major triad
      const now = ctx.currentTime;
      
      // Root
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.value = 523.25; // C5
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.1, now + 0.1);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc1.start(now);
      osc1.stop(now + 0.6);

      // Third
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.value = 659.25; // E5
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      gain2.gain.setValueAtTime(0, now + 0.1);
      gain2.gain.linearRampToValueAtTime(0.1, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      
      osc2.start(now + 0.1);
      osc2.stop(now + 0.7);

      // Fifth
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.value = 783.99; // G5
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      
      gain3.gain.setValueAtTime(0, now + 0.2);
      gain3.gain.linearRampToValueAtTime(0.1, now + 0.3);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc3.start(now + 0.2);
      osc3.stop(now + 0.8);
    }
  } catch (e) {
    // Ignore audio context errors
  }
};