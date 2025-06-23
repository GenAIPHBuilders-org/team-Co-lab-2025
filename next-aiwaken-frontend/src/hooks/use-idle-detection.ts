import React, { useCallback } from "react";

/**
 * Custom React hook that detects user inactivity (idle state) after a specified timeout.
 *
 * The hook listens for `mousemove` and `keydown` events to determine activity.
 * When no activity is detected for the given `timeout` (in milliseconds), the hook sets `isIdle` to `true`.
 * Activity resets the timer and sets `isIdle` back to `false`.
 *
 * @param timeout - The duration in milliseconds to wait before considering the user idle.
 * @returns `true` if the user is idle, otherwise `false`.
 *
 * @example
 * ```tsx
 * const isIdle = useIdleDetection(30000); // 30 seconds
 *
 * React.useEffect(() => {
 *   if (isIdle) {
 *     // Perform action when user is idle
 *   }
 * }, [isIdle]);
 * ```
 */

export function useIdleDetection(timeout: number) {
  const [isIdle, setIsIdle] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsIdle(false);
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  }, [timeout]);

  React.useEffect(() => {
    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [timeout, resetTimer]);

  return isIdle;
}
