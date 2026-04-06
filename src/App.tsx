import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap'; 
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Brain, Smile, Zap, Target, ArrowRight, Star, Coffee, Rocket, MessageCircle, Lightbulb, Presentation, Trophy } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import Antigravity from './Antigravity';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

// 3D Background Component
function Stars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() => {
    // Generate random points in a sphere
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = Math.random() * 1.5;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#e0aaff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Interactive Card Wrapper Component
function InteractiveCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation between -10 and 10 degrees based on mouse position inside the card
    const multiplier = 20; // max rotation in degrees
    const rotateY = multiplier * ((x - rect.width / 2) / (rect.width / 2));
    const rotateX = -multiplier * ((y - rect.height / 2) / (rect.height / 2));
    
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `${-rotateY}px ${rotateX}px 40px rgba(255, 255, 255, 0.15)`;
    // Adding a shine effect based on mouse position
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `0 16px 40px rgba(0, 0, 0, 0.4)`;
    card.style.background = `rgba(255, 255, 255, 0.05)`;
  };

  return (
    <div 
      className={`interactive-card-wrapper`}
      style={{ perspective: '1200px', width: '100%', maxWidth: '900px' }}
    >
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="rgba(255,255,255,0.05)"
        borderRadius={30}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#ffffff', '#aaaaaa', '#ffffff']}
      >
        <div 
          ref={cardRef} 
          className={`glass-card interactive-card ${className}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transition: 'transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease', width: '100%', height: '100%' }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" },
              visible: { 
                opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
                transition: { type: "spring", bounce: 0.5, duration: 1.2, staggerChildren: 0.15 } 
              }
            }}
          >
            {React.Children.map(children, (child) => 
               React.isValidElement(child) ? 
               <motion.div variants={{
                 hidden: { opacity: 0, y: 30, scale: 0.8 },
                 visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.6, duration: 1 } }
               }}>
                 {child}
               </motion.div> : child
            )}
          </motion.div>
        </div>
      </BorderGlow>
    </div>
  );
}

function Section({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section className={`section ${className}`} id={id}>
      {children}
    </section>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [timer5, setTimer5] = useState(5);
  const [timer20, setTimer20] = useState(20);
  const [timer120, setTimer120] = useState(120);

  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Ultra-smooth scrolling setup with Lenis mapped to GSAP
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);

    // Sync GSAP to Lenis
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // GSAP Scroll Animations
    const sections = document.querySelectorAll('.section .glass-card');
    sections.forEach((sec) => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 100, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
          }
        }
      );
    });

  }, []);

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

  const triggerConfetti = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // 5 seconds of confetti celebration
  };

  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div ref={containerRef} className="app-container">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} style={{ position: 'fixed', zIndex: 9999 }} />}
      {/* Top Header Animated */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(5, 5, 5, 0.2)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.5rem' }}>
          <img src="/Sanskar-Footer-logo.png" alt="Sanskar School" style={{ height: '50px', objectFit: 'contain' }} />
          <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.3)' }}></div>
          <img src="/skillizee-white-logo.png" alt="Skillizee" style={{ height: '40px', objectFit: 'contain' }} />
        </div>
      </motion.header>

      <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
           <Antigravity
              count={400}
              magnetRadius={10}
              ringRadius={10}
              waveSpeed={0.4}
              waveAmplitude={1}
              particleSize={2.5}
              lerpSpeed={0.06}
              color="#ffffff"
              autoAnimate={false}
              particleVariance={1}
              rotationSpeed={0}
              depthFactor={1}
              pulseSpeed={3}
              particleShape="capsule"
              fieldStrength={10}
           />
      </div>

      {/* SLIDE 1 */}
      <Section id="slide-1">
        <InteractiveCard>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ display: 'inline-block', marginBottom: '1rem' }}
          >
            <Smile size={80} color="#facc15" />
          </motion.div>
          <h2 className="subtitle">SkilliZee Student Orientation</h2>
          <h1 className="title-main gradient-text">Same Students.<br/>Different Summer.</h1>
          <div style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Scroll to discover <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }}/>
          </div>
        </InteractiveCard>
      </Section>

      {/* SLIDE 2 */}
      <Section id="slide-2">
        <InteractiveCard>
          <h1 className="title-main">
            New Session<br/>
            <span className="gradient-text">New Class</span><br/>
            New Notebooks
          </h1>
        </InteractiveCard>
      </Section>

      {/* SLIDE 3 */}
      <Section id="slide-3">
        <InteractiveCard>
          <h1 className="title-main">
            Will <span className="gradient-text">YOU</span> be a better version of yourself this year?
            <span style={{color: '#7b2cbf', animation: 'blink 1s step-end infinite'}}>|</span>
          </h1>
        </InteractiveCard>
      </Section>

      {/* SLIDE 4 */}
      <Section id="slide-4">
        <InteractiveCard>
          <motion.div style={{ display: 'inline-block', marginBottom: '1rem' }} animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
            <Zap size={60} color="#facc15" />
          </motion.div>
          <h2 className="subtitle">Reality Check</h2>
          <div className="split-screen">
             <div className="split-side bright interactive-hover">
                 <h1 className="title-main">New Goals</h1>
             </div>
             <div className="split-side dim interactive-hover">
                 <h1 className="title-main">Same Habits</h1>
             </div>
          </div>
        </InteractiveCard>
      </Section>

      {/* SLIDE 5 */}
      <Section id="slide-5">
        <InteractiveCard>
          <h1 className="title-main gradient-text">What will make THIS year different?</h1>
        </InteractiveCard>
      </Section>

      {/* SLIDE 6 */}
      <Section id="slide-6">
         <InteractiveCard>
           <h2 className="subtitle" style={{color: '#ffb703', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32} /> Activity 1</h2>
           <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}><Smile size={48} /> Show your REAL summer routine</h1>
           <div className="timer interactive-pulse">{timer5}</div>
           <br/>
           <button 
             className="skillizee-btn" 
             style={{padding: '1rem 2rem', background: '#7b2cbf', border: 'none', color: '#fff', borderRadius: '20px', cursor: 'pointer', fontSize: '1.5rem', transition: 'all 0.3s'}}
             onClick={() => { setTimer5(5); setActiveTimer('5s'); }}
           >
             Start Countdown
           </button>
         </InteractiveCard>
      </Section>

      {/* SLIDE 7 */}
      <Section id="slide-7">
        <InteractiveCard>
          <h1 className="title-main">Comfortable…</h1>
          <h2 className="subtitle bounce-in" style={{color: '#ff0054'}}>But nothing changes.</h2>
        </InteractiveCard>
      </Section>

      {/* SLIDE 8 */}
      <Section id="slide-8">
        <InteractiveCard>
           <h2 className="subtitle" style={{color: '#ffb703', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32} /> Think Fast (Activity 2)</h2>
           <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}><Brain size={48} /> How would you make your school more fun?</h1>
           <div className="timer interactive-pulse">{timer20}</div>
           <br/>
           <button 
             className="skillizee-btn" 
             style={{padding: '1rem 2rem', background: '#7b2cbf', border: 'none', color: '#fff', borderRadius: '20px', cursor: 'pointer', fontSize: '1.5rem', transition: 'transform 0.2s', boxShadow: '0px 10px 20px rgba(123, 44, 191, 0.4)'}}
             onClick={() => { setTimer20(20); setActiveTimer('20s'); }}
           >
             Start Countdown
           </button>
        </InteractiveCard>
      </Section>

      {/* SLIDE 9 */}
      <Section id="slide-9">
        <InteractiveCard>
          <h1 className="title-main gradient-text">You have ideas.</h1>
          <h2 className="subtitle">You just don’t use them enough.</h2>
        </InteractiveCard>
      </Section>

      {/* SLIDE 10 */}
      <Section id="slide-10">
        <InteractiveCard>
           <h2 className="subtitle" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Brain size={32} /> Meta Skills</h2>
           <div className="grid-cards">
              <div className="info-card interactive-float"><Brain size={40} style={{marginBottom: '1rem'}}/><h3>Thinking</h3></div>
              <div className="info-card interactive-float" style={{animationDelay: '0.2s'}}><MessageCircle size={40} style={{marginBottom: '1rem'}}/><h3>Communication</h3></div>
              <div className="info-card interactive-float" style={{animationDelay: '0.4s'}}><Target size={40} style={{marginBottom: '1rem'}}/><h3>Problem-Solving</h3></div>
           </div>
        </InteractiveCard>
      </Section>

      {/* SLIDE 11 */}
      <Section id="slide-11">
        <InteractiveCard>
          <h1 className="title-main">These are <br/><span className="gradient-text">Meta Skills</span></h1>
          <h2 className="subtitle">They make you stand out.</h2>
        </InteractiveCard>
      </Section>

      {/* SLIDE 12 */}
      <Section id="slide-12">
         <InteractiveCard>
           <h2 className="subtitle" style={{color: '#ffb703', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32}/> Main Wow! (Activity 3)</h2>
           <h1 className="title-main" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}><Rocket size={48}/> Real-World Challenge</h1>
           <p style={{fontSize: '2rem', marginBottom: '2rem'}}>A brand wants students to choose them.<br/>Your idea?</p>
           <p style={{fontSize: '1.5rem', color: '#fff', opacity: 0.6}}>(Groups of 3)</p>
           <div className="timer interactive-pulse">{formatTime(timer120)}</div>
           <br/>
           <button 
             className="skillizee-btn glow-btn" 
             style={{padding: '1rem 2rem', background: '#7b2cbf', border: 'none', color: '#fff', borderRadius: '20px', cursor: 'pointer', fontSize: '1.5rem'}}
             onClick={() => { setTimer120(120); setActiveTimer('120s'); }}
           >
             Start 2 Min Timer
           </button>
         </InteractiveCard>
      </Section>

      {/* SLIDE 13 */}
      <Section id="slide-13">
         <InteractiveCard>
           <h1 className="title-main gradient-text">This is real-world thinking.</h1>
         </InteractiveCard>
      </Section>

      {/* SLIDE 14 */}
      <Section id="slide-14">
        <InteractiveCard>
          <h2 className="subtitle">This summer…</h2>
          <div className="grid-cards">
             <div className="info-card interactive-float" style={{borderColor: '#ff006e'}}><h3>Speak confidently</h3></div>
             <div className="info-card interactive-float" style={{borderColor: '#8338ec', animationDelay: '0.2s'}}><h3>Think differently</h3></div>
             <div className="info-card interactive-float" style={{borderColor: '#3a86ff', animationDelay: '0.4s'}}><h3>Share ideas fearlessly</h3></div>
          </div>
        </InteractiveCard>
      </Section>

      {/* SLIDE 15 */}
      <Section id="slide-15">
        <InteractiveCard>
           <h2 className="subtitle" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Zap size={32}/> Future You</h2>
           <h1 className="title-main">"What did you do this summer?"</h1>
           <div className="split-screen">
              <div className="split-side dim interactive-hover">
                 <h1 style={{fontSize: '3rem'}}>“Nothing much…”</h1>
              </div>
              <div className="split-side bright interactive-hover">
                 <h1 className="gradient-text" style={{fontSize: '3rem'}}>“I built something.”</h1>
              </div>
           </div>
        </InteractiveCard>
      </Section>

      {/* SLIDE 16 */}
      <Section id="slide-16">
        <InteractiveCard>
           <h2 className="subtitle" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}><Rocket size={32}/> The Experience</h2>
           <div className="grid-cards">
             <div className="info-card interactive-float"><Target size={40} style={{marginBottom: '1rem'}}/><h3>Work on real challenges</h3></div>
             <div className="info-card interactive-float" style={{animationDelay: '0.2s'}}><Lightbulb size={40} style={{marginBottom: '1rem'}}/><h3>Build ideas</h3></div>
             <div className="info-card interactive-float" style={{animationDelay: '0.4s'}}><Presentation size={40} style={{marginBottom: '1rem'}}/><h3>Present confidently</h3></div>
           </div>
        </InteractiveCard>
      </Section>

      {/* SLIDE 17 */}
      <Section id="slide-17">
        <InteractiveCard>
           <h2 className="subtitle">This is your</h2>
           <h1 className="title-main gradient-text float-text" style={{fontSize: '5rem'}}>SkilliZee Experience</h1>
        </InteractiveCard>
      </Section>

      {/* SLIDE 18 */}
      <Section id="slide-18">
        <InteractiveCard>
           <h1 className="title-main">Today was just a glimpse.</h1>
           <h2 className="subtitle" style={{color: '#fff', margin: '2rem 0'}}>We’re coming back. Next time…</h2>
           <h1 className="title-main gradient-text pulse-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>You step into your<br/>SkilliZee Experience</h1>
           
           <div style={{marginTop: '4rem'}}>
             <motion.span 
               onClick={triggerConfetti}
               style={{display: 'inline-block', cursor: 'pointer'}} 
               className="interactive-wave"
               whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
               transition={{ duration: 0.5 }}
             >
               <Trophy size={80} color="#facc15" />
             </motion.span>
             <p style={{ marginTop: '1rem', fontSize: '1rem', color: '#aaaaaa' }}>Click me!</p>
           </div>
        </InteractiveCard>
      </Section>

    </div>
  );
}
