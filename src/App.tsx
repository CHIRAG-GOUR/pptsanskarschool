import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Smile, Zap, Target, Rocket, MessageCircle, Lightbulb, Presentation, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { DigitalBuilder, GrowthAnalytics, CreativeIdea } from './Illustrations';
import { SchoolBackground } from './SchoolBackground';

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
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(20px)',
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
              <h1 className="title-main gradient-text-skillizee" style={{ fontSize: '4.5rem', lineHeight: 1.1 }}>Same Students.<br/>Different Summer.</h1>
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
        <img src="/Illustration 1.png" alt="Illustration 1" style={{ maxWidth: '350px', width: '100%', objectFit: 'contain', margin: '0 auto 2rem auto', display: 'block' }} />
        <h1 className="title-main">
          New Session<br/>
          <span className="gradient-text-skillizee">New Class</span><br/>
          New Notebooks
        </h1>
      </SlideCard>
    ),
    // SLIDE 2
    (
      <SlideCard>
        <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
          Will <span className="gradient-text-skillizee">YOU</span> be a better version of yourself this year?
          <span style={{color: '#0B66E4', animation: 'blink 1s step-end infinite'}}>|</span>
        </h1>
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
               <h1 className="title-main">New Goals</h1>
           </div>
           <div className="split-side dim">
               <h1 className="title-main" style={{color: 'rgba(255,255,255,0.4)'}}>Same Habits</h1>
           </div>
        </div>
      </SlideCard>
    ),
    // SLIDE 4
    (
      <SlideCard>
        <h1 className="title-main gradient-text-skillizee">What will make THIS year different?</h1>
      </SlideCard>
    ),
    // SLIDE 5
    (
       <SlideCard>
         <h2 className="subtitle" style={{color: '#FFB300', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32} /> Activity 1</h2>
         <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}><Smile size={48} /> Show your REAL summer routine</h1>
         <div className="timer" style={{margin: '2rem 0'}}>{timer5}</div>
         <button className="skillizee-primary-btn" onClick={() => { setTimer5(5); setActiveTimer('5s'); }}>
           Start Countdown
         </button>
       </SlideCard>
    ),
    // SLIDE 6
    (
      <SlideCard>
        <h1 className="title-main">Comfortable…</h1>
        <h2 className="subtitle" style={{color: '#FF3366', fontSize: '2.5rem', marginTop: '1rem'}}>But nothing changes.</h2>
      </SlideCard>
    ),
    // SLIDE 7
    (
      <SlideCard>
         <h2 className="subtitle" style={{color: '#FFB300', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32} /> Think Fast (Activity 2)</h2>
         <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}><Brain size={48} /> How would you make your school more fun?</h1>
         <div className="timer" style={{margin: '2rem 0'}}>{timer20}</div>
         <button className="skillizee-primary-btn" onClick={() => { setTimer20(20); setActiveTimer('20s'); }}>
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
            <h1 className="title-main gradient-text-skillizee" style={{ fontSize: '4.5rem', lineHeight: 1.1 }}>You have ideas.</h1>
            <h2 className="subtitle" style={{ marginTop: '1rem' }}>You just don’t use them enough.</h2>
          </div>
        </div>
      </SlideCard>
    ),
    // SLIDE 9
    (
      <SlideCard>
         <h2 className="subtitle" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Brain size={32} /> Meta Skills</h2>
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
              <h1 className="title-main" style={{ fontSize: '4.5rem', lineHeight: 1.1 }}>These are <br/><span className="gradient-text-skillizee">Meta Skills</span></h1>
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
         <h2 className="subtitle" style={{color: '#FFB300', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32}/> Main Wow! (Activity 3)</h2>
         <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}><Rocket size={48}/> Real-World Challenge</h1>
         <p style={{fontSize: '2rem', marginBottom: '1rem'}}>A brand wants students to choose them.<br/>Your idea?</p>
         <p style={{fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem'}}>(Groups of 3)</p>
         <div className="timer" style={{margin: '1rem 0'}}>{formatTime(timer120)}</div>
         <button className="skillizee-primary-btn" onClick={() => { setTimer120(120); setActiveTimer('120s'); }}>
           Start 2 Min Timer
         </button>
       </SlideCard>
    ),
    // SLIDE 12
    (
       <SlideCard>
         <h1 className="title-main gradient-text-skillizee">This is real-world thinking.</h1>
       </SlideCard>
    ),
    // SLIDE 13
    (
      <SlideCard>
        <h2 className="subtitle">This summer…</h2>
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
         <h1 className="title-main">"What did you do this summer?"</h1>
         <div className="split-screen">
            <div className="split-side dim">
               <h1 style={{fontSize: '3rem', color: 'rgba(255,255,255,0.4)', margin: 0}}>“Nothing much…”</h1>
            </div>
            <div className="split-side bright">
               <h1 className="gradient-text-skillizee" style={{fontSize: '3rem', margin: 0}}>“I built something.”</h1>
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
                if (prev <= 1) { clearInterval(interval); triggerConfetti(); setActiveTimer(null); return 0; }
                return prev - 1;
            });
        }, 1000);
     } else if (activeTimer === '20s') {
        interval = setInterval(() => {
            setTimer20(prev => {
                if (prev <= 1) { clearInterval(interval); triggerConfetti(); setActiveTimer(null); return 0; }
                return prev - 1;
            });
        }, 1000);
     } else if (activeTimer === '120s') {
        interval = setInterval(() => {
            setTimer120(prev => {
                if (prev <= 1) { clearInterval(interval); triggerConfetti(); setActiveTimer(null); return 0; }
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
          padding: '1.2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem' }}>
          <img src="/Sanskar-Footer-logo.png" alt="Sanskar School" style={{ height: '45px', objectFit: 'contain' }} />
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
          <img src="/skillizee-white-logo.png" alt="Skillizee" style={{ height: '35px', objectFit: 'contain' }} />
        </div>
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
