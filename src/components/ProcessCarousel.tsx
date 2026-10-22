import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Step {
  title: string;
  description: string;
}

interface ProcessCarouselProps {
  processTitle: string;
  processSubtitle: string;
  steps: Step[];
  heroBgImage: string;
}

export default function ProcessCarousel({
  processTitle,
  processSubtitle,
  steps,
  heroBgImage,
}: ProcessCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimatingRef = useRef(false);
  const isHovering = useRef(false);

  // Respect user's reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  // Foreground Scale Entrance Animation (Ice-cream reference style)
  useEffect(() => {
    const text = textRef.current;
    const image = imageRef.current;
    if (!text || !image) return;

    if (prefersReducedMotion) {
      gsap.set([text, image], { clearProps: 'opacity,transform,visibility' });
      isAnimatingRef.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => { isAnimatingRef.current = false; }
      });

      // 1. Image comes from the background into the foreground
      tl.fromTo(image, 
        { autoAlpha: 0, scale: 0.8, y: 40, rotationY: -10, transformOrigin: 'center center' },
        { autoAlpha: 1, scale: 1.05, y: 0, rotationY: 0, duration: 0.7, ease: 'power3.out' }
      )
      // 2. Settle the image slightly 
      .to(image, { scale: 1, duration: 0.4, ease: 'power2.out' })
      // 3. Text fades in slightly behind the image animation
      .fromTo(text, 
        { autoAlpha: 0, y: 20 }, 
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 
        '-=0.8'
      );
    });

    return () => ctx.revert();
  }, [activeIndex, prefersReducedMotion]);

  // Handle click to change step
  const handleNext = (nextIndex: number) => {
    if (nextIndex === activeIndex || isAnimatingRef.current) return;
    
    if (prefersReducedMotion) {
      setActiveIndex(nextIndex);
      return;
    }

    const text = textRef.current;
    const image = imageRef.current;
    if (!text || !image) {
      setActiveIndex(nextIndex);
      return;
    }

    isAnimatingRef.current = true;
    const direction = nextIndex > activeIndex ? 1 : -1;

    gsap.killTweensOf([text, image]);

    // 1. Move current image away and scale down slightly
    gsap.timeline({
      onComplete: () => { setActiveIndex(nextIndex); }
    })
    .to(image, { 
      autoAlpha: 0, 
      scale: 0.85, 
      x: -30 * direction, 
      duration: 0.35, 
      ease: 'power2.in' 
    }, 0)
    .to(text, { 
      autoAlpha: 0, 
      y: -15 * direction, 
      duration: 0.3, 
      ease: 'power2.in' 
    }, 0);
  };

  // Auto-play functionality
  useEffect(() => {
    if (prefersReducedMotion || steps.length < 2) return;

    autoPlayTimer.current = setInterval(() => {
      if (!isHovering.current && !isAnimatingRef.current) {
        handleNext((activeIndex + 1) % steps.length);
      }
    }, 5000);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [activeIndex, steps.length, prefersReducedMotion]);

  if (!steps.length) return null;
  const activeStep = steps[activeIndex];

  return (
    <section 
      className="overflow-hidden border-b border-slate-200/80 bg-white py-16 lg:py-24"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 max-w-3xl sm:mb-16">
          <h2 className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {processTitle}
          </h2>
          <p className="mt-3 text-base font-normal leading-relaxed text-black sm:text-lg lg:text-[19px]">
            {processSubtitle}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Text Area */}
          <div className="flex h-full flex-col justify-center lg:col-span-6">
            <div ref={textRef} className="min-h-[220px]">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#0F623A]">
                  Phase {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-8 bg-[#0F623A]/30" />
              </div>
              <h3 className="mb-5 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                {activeStep.title}
              </h3>
              <p className="max-w-lg text-lg leading-relaxed text-slate-700">
                {activeStep.description}
              </p>
            </div>
          </div>

          {/* Image Area */}
          <div className="relative lg:col-span-6">
            <div className="relative isolate aspect-[4/3] w-full [perspective:1200px] lg:aspect-square">
              <div className="pointer-events-none absolute inset-4 translate-y-5 rounded-[24px] bg-[#0F623A]/10 blur-2xl" />
              <img
                ref={imageRef}
                src={heroBgImage}
                alt={activeStep.title}
                className="relative z-10 h-full w-full rounded-[24px] border border-slate-200/50 object-cover shadow-2xl [backface-visibility:hidden]"
                loading="eager"
              />
            </div>
          </div>

        </div>

        {/* ENLARGED Navigation Cards */}
        <div 
          className="mt-12 grid grid-cols-1 gap-4 border-t border-slate-100 pt-8 sm:mt-16 sm:grid-cols-3 sm:gap-6" 
          role="tablist"
        >
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleNext(index)}
                className={`group relative min-h-[160px] rounded-2xl border p-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F623A] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-[#0F623A] bg-[#F5F9F6] shadow-lg scale-[1.02]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`font-mono text-3xl font-bold tracking-tight sm:text-4xl ${
                      isActive ? 'text-[#0F623A]' : 'text-slate-300'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* Small Thumbnail inside card */}
                    <span className={`h-14 w-14 shrink-0 overflow-hidden rounded-full border transition-colors ${
                      isActive ? 'border-[#0F623A]' : 'border-slate-200 grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0'
                    }`}>
                      <img src={heroBgImage} alt="" className="h-full w-full object-cover" />
                    </span>
                  </div>
                  <span className={`text-lg font-semibold leading-snug ${
                    isActive ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                  <span className={`mt-auto h-[3px] origin-left rounded-full bg-[#0F623A] transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}