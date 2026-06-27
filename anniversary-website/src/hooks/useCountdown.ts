import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

/**
 * Decomposes a non-negative totalSeconds value into days/hours/minutes/seconds
 * such that:
 *   days * 86400 + hours * 3600 + minutes * 60 + seconds === totalSeconds
 *   hours   ∈ [0, 23]
 *   minutes ∈ [0, 59]
 *   seconds ∈ [0, 59]
 */
function decompose(totalSeconds: number): Pick<CountdownResult, 'days' | 'hours' | 'minutes' | 'seconds'> {
  const abs = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(abs / 86400);
  const hours = Math.floor((abs % 86400) / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const seconds = abs % 60;
  return { days, hours, minutes, seconds };
}

/**
 * Returns the number of seconds remaining until the target date using local time.
 * A negative value means the date is in the past.
 */
function getRemainingSeconds(target: Date): number {
  return Math.floor((target.getTime() - Date.now()) / 1000);
}

/**
 * Countdown hook that ticks every second.
 *
 * @param anniversaryDate - ISO date string in "YYYY-MM-DD" format.
 */
export function useCountdown(anniversaryDate: string): CountdownResult {
  const target = new Date(anniversaryDate);

  const buildState = (remaining: number): CountdownResult => ({
    ...decompose(Math.max(0, remaining)),
    isPast: remaining <= 0,
  });

  const [state, setState] = useState<CountdownResult>(() =>
    buildState(getRemainingSeconds(target))
  );

  useEffect(() => {
    const tick = (): void => {
      const remaining = getRemainingSeconds(target);
      setState(buildState(remaining));
    };

    const intervalId = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anniversaryDate]);

  return state;
}
