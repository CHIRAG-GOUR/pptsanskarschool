import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Abstract shapes for background
export const AbstractShapes = () => {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.to('.shape-1', { y: -20, rotation: 10, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.shape-2', { y: 25, rotation: -15, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.shape-3', { scale: 1.1, opacity: 1, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    
    gsap.from('.abstract-path', {
      strokeDasharray: 200,
      strokeDashoffset: 200,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
      <div className="shape-1" style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.6 }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="40" stroke="#0B66E4" strokeWidth="4" className="abstract-path" opacity="0.5" />
          <circle cx="60" cy="60" r="30" fill="#0B66E4" opacity="0.4" />
        </svg>
      </div>
      <div className="shape-2" style={{ position: 'absolute', bottom: '15%', right: '10%', opacity: 0.6 }}>
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          <rect x="30" y="30" width="80" height="80" rx="20" fill="#FFB300" opacity="0.15" transform="rotate(15 70 70)" />
          <rect x="40" y="40" width="60" height="60" rx="15" fill="#FFB300" opacity="0.3" transform="rotate(15 70 70)" />
        </svg>
      </div>
      <div className="shape-3" style={{ position: 'absolute', top: '30%', right: '5%', opacity: 0.5 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M40 10L65 60H15L40 10Z" fill="#ff006e" opacity="0.2" transform="rotate(45 40 40)" />
        </svg>
      </div>
    </div>
  );
};

// Illustration 1: The "Digital Builder" (Windows, Code lines, shapes)
export const DigitalBuilder = ({ className = '' }: { className?: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Floating windows
    gsap.to('.db-float', { y: -15, rotation: 2, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.db-float-rev', { y: 15, rotation: -2, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    
    // Code lines staggering in
    gsap.fromTo('.db-code', 
      { scaleX: 0, transformOrigin: 'left center' }, 
      { scaleX: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.7)', repeat: -1, repeatDelay: 2 }
    );

    // Nodes pulsing
    gsap.to('.db-node', { scale: 1.2, transformOrigin: 'center center', duration: 1.5, yoyo: true, repeat: -1, stagger: 0.3 });
  }, { scope: container });

  return (
    <div className={className} ref={container}> 
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="120" fill="#0B66E4" opacity="0.1" />
        
        <g className="db-float">
          <rect className="db-window" x="60" y="80" width="180" height="120" rx="12" fill="#001529" stroke="#0B66E4" strokeWidth="4" />
          <path d="M60 100H240" stroke="#0B66E4" strokeWidth="4" />
          <circle className="db-node" cx="75" cy="90" r="4" fill="#FF3366" />
          <circle className="db-node" cx="90" cy="90" r="4" fill="#FFB300" />
          <circle className="db-node" cx="105" cy="90" r="4" fill="#00C853" />
          
          <rect className="db-code" x="80" y="120" width="100" height="6" rx="3" fill="#ffffff" opacity="0.3" />
          <rect className="db-code" x="80" y="140" width="140" height="6" rx="3" fill="#ffffff" opacity="0.2" />
          <rect className="db-code" x="80" y="160" width="80" height="6" rx="3" fill="#FFB300" opacity="0.8" />
        </g>

        <g className="db-float-rev">
          <rect x="220" y="140" width="60" height="60" rx="16" fill="#FFB300" opacity="0.9" />
          <path d="M240 170L250 180L265 160" stroke="#001529" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
};

// Illustration 2: The "Growth Analytics" (Charts, target bars)
export const GrowthAnalytics = ({ className = '' }: { className?: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Floating
    gsap.to('.ga-float', { y: 15, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.ga-float-2', { y: -10, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    // Bars rise up
    gsap.fromTo('.ga-bar', 
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: 1.5, stagger: 0.2, ease: 'elastic.out(1, 0.5)', repeat: -1, repeatDelay: 3 }
    );
    
    // Target pulse
    gsap.to('.ga-target-ring', {
      scale: 1.5,
      opacity: 0,
      duration: 2,
      repeat: -1,
      transformOrigin: 'center center'
    });
  }, { scope: container });

  return (
    <div className={className} ref={container}> 
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="100" fill="#FFB300" opacity="0.1" />

        <g className="ga-float">
          <rect x="40" y="80" width="220" height="140" rx="16" fill="#001529" stroke="#FFB300" strokeWidth="4" />
          <path d="M40 200H260" stroke="#FFB300" strokeWidth="4" strokeDasharray="8 8" />

          <rect className="ga-bar" x="70" y="140" width="30" height="60" rx="6" fill="#ffffff" opacity="0.3" />
          <rect className="ga-bar" x="120" y="110" width="30" height="90" rx="6" fill="#0cebeb" />
          <rect className="ga-bar" x="170" y="160" width="30" height="40" rx="6" fill="#ffffff" opacity="0.3" />
          <rect className="ga-bar" x="220" y="70" width="30" height="130" rx="6" fill="#FFB300" />
        </g>

        <g className="ga-float-2">
           <circle cx="240" cy="60" r="35" fill="#0B66E4" />
           <circle cx="240" cy="60" r="20" fill="#001529" stroke="#0B66E4" strokeWidth="4" />
           <circle cx="240" cy="60" r="35" stroke="#FFB300" strokeWidth="2" className="ga-target-ring" />
           <circle cx="240" cy="60" r="8" fill="#FFB300" />
        </g>
      </svg>
    </div>
  );
};

// Illustration 3: The "Creative Idea" (3D-ish Blocks and Lightbulb Abstract)
export const CreativeIdea = ({ className = '' }: { className?: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Bulb rotation & float
    gsap.to('.ci-float', { y: -15, rotation: 5, duration: 4, yoyo: true, repeat: -1, ease: 'power1.inOut' });

    // Path draw for the bulb
    gsap.fromTo('.ci-bulb-path', 
      { strokeDasharray: 200, strokeDashoffset: 200 },
      { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', yoyo: true, repeat: -1 }
    );

    // Sparks shooting out
    gsap.fromTo('.ci-spark',
      { scale: 0, opacity: 1, transformOrigin: 'center' },
      { scale: 1.5, opacity: 0, duration: 1.5, stagger: { each: 0.2, repeat: -1 }, ease: 'power2.out' }
    );
  }, { scope: container });

  return (
    <div className={className} ref={container}>
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="160" r="110" fill="#0cebeb" opacity="0.08" />

        <g className="ci-float">
           <rect x="90" y="60" width="120" height="160" rx="20" fill="#001529" stroke="#0cebeb" strokeWidth="4" transform="rotate(-10 150 140)" />
           <rect x="70" y="100" width="160" height="100" rx="20" fill="#001529" stroke="#FFB300" strokeWidth="4" transform="rotate(5 150 150)" />

           <path className="ci-bulb-path" d="M150 120C158 120 165 127 165 135C165 140 162 145 158 148C155 151 155 155 155 158H145C145 155 145 151 142 148C138 145 135 140 135 135C135 127 142 120 150 120Z" stroke="#FFB300" strokeWidth="4" />
           <path className="ci-bulb-path" d="M145 163H155" stroke="#FFB300" strokeWidth="4" strokeLinecap="round" />
           <path className="ci-bulb-path" d="M148 168H152" stroke="#FFB300" strokeWidth="4" strokeLinecap="round" />
        </g>

        <circle className="ci-spark" cx="90" cy="50" r="12" fill="#FFB300" />
        <circle className="ci-spark" cx="210" cy="80" r="8" fill="#0B66E4" />
        <circle className="ci-spark" cx="200" cy="220" r="15" fill="#ff006e" />
        <circle className="ci-spark" cx="60" cy="190" r="10" fill="#0cebeb" />
      </svg>
    </div>
  );
};
