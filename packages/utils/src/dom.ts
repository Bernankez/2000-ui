import { noop } from ".";

export interface EventListenerObjectOption {
  capture?: boolean;
  once?: boolean;
}

// useCapture
export type EventListenerParamOption = boolean;

export type EventListenerOptions = EventListenerObjectOption | EventListenerParamOption;

export interface EventHandler {
  <K extends keyof DocumentEventMap>(type: K, target: Document, listener: (this: Document, ev: DocumentEventMap[K]) => void, options?: EventListenerOptions): () => void;
  <K extends keyof HTMLElementEventMap>(type: K, target: HTMLElement, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void, options?: EventListenerOptions): () => void;
}

export const on: EventHandler = (type: string, target: any, listener: (...args: any[]) => any, options?: EventListenerOptions) => {
  if (target) {
    target?.addEventListener(type, listener, options);
  }
  return () => off(type as any, target, listener, options);
};

export const off: EventHandler = (type: string, target: any, listener: (...args: any[]) => any, options?: EventListenerOptions) => {
  if (target) {
    target?.removeEventListener(type, listener, options);
  }
  // keep the same function signature with `on`
  return noop;
};

