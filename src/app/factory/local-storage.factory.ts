/**
 * getLocalStorage is a factory to get the window.localStorage
 * This will be null when SSR
 */
export function getLocalStorage(): any {
  return typeof window !== 'undefined' ? window.localStorage : null;
}
