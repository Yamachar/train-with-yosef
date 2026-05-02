"use client";

import { useSearchParams } from "next/navigation";

function formatBookingDate(value: string): string {
  const parts = value.split("-");
  if (parts.length !== 3) {
    return value;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return value;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return value;
  }

  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekday = weekdays[parsed.getUTCDay()] ?? "";
  const monthLabel = months[month - 1] ?? "";

  return `${weekday}, ${day.toString().padStart(2, "0")} ${monthLabel} ${year}`;
}

export function BookingSlotSummary() {
  const searchParams = useSearchParams();
  const bookingDate = searchParams.get("bookingDate") ?? "";
  const bookingTime = searchParams.get("bookingTime") ?? "";

  if (!bookingDate || !bookingTime) {
    return (
      <p className="mt-3 text-sm text-[#d7dfeb]">
        We received your booking request and will confirm your final session slot by email.
      </p>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-[#D4AF5A]/40 bg-[#0f1b32] p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-[#D4AF5A]">Selected Slot</p>
      <p className="mt-2 text-base text-[#F5F0E8]">
        {formatBookingDate(bookingDate)} at {bookingTime}
      </p>
    </div>
  );
}
