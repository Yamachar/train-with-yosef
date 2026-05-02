"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type BookSessionCheckoutFormProps = {
  stripePriceId: string;
  enabled: boolean;
};

const bookingTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export function BookSessionCheckoutForm({ stripePriceId, enabled }: BookSessionCheckoutFormProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const minDate = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
      }).format(currentMonth),
    [currentMonth],
  );

  const dayCells = useMemo(() => {
    const firstDayIndex = currentMonth.getDay();
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = monthEnd.getDate();

    const cells: Array<{ date: string; day: number; disabled: boolean } | null> = [];

    for (let index = 0; index < firstDayIndex; index += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateValue = `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      cells.push({
        date: dateValue,
        day,
        disabled: dateValue < minDate,
      });
    }

    while (cells.length < 42) {
      cells.push(null);
    }

    return cells;
  }, [currentMonth, minDate]);

  const canSubmit = bookingDate.length > 0 && bookingTime.length > 0;

  return (
    <form action="/api/checkout" method="POST" className="space-y-4">
      <input type="hidden" name="planType" value="book-session" />
      <input type="hidden" name="priceId" value={stripePriceId} />
      <input type="hidden" name="displayPrice" value="15" />
      <input type="hidden" name="bookingDate" value={bookingDate} />
      <input type="hidden" name="bookingTime" value={bookingTime} />

      <div className="grid gap-7 md:grid-cols-[250px_1fr] md:items-stretch">
        <aside className="relative overflow-hidden rounded-md border border-white/12 bg-[#0f1528] md:h-[620px]">
          <div className="h-[280px] md:h-full">
            <Image src="/yosef-logo.png" alt="Yosef emblem" fill sizes="(max-width: 768px) 100vw, 250px" className="object-cover" />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-4">
            <p className="heading-font text-3xl text-white">High-Performance Coaching</p>
            <p className="mt-1 text-sm text-[#d6deea]">Prepare for your consultation.</p>
          </div>
        </aside>

        <div className="relative overflow-hidden rounded-xl border border-dashed border-[#607089] bg-[#111522] p-4 md:h-[620px] md:p-6">
          <span className="absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2 border-[#B8952A]/65" aria-hidden="true" />
          <span className="absolute right-4 top-4 h-7 w-7 border-r-2 border-t-2 border-[#B8952A]/65" aria-hidden="true" />
          <span className="absolute bottom-4 left-4 h-7 w-7 border-b-2 border-l-2 border-[#B8952A]/65" aria-hidden="true" />
          <span className="absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2 border-[#B8952A]/65" aria-hidden="true" />

          <div className="mx-auto flex h-full max-w-3xl flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth((value) => new Date(value.getFullYear(), value.getMonth() - 1, 1))}
                className="rounded-md border border-[#B8952A]/45 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#D4AF5A] transition hover:bg-[#B8952A]/15"
              >
                Prev
              </button>
              <p className="heading-font text-4xl text-white">{monthLabel}</p>
              <button
                type="button"
                onClick={() => setCurrentMonth((value) => new Date(value.getFullYear(), value.getMonth() + 1, 1))}
                className="rounded-md border border-[#B8952A]/45 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#D4AF5A] transition hover:bg-[#B8952A]/15"
              >
                Next
              </button>
            </div>

            <div className="mt-4 flex-1">
              <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.12em] text-[#8893ab]">
                {[
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-2">
                {dayCells.map((cell, index) => {
                  if (!cell) {
                    return <div key={`empty-${index}`} className="h-9 rounded-md bg-transparent" aria-hidden="true" />;
                  }

                  const selected = cell.date === bookingDate;

                  return (
                    <button
                      key={cell.date}
                      type="button"
                      disabled={cell.disabled}
                      onClick={() => setBookingDate(cell.date)}
                      className={`h-9 rounded-md border text-sm transition ${
                        selected
                          ? "border-[#D4AF5A] bg-[#B8952A]/30 text-[#F5F0E8]"
                          : cell.disabled
                            ? "cursor-not-allowed border-white/10 bg-[#0d1323] text-[#3e4860]"
                            : "border-white/15 bg-[#17223a] text-[#d2dbeb] hover:border-[#D4AF5A]/60 hover:text-white"
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[#D4AF5A]">Pick a Time</p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  {bookingTimes.map((time) => {
                    const selected = bookingTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBookingTime(time)}
                        className={`rounded-md border px-3 py-2 text-sm transition ${
                          selected
                            ? "border-[#D4AF5A] bg-[#B8952A]/30 text-[#F5F0E8]"
                            : "border-white/15 bg-[#17223a] text-[#d2dbeb] hover:border-[#D4AF5A]/60 hover:text-white"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#c9d3e3]">After selecting your slot, continue to secure payment checkout.</p>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full rounded-md px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${
          canSubmit
            ? "gold-button"
            : "cursor-not-allowed border border-zinc-400 bg-zinc-300 text-zinc-600"
        }`}
      >
        {canSubmit ? "Proceed to Checkout" : "Pick Date and Time First"}
      </button>

      {!enabled ? (
        <p className="text-xs text-[#c9d3e3]">Using fixed session price of €15 for checkout.</p>
      ) : null}
    </form>
  );
}
