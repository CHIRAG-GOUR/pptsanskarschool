import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Smile, Zap, Target, Rocket, MessageCircle, Lightbulb, Presentation, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { DigitalBuilder, GrowthAnalytics, CreativeIdea } from './Illustrations';
import { SchoolBackground } from './SchoolBackground';
import { WordReveal, LetterBounce, Typewriter, GlitchText, ScalePopText, LettersPullUp } from './AnimatedTexts';

function SlideCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div 
      className={`slide-card-wrapper`}
      style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}
    >
      <div
        className={`glass-card ${className}`}
        style={{
          width: '100%',
          padding: '5rem 4rem',
          borderRadius: '3rem',
          background: 'rgba(0, 0, 0, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(24px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false }}
           variants={{
             hidden: { opacity: 0, y: 40 },
             visible: { 
               opacity: 1, y: 0, 
               transition: { type: "spring", bounce: 0.3, duration: 0.8, staggerChildren: 0.15 } 
             }
           }}
        >
          {React.Children.map(children, (child) => 
             React.isValidElement(child) ? 
             <motion.div variants={{
               hidden: { opacity: 0, y: 20 },
               visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
             }}>
               {child}
             </motion.div> : child
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [timer5, setTimer5] = useState(5);
  const [timer20, setTimer20] = useState(20);
  const [timer120, setTimer120] = useState(120);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const triggerConfetti = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); 
  };
    const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.1) => { const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext; if (!AudioContextClass) return; const ctx = new AudioContextClass(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = type; osc.frequency.setValueAtTime(freq, ctx.currentTime); gain.gain.setValueAtTime(vol, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + duration); }; const playTick = () => playTone(800, 'sine', 0.05, 0.03); const playStart = () => { playTone(600, 'triangle', 0.4, 0.1); setTimeout(() => playTone(800, 'triangle', 0.4, 0.1), 100); }; const playEnd = () => { playTone(500, 'square', 0.3, 0.1); setTimeout(() => playTone(700, 'square', 0.5, 0.15), 300); };

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const slides = [
    // SLIDE 0
    (
      <SlideCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', width: '100%', textAlign: 'left' }}>
           <div style={{ flex: 1 }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                <Smile size={80} color="#FFB300" />
              </motion.div>
              <h2 className="subtitle">SkilliZee Student Orientation</h2>
              <WordReveal text="Same Students. Different Summer." className="title-main gradient-text-skillizee" style={{ fontSize: '4.5rem', lineHeight: 1.1 }} />
           </div>
           <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
               <DigitalBuilder />
           </div>
        </div>
      </SlideCard>
    ),
    // SLIDE 1
    (
      <SlideCard>
        <img src="/Illustration 1.png" alt="Illustration 1" style={{ maxWidth: '650px', width: '100%', height: 'auto', objectFit: 'contain', margin: '0 auto 1.5rem auto', display: 'block' }} />
        <LettersPullUp text="New Session • New Class" className="title-main gradient-text-skillizee" style={{ fontSize: '3.5rem', lineHeight: '1.2', justifyContent: 'center' }} />
        <LettersPullUp text="New Notebooks" className="title-main" style={{ fontSize: '3.5rem', lineHeight: '1.2', justifyContent: 'center' }} />
      </SlideCard>
    ),
    // SLIDE 2
    (
      <SlideCard>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
          <Typewriter text="Will YOU be a better version of yourself this year?" className="title-main" />
          <span style={{color: '#0B66E4', animation: 'blink 1s step-end infinite', fontSize: '4.5rem', fontWeight: 800}}>|</span>
        </div>
      </SlideCard>
    ),
    // SLIDE 3
    (
      <SlideCard>
        <motion.div style={{ display: 'inline-block', marginBottom: '1rem' }} animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
          <Zap size={60} color="#FFB300" />
        </motion.div>
        <h2 className="subtitle">Reality Check</h2>
        <div className="split-screen" style={{ marginTop: '2rem' }}>
           <div className="split-side bright">
               <ScalePopText text="New Goals" className="title-main" />
           </div>
           <div className="split-side dim">
               <GlitchText text="Same Habits" className="title-main" style={{color: 'rgba(255,255,255,0.4)', display: 'block'}} />
           </div>
        </div>
      </SlideCard>
    ),
    // SLIDE 4
    (
      <SlideCard>
        <WordReveal text="What will make THIS year different?" className="title-main gradient-text-skillizee" style={{marginBottom: '2rem', justifyContent: 'center'}} />  
        <img src="/Gif 2.gif" alt="Different" style={{ maxHeight: '250px', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto' }} />
      </SlideCard>
    ),
    // SLIDE 5
    (
       <SlideCard>
         <div style={{color: '#FFB300', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
               <Zap size={32} /> <LettersPullUp text="Activity 1" className="subtitle" style={{margin: 0}} />
           </div>
           <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '1rem'}}>
               <Smile size={48} /> <LettersPullUp text="Show your REAL summer routine" className="title-main" style={{ fontSize: '3.5rem', margin: 0}} /> 
         </div>
         <div className="timer" style={{margin: '2rem 0'}}>{timer5}</div>
         <button className="skillizee-primary-btn" onClick={() => { playStart(); setTimer5(5); setActiveTimer('5s'); }}>
           Start Countdown
         </button>
       </SlideCard>
    ),
    // SLIDE 6
    (
      <SlideCard>        <img src="/Gif 3.gif" alt="Comfortable" style={{ maxHeight: '250px', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto 2rem auto' }} />        <h1 className="title-main">Comfortable…</h1>
        <h2 className="subtitle" style={{color: '#FF3366', fontSize: '2.5rem', marginTop: '1rem'}}>But nothing changes.</h2>
      </SlideCard>
    ),
    // SLIDE 7
    (
      <SlideCard>
         <h2 className="subtitle" style={{color: '#FFB300', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32} /> Think Fast (Activity 2)</h2>
         <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}><Brain size={48} /> How would you make your school more fun?</h1>
         <div className="timer" style={{margin: '2rem 0'}}>{timer20}</div>
         <button className="skillizee-primary-btn" onClick={() => { playStart(); setTimer20(20); setActiveTimer('20s'); }}>
           Start Countdown
         </button>
      </SlideCard>
    ),
    // SLIDE 8
    (
      <SlideCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', width: '100%', textAlign: 'left' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <CreativeIdea />
          </div>
          <div style={{ flex: 1 }}>
            <LetterBounce text="You have ideas." className="title-main gradient-text-skillizee" style={{ fontSize: '4.5rem', lineHeight: 1.1, flexWrap: 'wrap' }} /> 
            <h2 className="subtitle" style={{ marginTop: '1rem' }}>You just don’t use them enough.</h2>
          </div>
        </div>
      </SlideCard>
    ),
    // SLIDE 9
    (
      <SlideCard>
         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '2rem'}}>
               <Brain size={32} /> <LettersPullUp text="Meta Skills" className="subtitle" style={{ fontSize: '3.5rem', margin: 0}} />
         </div>
         <div className="grid-cards">
            <div className="info-card"><Brain size={40} style={{marginBottom: '1rem', color: '#FFB300'}}/><h3>Thinking</h3></div>
            <div className="info-card"><MessageCircle size={40} style={{marginBottom: '1rem', color: '#FFB300'}}/><h3>Communication</h3></div>
            <div className="info-card"><Target size={40} style={{marginBottom: '1rem', color: '#FFB300'}}/><h3>Problem-Solving</h3></div>
         </div>
      </SlideCard>
    ),
    // SLIDE 10
    (
      <SlideCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', width: '100%', textAlign: 'left' }}>
           <div style={{ flex: 1 }}>
              <h1 className="title-main" style={{ fontSize: '4.5rem', lineHeight: 1.1 }}>These are</h1>
              <WordReveal text="Meta Skills" className="title-main gradient-text-skillizee" style={{ fontSize: '4.5rem', lineHeight: 1.1 }} />
              <h2 className="subtitle" style={{marginTop: '2rem'}}>They make you stand out.</h2>
           </div>
           <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <GrowthAnalytics />
           </div>
        </div>
      </SlideCard>
    ),
    // SLIDE 11
    (
       <SlideCard>
         <div style={{color: '#FFB300', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem'}}>
               <Zap size={32}/> <LettersPullUp text="Main Wow! (Activity 3)" className="subtitle" style={{ fontSize: '3rem', margin: 0}} />
           </div>
           <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
               <Rocket size={48}/> <LettersPullUp text="Real-World Challenge" className="title-main" style={{ fontSize: '4.5rem', margin: 0}} />
         </div>
         <p style={{fontSize: '2rem', marginBottom: '1rem'}}>A brand wants students to choose them.<br/>Your idea?</p>
         <p style={{fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem'}}>(Groups of 3)</p>
         <div className="timer" style={{margin: '1rem 0'}}>{formatTime(timer120)}</div>
         <button className="skillizee-primary-btn" onClick={() => { playStart(); setTimer120(120); setActiveTimer('120s'); }}>
           Start 2 Min Timer
         </button>
       </SlideCard>
    ),
    // SLIDE 12
    (
       <SlideCard>
         <h1 className="title-main gradient-text-skillizee" style={{marginBottom: '2rem'}}>This is real-world thinking.</h1>
         <img src="/Gif 4.gif" alt="Real world" style={{ maxHeight: '250px', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto' }} />
       </SlideCard>
    ),
    // SLIDE 13
    (
      <SlideCard>
        <h2 className="subtitle">This summer…</h2>
        <img src="/Gif 1.gif" alt="This summer" style={{ maxHeight: '250px', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '1rem auto 2rem auto' }} />
        <div className="grid-cards">
           <div className="info-card" style={{borderTop: '4px solid #0B66E4'}}><h3>Speak confidently</h3></div>
           <div className="info-card" style={{borderTop: '4px solid #FFB300'}}><h3>Think differently</h3></div>
           <div className="info-card" style={{borderTop: '4px solid #00C853'}}><h3>Share ideas fearlessly</h3></div>
        </div>
      </SlideCard>
    ),
    // SLIDE 14
    (
      <SlideCard>
         <h2 className="subtitle" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32}/> Future You</h2>
         <WordReveal text="What did you do this summer?" className="title-main" style={{justifyContent: 'center'}} />
         <div className="split-screen">
            <div className="split-side dim">
               <GlitchText text="“Nothing much…”" style={{fontSize: '3rem', color: 'rgba(255,255,255,0.4)', margin: 0, fontWeight: 800}} />
            </div>
            <div className="split-side bright">
               <ScalePopText text="“I built something.”" className="gradient-text-skillizee" style={{fontSize: '3rem', margin: 0, fontWeight: 800}} />
            </div>
         </div>
      </SlideCard>
    ),
    // SLIDE 15
    (
      <SlideCard>
         <h2 className="subtitle" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Rocket size={32}/> The Experience</h2>
         <div className="grid-cards">
           <div className="info-card"><Target size={40} style={{marginBottom: '1rem', color: '#0cebeb'}}/><h3>Work on real challenges</h3></div>
           <div className="info-card"><Lightbulb size={40} style={{marginBottom: '1rem', color: '#0cebeb'}}/><h3>Build ideas</h3></div>
           <div className="info-card"><Presentation size={40} style={{marginBottom: '1rem', color: '#0cebeb'}}/><h3>Present confidently</h3></div>
         </div>
      </SlideCard>
    ),
    // SLIDE 16
    (
      <SlideCard>
         <img src="/Gif 5.gif" alt="Experience" style={{ maxHeight: '250px', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', margin: '0 auto 2rem auto' }} />
         <h2 className="subtitle">This is your</h2>
         <h1 className="title-main gradient-text-skillizee" style={{fontSize: 'clamp(4rem, 8vw, 6rem)', marginTop: '1rem'}}>SkilliZee Experience</h1>
      </SlideCard>
    ),
    // SLIDE 17
    (
      <SlideCard>
         <h1 className="title-main">Today was just a glimpse.</h1>
         <h2 className="subtitle" style={{color: '#fff', margin: '2rem 0'}}>We’re coming back. Next time…</h2>
         <h1 className="title-main gradient-text-skillizee pulse-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>You step into your<br/>SkilliZee Experience</h1>

         <div style={{marginTop: '4rem'}}>
           <motion.div
             onClick={triggerConfetti}
             style={{display: 'inline-block', cursor: 'pointer'}}
             whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
             transition={{ duration: 0.5 }}
           >
             <Trophy size={80} color="#FFB300" />
           </motion.div>
           <p style={{ marginTop: '1rem', fontSize: '1rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold', letterSpacing: '2px' }}>CLICK TO CELEBRATE</p>
         </div>
      </SlideCard>
    )
  ];

  const handlePrev = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  useEffect(() => {
     let interval: any;
     if (activeTimer === '5s') {
        interval = setInterval(() => {
            setTimer5(prev => {
                  if (prev <= 1) { clearInterval(interval); triggerConfetti(); playEnd(); setActiveTimer(null); return 0; }
                  playTick();
                  return prev - 1;
              });
          }, 1000);
       } else if (activeTimer === '20s') {
          interval = setInterval(() => {
              setTimer20(prev => {
                  if (prev <= 1) { clearInterval(interval); triggerConfetti(); playEnd(); setActiveTimer(null); return 0; }
                  playTick();
                  return prev - 1;
              });
          }, 1000);
       } else if (activeTimer === '120s') {
          interval = setInterval(() => {
              setTimer120(prev => {
                  if (prev <= 1) { clearInterval(interval); triggerConfetti(); playEnd(); setActiveTimer(null); return 0; }
                  playTick();
                    return prev - 1;
                });
            }, 1000);
         }
      return () => clearInterval(interval);
    }, [activeTimer]);

    return (
      <div className="app-container skillizee-theme">
      {/* Dynamic CSS Background Setup */}
      <div className="skillizee-bg"></div>
      <SchoolBackground />

      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={400} gravity={0.2} style={{ position: 'fixed', zIndex: 9999 }} />}
      
      {/* Top Header Always Present */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '1.5rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          zIndex: 100,
        }}
      >
        <img src="/Sanskar-Footer-logo.png" alt="Sanskar School" style={{ height: '55px', objectFit: 'contain' }} />
        <img src="/skillizee-blue-logo.png" alt="Skillizee" style={{ height: '45px', objectFit: 'contain' }} />
      </motion.header>

      {/* Floating Navigation Controls */}
      <div className="nav-controls">
         <button onClick={handlePrev} disabled={currentSlide === 0} className={`nav-btn ${currentSlide === 0 ? 'disabled' : ''}`}>
           <ChevronLeft size={32} strokeWidth={2.5}/>
         </button>
         <div className="slide-indicator">
           {currentSlide + 1} / {slides.length}
         </div>
         <button onClick={handleNext} disabled={currentSlide === slides.length - 1} className={`nav-btn ${currentSlide === slides.length - 1 ? 'disabled' : ''}`}>
           <ChevronRight size={32} strokeWidth={2.5}/>
         </button>
      </div>

      {/* Main Slider Viewport */}
      <div className="slider-viewport">
        <motion.div 
          className="slider-track"
          animate={{ x: `-${currentSlide * 100}vw` }}
          transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1 }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide-panel">
              {slide}
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}



