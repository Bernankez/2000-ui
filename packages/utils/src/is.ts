export const isDefined = <T = any>(val: T): val is NonNullable<T> => val !== undefined && val !== null;

export const isWindow = (val: any): val is Window => typeof window !== "undefined" && toString.call(val) === "[object Window]";

export const isClient = typeof window !== "undefined" && isWindow(window);

export const isIOS = /* #__PURE__ */ isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);
