// src/components/MagneticButton.tsx
import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.5,
  as: Component = 'button',
  href,
  onClick,
}) => {
  const buttonRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const xContentTo = gsap.quickTo(content, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yContentTo = gsap.quickTo(content, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;
      
      xTo(x);
      yTo(y);
      xContentTo(x * 0.3);
      yContentTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      xContentTo(0);
      yContentTo(0);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  const props: any = {
    ref: buttonRef,
    className: `relative ${className}`,
    onClick,
  };

  if (href) {
    props.href = href;
  }

  return (
    <Component {...props}>
      <div ref={contentRef} className="relative flex items-center gap-2">
        {children}
      </div>
    </Component>
  );
};

export default MagneticButton;
