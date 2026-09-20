// src/components/Marquee.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  separator?: React.ReactNode;
  pauseOnHover?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = 'left',
  speed = 50,
  className = '',
  separator = <span className="mx-8 text-indigo-500/50">✦</span>,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Calculate width
    const trackWidth = track.scrollWidth / 2;
    
    // Create infinite loop animation
    const xPercent = direction === 'left' ? -50 : 0;
    const xPercentTo = direction === 'left' ? 0 : -50;

    gsap.set(track, { xPercent });
    
    animationRef.current = gsap.to(track, {
      xPercent: xPercentTo,
      duration: trackWidth / speed,
      ease: "none",
      repeat: -1,
    });

    // Scroll velocity effect
    let scrollDirection = 1;
    let lastScroll = 0;

    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const scroll = self.scroll();
        scrollDirection = scroll > lastScroll ? 1 : -1;
        lastScroll = scroll;

        if (animationRef.current) {
          gsap.to(animationRef.current, {
            timeScale: direction === 'left' 
              ? (scrollDirection === 1 ? 2 : 0.5) 
              : (scrollDirection === 1 ? 0.5 : 2),
            duration: 0.5,
          });
        }
      },
    });

    return () => {
      animationRef.current?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [direction, speed]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover && animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 0.2, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && animationRef.current) {
      gsap.to(animationRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={trackRef} 
        className="flex items-center whitespace-nowrap will-change-transform"
      >
        {/* Original items */}
        {items.map((item, i) => (
          <span key={`original-${i}`} className="flex items-center">
            <span className="text-inherit">{item}</span>
            {separator}
          </span>
        ))}
        {/* Duplicated items for seamless loop */}
        {items.map((item, i) => (
          <span key={`duplicate-${i}`} className="flex items-center">
            <span className="text-inherit">{item}</span>
            {separator}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
