// src/components/TextReveal.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  scrub?: boolean;
}

// Character-by-character reveal on scroll
export const TextRevealByChar: React.FC<TextRevealProps> = ({ 
  children, 
  className = '',
  scrub = true 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('.char');

    if (scrub) {
      gsap.fromTo(chars, 
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );
    } else {
      ScrollTrigger.create({
        trigger: container,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(chars,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.02,
              ease: "power4.out",
            }
          );
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scrub, children]);

  return (
    <div ref={containerRef} className={className}>
      {children.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

// Word-by-word reveal
export const TextRevealByWord: React.FC<TextRevealProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll('.word');

    gsap.set(words, { y: '100%', opacity: 0 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        gsap.to(words, {
          y: '0%',
          opacity: 1,
          duration: 1,
          delay,
          stagger: 0.08,
          ease: "power4.out",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, children]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <span className="word inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
};

// Line-by-line reveal
export const TextRevealByLine: React.FC<TextRevealProps & { lines: string[] }> = ({ 
  lines, 
  className = '',
  delay = 0 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lineElements = container.querySelectorAll('.line');

    gsap.set(lineElements, { y: '120%', rotate: 3 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(lineElements, {
          y: '0%',
          rotate: 0,
          duration: 1.2,
          delay,
          stagger: 0.1,
          ease: "power4.out",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay, lines]);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div className="line">{line}</div>
        </div>
      ))}
    </div>
  );
};

// Counter animation
interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<CounterProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const counter = { value: 0 };
        gsap.to(counter, {
          value: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [end, duration, suffix, prefix]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

export default { TextRevealByChar, TextRevealByWord, TextRevealByLine, AnimatedCounter };
