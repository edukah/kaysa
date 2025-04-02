// Type definitions for Kaysa
// Modular horizontal slider with touch controls and custom scrollbars

export default Kaysa;

interface KaysaConfig {
  target: string | HTMLElement;
  scrollSpeed?: number;
  gap?: string;
  enhancedScrollbar?: boolean;
  prevButtonContent?: string;
  nextButtonContent?: string;
  scrollbarOptions?: Record<string, unknown>;
  onError?: (error: unknown, context: Record<string, unknown>) => void;
}

declare class Kaysa {
  constructor(targetOrConfig: HTMLElement | KaysaConfig);

  static DEFAULTS: {
    scrollSpeed: number;
    gap: string;
    enhancedScrollbar: boolean;
    prevButtonContent: string;
    nextButtonContent: string;
    onError: null;
  };

  static getInstance(element: Element): Kaysa | undefined;
  static help(): void;

  scroll(direction: 'left' | 'right'): void;
  add(element: HTMLElement, index?: number): void;
  remove(index?: number): void;
  enable(): void;
  disable(): void;
  destroy(): void;
}
