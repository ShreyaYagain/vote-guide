"use client";
import { useState, useEffect } from "react";
import { differenceInSeconds, parseISO, isAfter, isBefore } from "date-fns";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isLive: boolean; // Polls open
}

export function useCountdown(targetDate: string | null) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    isLive: false,
  });

  useEffect(() => {
    if (!targetDate || targetDate === "dynamic") return;

    const interval = setInterval(() => {
      const now = new Date();
      const target = parseISO(targetDate);
      
      // For this demo, let's assume "Polls Open" is the entire day of targetDate
      const endOfPolls = new Date(target);
      endOfPolls.setHours(23, 59, 59);

      const diff = differenceInSeconds(target, now);

      if (isAfter(now, target) && isBefore(now, endOfPolls)) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          isLive: true,
        });
      } else if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          isLive: false,
        });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (60 * 60 * 24)),
          hours: Math.floor((diff / (60 * 60)) % 24),
          minutes: Math.floor((diff / 60) % 60),
          seconds: Math.floor(diff % 60),
          isExpired: false,
          isLive: false,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
