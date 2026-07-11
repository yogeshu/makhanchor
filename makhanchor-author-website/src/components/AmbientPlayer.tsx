/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, CloudRain, Flame, Music, Moon, Settings, Sparkles } from 'lucide-react';

export default function AmbientPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rainVol, setRainVol] = useState(40);
  const [fireVol, setFireVol] = useState(30);
  const [pianoVol, setPianoVol] = useState(50);
  const [activePreset, setActivePreset] = useState<'custom' | 'rainy' | 'fireside' | 'dreamy'>('custom');

  // Audio nodes and context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Rain Nodes
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  
  // Fire Nodes
  const fireRumbleSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const fireCrackGainRef = useRef<GainNode | null>(null);
  const fireRumbleGainRef = useRef<GainNode | null>(null);
  const fireIntervalRef = useRef<number | null>(null);

  // Piano Synthesizer state
  const pianoGainRef = useRef<GainNode | null>(null);
  const pianoTimeoutRef = useRef<number | null>(null);
  const isPianoRunningRef = useRef<boolean>(false);

  // Toggle dropdown
  const playerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update Volumes
  useEffect(() => {
    if (rainGainRef.current && audioCtxRef.current) {
      rainGainRef.current.gain.setTargetAtTime((rainVol / 100) * 0.15, audioCtxRef.current.currentTime, 0.1);
    }
  }, [rainVol]);

  useEffect(() => {
    if (audioCtxRef.current) {
      const volMultiplier = fireVol / 100;
      if (fireRumbleGainRef.current) {
        fireRumbleGainRef.current.gain.setTargetAtTime(volMultiplier * 0.18, audioCtxRef.current.currentTime, 0.1);
      }
      if (fireCrackGainRef.current) {
        fireCrackGainRef.current.gain.setTargetAtTime(volMultiplier * 0.15, audioCtxRef.current.currentTime, 0.1);
      }
    }
  }, [fireVol]);

  useEffect(() => {
    if (pianoGainRef.current && audioCtxRef.current) {
      pianoGainRef.current.gain.setTargetAtTime((pianoVol / 100) * 0.25, audioCtxRef.current.currentTime, 0.1);
    }
  }, [pianoVol]);

  // Apply Presets
  const applyPreset = (preset: 'custom' | 'rainy' | 'fireside' | 'dreamy') => {
    setActivePreset(preset);
    if (preset === 'rainy') {
      setRainVol(80);
      setFireVol(10);
      setPianoVol(40);
    } else if (preset === 'fireside') {
      setRainVol(10);
      setFireVol(80);
      setPianoVol(30);
    } else if (preset === 'dreamy') {
      setRainVol(30);
      setFireVol(20);
      setPianoVol(85);
    }
  };

  // Helper: Create Pink Noise Buffer
  const createPinkNoiseBuffer = (ctx: AudioContext, seconds = 2) => {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Pink noise generation algorithm (Voss-McCartney)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      data[i] = pink * 0.11; // scale back
    }
    return buffer;
  };

  // Helper: Play a soft piano note synthesized with Web Audio
  const playSynthNote = (ctx: AudioContext, frequency: number, time: number, duration: number) => {
    if (!isPlaying || !ctx || ctx.state === 'suspended') return;

    // Create main oscillator (soft triangle) and sub oscillator (sine)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.value = frequency;

    osc2.type = 'sine';
    osc2.frequency.value = frequency * 2; // harmonic highlight

    // Soft low pass filter to make it mellow and cozy
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, time);
    filter.frequency.exponentialRampToValueAtTime(150, time + duration);

    // Envelope
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.4, time + 0.08); // attack
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration); // release

    // Connect nodes
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    
    if (pianoGainRef.current) {
      noteGain.connect(pianoGainRef.current);
    } else {
      noteGain.connect(ctx.destination);
    }

    // Play
    osc1.start(time);
    osc1.stop(time + duration);
    osc2.start(time);
    osc2.stop(time + duration);
  };

  // Cozy Lo-fi Chord Loop
  const runPianoProgression = () => {
    if (!isPlaying || !audioCtxRef.current || audioCtxRef.current.state === 'suspended') {
      isPianoRunningRef.current = false;
      return;
    }

    isPianoRunningRef.current = true;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Beautiful jazzy lo-fi seventh chords
    // Cmaj9 - Am9 - Fmaj7 - G13
    const progressions = [
      [130.81, 196.00, 246.94, 293.66, 329.63], // Cmaj9 (C3, G3, B3, D4, E4)
      [110.00, 196.00, 261.63, 329.63, 493.88], // Am9 (A2, G3, C4, E4, B4)
      [87.31, 174.61, 220.00, 261.63, 329.63],  // Fmaj7 (F2, F3, A3, C4, E4)
      [98.00, 174.61, 220.00, 246.94, 329.63],  // G13 (G2, F3, A3, B3, E4)
    ];

    // Pick a random chord or rotate
    const currentChordIndex = Math.floor((Date.now() / 6000) % progressions.length);
    const chord = progressions[currentChordIndex];

    // Arpeggiate the chord slightly for a more human touch
    chord.forEach((freq, idx) => {
      const arpeggioDelay = idx * 0.12 + (Math.random() * 0.04);
      playSynthNote(ctx, freq, now + arpeggioDelay, 4.5);
    });

    // Schedule next chord
    pianoTimeoutRef.current = window.setTimeout(runPianoProgression, 6500);
  };

  // Fireplace Crackle generator
  const triggerFireCrackle = () => {
    if (!isPlaying || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Crackle sound: quick decay on bandpass noise
    const bufferSize = ctx.sampleRate * 0.03;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-12 * (i / bufferSize));
    }
    
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500 + Math.random() * 3000;
    filter.Q.value = 5;

    const gain = ctx.createGain();
    gain.gain.value = 0.08 + Math.random() * 0.15;

    noiseNode.connect(filter);
    filter.connect(gain);
    
    if (fireCrackGainRef.current) {
      gain.connect(fireCrackGainRef.current);
    } else {
      gain.connect(ctx.destination);
    }

    noiseNode.start();

    // Schedule next crackle randomly
    const nextCrackleDelay = 120 + Math.random() * 450;
    fireIntervalRef.current = window.setTimeout(triggerFireCrackle, nextCrackleDelay);
  };

  // Start / Stop Web Audio Sandbox
  const startAudio = async () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // 1. Setup Rain Gain Node & Source
      const pinkNoiseBuffer = createPinkNoiseBuffer(ctx, 4);
      
      rainGainRef.current = ctx.createGain();
      rainGainRef.current.gain.value = (rainVol / 100) * 0.15;
      
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.value = 1000;

      // Slow rain wind modulator (LFO)
      const rainLfo = ctx.createOscillator();
      rainLfo.frequency.value = 0.15; // ultra slow
      const rainLfoGain = ctx.createGain();
      rainLfoGain.gain.value = 300;
      rainLfo.connect(rainLfoGain);
      rainLfoGain.connect(rainFilter.frequency);
      rainLfo.start();

      rainGainRef.current.connect(ctx.destination);
      rainFilter.connect(rainGainRef.current);

      rainSourceRef.current = ctx.createBufferSource();
      rainSourceRef.current.buffer = pinkNoiseBuffer;
      rainSourceRef.current.loop = true;
      rainSourceRef.current.connect(rainFilter);
      rainSourceRef.current.start();

      // 2. Setup Fire Rumble
      fireRumbleGainRef.current = ctx.createGain();
      fireRumbleGainRef.current.gain.value = (fireVol / 100) * 0.18;
      
      const fireRumbleFilter = ctx.createBiquadFilter();
      fireRumbleFilter.type = 'lowpass';
      fireRumbleFilter.frequency.value = 90;

      fireRumbleGainRef.current.connect(ctx.destination);
      fireRumbleFilter.connect(fireRumbleGainRef.current);

      fireRumbleSourceRef.current = ctx.createBufferSource();
      fireRumbleSourceRef.current.buffer = pinkNoiseBuffer;
      fireRumbleSourceRef.current.loop = true;
      fireRumbleSourceRef.current.connect(fireRumbleFilter);
      fireRumbleSourceRef.current.start();

      // 3. Setup Crackle Gain
      fireCrackGainRef.current = ctx.createGain();
      fireCrackGainRef.current.gain.value = (fireVol / 100) * 0.15;
      fireCrackGainRef.current.connect(ctx.destination);

      // Start crackle interval
      triggerFireCrackle();

      // 4. Setup Piano Synth Node & Delay for vintage depth
      pianoGainRef.current = ctx.createGain();
      pianoGainRef.current.gain.value = (pianoVol / 100) * 0.25;

      const delayNode = ctx.createDelay(1.0);
      delayNode.delayTime.value = 0.45;

      const delayFeedback = ctx.createGain();
      delayFeedback.gain.value = 0.25;

      pianoGainRef.current.connect(ctx.destination);
      pianoGainRef.current.connect(delayNode);
      delayNode.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayNode.connect(ctx.destination);

      // Run Cozy Piano chord generation
      runPianoProgression();

    } catch (err) {
      console.error('Failed to start ambient system:', err);
    }
  };

  const stopAudio = () => {
    // Stop Rain
    if (rainSourceRef.current) {
      try { rainSourceRef.current.stop(); } catch(e){}
      rainSourceRef.current.disconnect();
      rainSourceRef.current = null;
    }

    // Stop Fire Rumble
    if (fireRumbleSourceRef.current) {
      try { fireRumbleSourceRef.current.stop(); } catch(e){}
      fireRumbleSourceRef.current.disconnect();
      fireRumbleSourceRef.current = null;
    }

    // Clear Fire crackle timer
    if (fireIntervalRef.current) {
      clearTimeout(fireIntervalRef.current);
      fireIntervalRef.current = null;
    }

    // Clear Piano timers
    if (pianoTimeoutRef.current) {
      clearTimeout(pianoTimeoutRef.current);
      pianoTimeoutRef.current = null;
    }
    isPianoRunningRef.current = false;

    // Disconnect and clean context if needed
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Wait for state to catch up
      setTimeout(() => {
        startAudio();
      }, 50);
    }
  };

  // Safely cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="relative" ref={playerRef} id="midnight-ambient-player">
      {/* Crescent Moon Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
          isPlaying
            ? 'bg-[#ffeaa5]/10 border-[#ffeaa5]/30 text-[#ffeaa5] shadow-[0_0_15px_rgba(255,234,165,0.25)]'
            : 'bg-white/5 border-white/10 text-white/80 hover:text-white hover:border-white/20'
        }`}
        title="Toggle Midnight Ambient Soundtrack"
        id="ambient-moon-toggle"
      >
        <Moon className={`w-[18px] h-[18px] ${isPlaying ? 'fill-[#ffeaa5] animate-pulse' : ''}`} />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-coral opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-coral"></span>
          </span>
        )}
      </button>

      {/* Popover Ambient Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="absolute right-0 mt-3 w-80 bg-[#0c0919]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.65)] z-50 text-left"
            id="ambient-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-coral" />
                <span className="text-xs font-mono font-semibold tracking-wider text-white/60 uppercase">
                  Cozy Midnight Sound mix
                </span>
              </div>
              <button
                onClick={togglePlayback}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer ${
                  isPlaying
                    ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                    : 'bg-[#dfbe6b] text-brand-charcoal hover:bg-[#ffeaa5]'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>Mute</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Listen</span>
                  </>
                )}
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => applyPreset('rainy')}
                className={`text-[10px] font-medium py-1.5 rounded-lg border transition-all text-center cursor-pointer ${
                  activePreset === 'rainy'
                    ? 'bg-white/10 border-brand-coral text-brand-coral'
                    : 'bg-white/5 border-transparent text-white/60 hover:bg-white/85 hover:text-brand-charcoal'
                }`}
              >
                Gentle Rain
              </button>
              <button
                onClick={() => applyPreset('fireside')}
                className={`text-[10px] font-medium py-1.5 rounded-lg border transition-all text-center cursor-pointer ${
                  activePreset === 'fireside'
                    ? 'bg-white/10 border-brand-coral text-brand-coral'
                    : 'bg-white/5 border-transparent text-white/60 hover:bg-white/85 hover:text-brand-charcoal'
                }`}
              >
                Crackling Fire
              </button>
              <button
                onClick={() => applyPreset('dreamy')}
                className={`text-[10px] font-medium py-1.5 rounded-lg border transition-all text-center cursor-pointer ${
                  activePreset === 'dreamy'
                    ? 'bg-white/10 border-brand-coral text-brand-coral'
                    : 'bg-white/5 border-transparent text-white/60 hover:bg-white/85 hover:text-brand-charcoal'
                }`}
              >
                Dreamy Piano
              </button>
            </div>

            {/* Mixing Sliders */}
            <div className="space-y-4">
              {/* Rain Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center space-x-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                    <span>Rain Drops</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40">{rainVol}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainVol}
                  onChange={(e) => {
                    setRainVol(parseInt(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-coral"
                />
              </div>

              {/* Fire Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center space-x-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Cozy Fireplace</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40">{fireVol}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fireVol}
                  onChange={(e) => {
                    setFireVol(parseInt(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-coral"
                />
              </div>

              {/* Piano Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center space-x-1.5">
                    <Music className="w-3.5 h-3.5 text-purple-400" />
                    <span>Midnight Piano</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40">{pianoVol}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pianoVol}
                  onChange={(e) => {
                    setPianoVol(parseInt(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-coral"
                />
              </div>
            </div>

            {/* Subtle Visualizer Wave */}
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-sans">
              <span>Soundscape Synthesizer</span>
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-3">
                  <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-0.5 bg-brand-coral" />
                  <motion.div animate={{ height: [8, 4, 10] }} transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.2 }} className="w-0.5 bg-brand-coral" />
                  <motion.div animate={{ height: [3, 10, 3] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }} className="w-0.5 bg-brand-coral" />
                  <motion.div animate={{ height: [6, 3, 8] }} transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut", delay: 0.1 }} className="w-0.5 bg-brand-coral" />
                </div>
              ) : (
                <div className="flex items-end gap-0.5 h-3">
                  <div className="w-0.5 h-[3px] bg-white/20" />
                  <div className="w-0.5 h-[3px] bg-white/20" />
                  <div className="w-0.5 h-[3px] bg-white/20" />
                  <div className="w-0.5 h-[3px] bg-white/20" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
