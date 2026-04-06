import { motion } from 'framer-motion';

// Floating animation configuration
const floatAnimation: any = {
  animate: { y: [0, -15, 0], rotate: [0, 2, -2, 0] },
  transition: { repeat: Infinity, duration: 6, ease: "easeInOut" }
};
const floatAnimationReverse: any = {
  animate: { y: [0, 15, 0], rotate: [0, -2, 2, 0] },
  transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
};
const pulseAnimation: any = {
  animate: { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] },
  transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
};

// Abstract shapes for background
export const AbstractShapes = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
    <motion.div {...floatAnimation} style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.6 }}>
       <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
         <circle cx="60" cy="60" r="40" fill="#0B66E4" opacity="0.2" />
         <circle cx="60" cy="60" r="30" fill="#0B66E4" opacity="0.4" />
       </svg>
    </motion.div>
    <motion.div {...floatAnimationReverse} style={{ position: 'absolute', bottom: '15%', right: '10%', opacity: 0.6 }}>
       <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
         <rect x="30" y="30" width="80" height="80" rx="20" fill="#FFB300" opacity="0.15" transform="rotate(15 70 70)" />
         <rect x="40" y="40" width="60" height="60" rx="15" fill="#FFB300" opacity="0.3" transform="rotate(15 70 70)" />
       </svg>
    </motion.div>
    <motion.div {...pulseAnimation} style={{ position: 'absolute', top: '30%', right: '5%', opacity: 0.5 }}>
       <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
         <path d="M40 10L65 60H15L40 10Z" fill="#ff006e" opacity="0.2" transform="rotate(45 40 40)" />
       </svg>
    </motion.div>
  </div>
);

// Illustration 1: The "Digital Builder" (Windows, Code lines, shapes)
export const DigitalBuilder = ({ className = '' }: { className?: string }) => (
  <motion.div className={className} initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{duration: 1}}>
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
      {/* Background blobs */}
      <circle cx="150" cy="150" r="120" fill="#0B66E4" opacity="0.1" />
      <path d="M220 100C240 120 250 150 230 180C210 210 170 230 130 220C90 210 50 180 60 140C70 100 120 60 160 70C200 80 200 80 220 100Z" fill="#0B66E4" opacity="0.15" />
      
      {/* Floating Website Window */}
      <motion.g {...floatAnimation}>
        <rect x="60" y="80" width="180" height="120" rx="12" fill="#001529" stroke="#0B66E4" strokeWidth="4" />
        <path d="M60 100H240" stroke="#0B66E4" strokeWidth="4" />
        <circle cx="75" cy="90" r="4" fill="#FF3366" />
        <circle cx="90" cy="90" r="4" fill="#FFB300" />
        <circle cx="105" cy="90" r="4" fill="#00C853" />
        {/* Code Lines */}
        <rect x="80" y="120" width="100" height="6" rx="3" fill="#ffffff" opacity="0.3" />
        <rect x="80" y="140" width="140" height="6" rx="3" fill="#ffffff" opacity="0.2" />
        <rect x="80" y="160" width="80" height="6" rx="3" fill="#FFB300" opacity="0.8" />
      </motion.g>

      {/* Floating Accent blocks */}
      <motion.g {...floatAnimationReverse}>
        <rect x="220" y="140" width="60" height="60" rx="16" fill="#FFB300" opacity="0.9" />
        <path d="M240 170L250 180L265 160" stroke="#001529" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      <motion.g {...pulseAnimation}>
        <circle cx="60" cy="180" r="30" fill="#0cebeb" opacity="0.8" />
        <path d="M50 180H70M60 170V190" stroke="#001529" strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  </motion.div>
);

// Illustration 2: The "Growth & Analytics" (Charts, target bars)
export const GrowthAnalytics = ({ className = '' }: { className?: string }) => (
  <motion.div className={className} initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{duration: 1}}>
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
      {/* Background blobs */}
      <circle cx="150" cy="150" r="100" fill="#FFB300" opacity="0.1" />
      
      {/* Chart Base */}
      <motion.g {...floatAnimationReverse}>
        <rect x="40" y="80" width="220" height="140" rx="16" fill="#001529" stroke="#FFB300" strokeWidth="4" />
        <path d="M40 200H260" stroke="#FFB300" strokeWidth="4" strokeDasharray="8 8" />
        
        {/* Bars */}
        <rect x="70" y="140" width="30" height="60" rx="6" fill="#ffffff" opacity="0.3" />
        <rect x="120" y="110" width="30" height="90" rx="6" fill="#0cebeb" />
        <rect x="170" y="160" width="30" height="40" rx="6" fill="#ffffff" opacity="0.3" />
        <rect x="220" y="70" width="30" height="130" rx="6" fill="#FFB300" />
      </motion.g>

      {/* Floating Target Node */}
      <motion.g {...floatAnimation}>
         <circle cx="240" cy="60" r="35" fill="#0B66E4" />
         <circle cx="240" cy="60" r="20" fill="#001529" stroke="#0B66E4" strokeWidth="4" />
         <circle cx="240" cy="60" r="8" fill="#FFB300" />
      </motion.g>
    </svg>
  </motion.div>
);

// Illustration 3: The "Creative Idea" (3D-ish Blocks and Lightbulb Abstract)
export const CreativeIdea = ({ className = '' }: { className?: string }) => (
  <motion.div className={className} initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{duration: 1}}>
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
      <circle cx="150" cy="160" r="110" fill="#0cebeb" opacity="0.08" />
      
      {/* Big overlapping abstract cards */}
      <motion.g {...floatAnimation}>
         <rect x="90" y="60" width="120" height="160" rx="20" fill="#001529" stroke="#0cebeb" strokeWidth="4" transform="rotate(-10 150 140)" />
         <rect x="70" y="100" width="160" height="100" rx="20" fill="#001529" stroke="#FFB300" strokeWidth="4" transform="rotate(5 150 150)" />
         
         {/* Idea Bulb inside the card */}
         <path d="M150 120C158 120 165 127 165 135C165 140 162 145 158 148C155 151 155 155 155 158H145C145 155 145 151 142 148C138 145 135 140 135 135C135 127 142 120 150 120Z" stroke="#FFB300" strokeWidth="4" />
         <path d="M145 163H155" stroke="#FFB300" strokeWidth="4" strokeLinecap="round" />
         <path d="M148 168H152" stroke="#FFB300" strokeWidth="4" strokeLinecap="round" />
      </motion.g>

      {/* Sparks flying out */}
      <motion.g {...pulseAnimation}>
        <circle cx="90" cy="50" r="12" fill="#FFB300" />
        <circle cx="210" cy="80" r="8" fill="#0B66E4" />
        <circle cx="200" cy="220" r="15" fill="#ff006e" />
        <circle cx="60" cy="190" r="10" fill="#0cebeb" />
      </motion.g>
    </svg>
  </motion.div>
);
