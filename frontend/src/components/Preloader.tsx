// src/components/Preloader.tsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayTopRef = useRef<HTMLDivElement>(null);
  const overlayBottomRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    try {
      sessionStorage.setItem('pavion_preloader_seen', 'true');
    } catch {
      // ignore
    }
    onCompleteRef.current();
  };

  useEffect(() => {
    // Hard safety timeout: under no circumstances should the preloader stay active > 2.0s
    const safetyTimeout = setTimeout(() => {
      finish();
    }, 2000);

    const ctx = gsap.context(() => {
      // Animate counter from 0 to 100 in 1.1s
      const counterAnimation = { value: 0 };
      gsap.to(counterAnimation, {
        value: 100,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          setCounter(Math.round(counterAnimation.value));
        },
      });

      // Progress bar fills in 1.1s
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 1.1,
        ease: "power2.out",
      });

      // Text reveal
      gsap.fromTo(textRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Fast exit animation immediately after counter reaches 100
      const exitTimeline = gsap.timeline({
        delay: 1.15,
        onComplete: () => {
          finish();
        }
      });

      exitTimeline
        .to([counterRef.current, textRef.current, progressRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(overlayTopRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
        }, "-=0.1")
        .to(overlayBottomRef.current, {
          yPercent: 100,
          duration: 0.5,
          ease: "power3.inOut",
        }, "-=0.5");

    }, preloaderRef);

    return () => {
      clearTimeout(safetyTimeout);
      ctx.revert();
    };
  }, []); // Run only ONCE on mount!

  return (
    <div 
      ref={preloaderRef}
      onClick={finish}
      className="fixed inset-0 z-[9999] cursor-pointer"
      title="Click anywhere to skip"
    >
      {/* Top overlay */}
      <div 
        ref={overlayTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#050508]"
      />
      
      {/* Bottom overlay */}
      <div 
        ref={overlayBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050508]"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Logo/Brand text */}
        <div ref={textRef} className="overflow-hidden mb-8">
          <span className="text-[12px] tracking-[0.4em] uppercase text-[#DB2777] font-semibold">
            Pavion Technologies
          </span>
        </div>

        {/* Counter */}
        <div ref={counterRef} className="overflow-hidden">
          <div className="text-[15vw] md:text-[12vw] font-black text-white leading-none tracking-tighter">
            {counter}
            <span className="text-[#60A5FA] ml-2">%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-white/10 overflow-hidden rounded-full">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#DB2777] via-[#F59E0B] to-[#60A5FA] origin-left scale-x-0"
          />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/15" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/15" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/15" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/15" />
      </div>
    </div>
  );
};

export default Preloader;
