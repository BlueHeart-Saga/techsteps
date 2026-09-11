import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import type { CSSProperties, ElementType } from 'react';
import { gsap } from 'gsap';

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

type Reveal = 'rise' | 'wipe' | 'fade' | 'none';
type Trigger = 'view' | 'mount' | 'hover';

export interface MaskedHeadingProps {
  text?: string;
  tag?: ElementType;
  mediaType?: 'image' | 'video';
  src?: string;
  poster?: string;
  fillScale?: number;
  parallax?: number;
  drift?: number;
  brightness?: number;
  saturation?: number;
  grayscale?: boolean;
  reveal?: Reveal;
  duration?: number;
  stagger?: number;
  trigger?: Trigger;
  align?: 'left' | 'center' | 'right';
  weight?: number;
  tracking?: number;
  lineHeight?: number;
  textScale?: number;
  className?: string;
  style?: CSSProperties;
}

/** A responsive image/video-filled heading with pointer parallax and GSAP reveal. */
export default function MaskedHeading({
  text = 'Designed in the details',
  tag: Tag = 'h2',
  mediaType = 'image',
  src = '',
  poster = '',
  fillScale = 1.25,
  parallax = 26,
  drift = 18,
  brightness = 1,
  saturation = 1,
  grayscale = false,
  reveal = 'rise',
  duration = 1.1,
  stagger = 0.09,
  trigger = 'view',
  align = 'center',
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
  className = '',
  style
}: MaskedHeadingProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const revealRef = useRef<HTMLSpanElement | null>(null);
  const mediaRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const baseRefs = useRef<(HTMLElement | null)[]>([]);
  const glyphRefs = useRef<(SVGTextElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const offsets = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const clipId = `masked-heading-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const placeMedia = useCallback(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media) return;

    const maxX = ((fillScale - 1) / 2) * root.clientWidth;
    const maxY = ((fillScale - 1) / 2) * root.clientHeight;
    media.style.transform = `translate3d(${clamp(offsets.current.x, -maxX, maxX).toFixed(2)}px, ${clamp(offsets.current.y, -maxY, maxY).toFixed(2)}px, 0) scale(${fillScale})`;
    media.style.filter = `brightness(${brightness}) saturate(${saturation})${grayscale ? ' grayscale(1)' : ''}`;
  }, [brightness, fillScale, grayscale, saturation]);

  const sync = useCallback(() => {
    const root = rootRef.current;
    const measure = measureRef.current;
    if (!root || !measure) return;

    root.style.fontSize = `${clamp(root.clientWidth * textScale, 30, 200).toFixed(1)}px`;
    const computed = window.getComputedStyle(measure);
    wordRefs.current.forEach((word, index) => {
      const baseline = baseRefs.current[index];
      const glyph = glyphRefs.current[index];
      if (!word || !baseline || !glyph) return;
      glyph.setAttribute('x', String(word.offsetLeft));
      glyph.setAttribute('y', String(baseline.offsetTop));
      glyph.style.fontFamily = computed.fontFamily;
      glyph.style.fontSize = computed.fontSize;
      glyph.style.fontWeight = computed.fontWeight;
      glyph.style.letterSpacing = computed.letterSpacing;
    });
    placeMedia();
  }, [placeMedia, textScale]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(root);
    document.fonts?.ready.then(sync).catch(() => undefined);

    let frameId = 0;
    let previous = performance.now();
    let clock = 0;
    const frame = (now: number) => {
      const delta = Math.min(0.05, (now - previous) / 1000);
      previous = now;
      clock += delta;
      const ease = 1 - Math.exp(-delta / 0.18);
      offsets.current.x += (offsets.current.targetX + Math.sin(clock * 0.21) * drift - offsets.current.x) * ease;
      offsets.current.y += (offsets.current.targetY + Math.cos(clock * 0.17) * drift * 0.6 - offsets.current.y) * ease;
      placeMedia();
      frameId = requestAnimationFrame(frame);
    };
    const move = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      offsets.current.targetX = clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1) * -parallax;
      offsets.current.targetY = clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1) * -parallax;
    };
    const leave = () => { offsets.current.targetX = 0; offsets.current.targetY = 0; };
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', leave);
    frameId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', leave);
    };
  }, [drift, parallax, placeMedia, sync]);

  useEffect(() => {
    const root = rootRef.current;
    const layer = revealRef.current;
    const glyphs = glyphRefs.current.filter((glyph): glyph is SVGTextElement => Boolean(glyph));
    if (!root || !layer || !glyphs.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reset = () => gsap.set([glyphs, layer], { y: 0, opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0)' });
    const play = () => {
      tweenRef.current?.kill();
      if (reveal === 'rise') {
        tweenRef.current = gsap.fromTo(glyphs, { y: '1.15em' }, { y: 0, duration, stagger, ease: 'power4.out' });
      } else if (reveal === 'wipe') {
        tweenRef.current = gsap.fromTo(layer, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration, ease: 'power3.inOut' });
      } else if (reveal === 'fade') {
        tweenRef.current = gsap.fromTo(layer, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration, ease: 'power3.out' });
      }
    };
    reset();
    if (reveal === 'none' || reduced) return;
    if (trigger === 'hover') {
      root.addEventListener('pointerenter', play);
      return () => { root.removeEventListener('pointerenter', play); tweenRef.current?.kill(); };
    }
    if (trigger === 'view') {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { play(); observer.disconnect(); }
      }, { threshold: 0.25 });
      observer.observe(root);
      return () => { observer.disconnect(); tweenRef.current?.kill(); };
    }
    play();
    return () => tweenRef.current?.kill();
  }, [duration, reveal, stagger, trigger, words]);

  return (
    <Tag
      ref={rootRef}
      className={`relative m-0 block w-full p-0 antialiased [text-wrap:balance] ${className}`.trim()}
      style={{ textAlign: align, fontWeight: weight, letterSpacing: `${tracking}em`, lineHeight, ...style }}
    >
      <span className="sr-only">{text}</span>
      <span ref={measureRef} className="text-transparent" aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} ref={element => { wordRefs.current[index] = element; }} className="inline-block whitespace-pre after:content-['\\00a0'] last:after:content-none">
            {word}<i ref={element => { baseRefs.current[index] = element; }} className="inline-block h-0 w-0" />
          </span>
        ))}
      </span>
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false"><defs><clipPath id={clipId} clipPathUnits="userSpaceOnUse">
        {words.map((word, index) => <text key={`${word}-${index}`} ref={element => { glyphRefs.current[index] = element; }}>{word}</text>)}
      </clipPath></defs></svg>
      <span ref={revealRef} className="pointer-events-none absolute inset-0 block">
        <span className="absolute inset-0 block overflow-hidden" style={{ clipPath: `url(#${clipId})` }}>
          <span ref={mediaRef} className="absolute inset-0 block [will-change:transform,filter]">
            {mediaType === 'video'
              ? <video className="block h-full w-full object-cover select-none" src={src} poster={poster} autoPlay muted loop playsInline />
              : <img className="block h-full w-full object-cover select-none" src={src} alt="" draggable={false} />}
          </span>
        </span>
      </span>
    </Tag>
  );
}
