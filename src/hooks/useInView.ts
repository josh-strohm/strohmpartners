import { useState, useEffect, type RefCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): { ref: RefCallback<T>; inView: boolean } {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
  const [element, setElement] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold, rootMargin, triggerOnce]);

  const ref: RefCallback<T> = (el) => {
    setElement(el);
  };

  return { ref, inView };
}