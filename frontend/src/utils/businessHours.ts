import type { Language } from "@/lib/translations";

const sundayOpen = 10;
const sundayClose = 18;
const weekdayOpen = 9;
const weekdayClose = 20;

function getKathmanduDate(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return { weekday, hour, minute };
}

export function isOpenNow(date = new Date()) {
  const { weekday, hour, minute } = getKathmanduDate(date);

  if (weekday === "Sun") {
    return hour > sundayOpen && hour < sundayClose;
  }

  if (weekday === "Sat") {
    return hour >= weekdayOpen && (hour < weekdayClose || (hour === weekdayClose && minute === 0));
  }

  return hour >= weekdayOpen && (hour < weekdayClose || (hour === weekdayClose && minute === 0));
}

export function getStatusText(language: Language) {
  if (isOpenNow()) {
    return language === "en" ? "Open Now" : language === "hi" ? "अभी खुला" : "अहिले खुला";
  }

  return language === "en" ? "Closed" : language === "hi" ? "बंद" : "बन्द";
}