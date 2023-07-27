export const isDefined = <T = any>(val: T): val is NonNullable<T> => val !== undefined && val !== null;

export const isWindow = (val: any): val is Window => typeof window !== "undefined" && toString.call(val) === "[object Window]";

// TODO remove to components/_utils
export const isClient = true;

export const isIOS = /* #__PURE__ */ isClient && window?.navigator?.userAgent && /iP(ad|hone|od)/.test(window.navigator.userAgent);
