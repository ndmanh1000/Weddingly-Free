"use client";

import { useEffect, useMemo, useState } from "react";
import { config } from "@/lib/config";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MAROON = "#6b1f2b";

type WeddingCalendarSectionProps = {
  active?: boolean;
};

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const mondayStart = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];

  for (let i = 0; i < mondayStart; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  return cells;
}

function useCountdown(targetDate: Date) {
  const calculate = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function WeddingCalendarSection({ active = true }: WeddingCalendarSectionProps) {
  const eventDate = useMemo(() => new Date(config.eventDate), []);
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();
  const weddingDay = eventDate.getDate();
  const monthName = eventDate.toLocaleDateString("en-US", { month: "long" });
  const calendarDays = useMemo(() => buildCalendarDays(year, month), [year, month]);
  const timeLeft = useCountdown(eventDate);

  return (
    <div
      className={`h-full w-full overflow-y-auto px-6 py-10 flex flex-col items-center text-center ${active ? "fadeInMove active" : "fadeInMove"}`}
      style={{
        background: "linear-gradient(180deg, #f7f2ea 0%, #efe8dc 100%)",
        color: MAROON,
      }}
    >
      <div className="relative w-full max-w-[320px]">
        <p className="font-ovo text-5xl tracking-wide">{year}</p>
        <p className="font-thesignature text-5xl -mt-3 ml-16 text-left">{monthName}</p>
      </div>

      <div className="mt-8 w-full max-w-[320px]">
        <div className="grid grid-cols-7 gap-y-3 text-[10px] font-legan tracking-wider mb-4">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-4 text-sm font-ovo">
          {calendarDays.map((day, index) => (
            <div key={index} className="flex items-center justify-center h-8">
              {day === weddingDay ? (
                <span
                  className="relative flex h-8 w-8 items-center justify-center text-white text-sm"
                  aria-label={`Ngày cưới ${day}`}
                >
                  <svg viewBox="0 0 24 24" className="absolute inset-0 h-8 w-8 fill-current">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="relative z-10">{day}</span>
                </span>
              ) : (
                <span className={day ? "opacity-90" : ""}>{day ?? ""}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 max-w-[300px] text-xs font-legan leading-relaxed">
        We&apos;ll be sharing a home and a life together in
      </p>

      <p className="mt-4 font-ovo text-3xl tracking-wide">
        {timeLeft.days}d : {String(timeLeft.hours).padStart(2, "0")}h :{" "}
        {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
        {String(timeLeft.seconds).padStart(2, "0")}s
      </p>
    </div>
  );
}
