"use client";
import { useSyncExternalStore } from "react";
import { services, professionals } from "@/data/content";

export const habits = [
  { id: "pausa", label: "Fiz uma pausa para descansar", icon: "sun" },
  { id: "movimento", label: "Movimentei o corpo no meu ritmo", icon: "leaf" },
  {
    id: "autocuidado",
    label: "Reservei um momento de autocuidado",
    icon: "heart",
  },
] as const;
export type Booking = {
  id: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  createdAt: string;
};
type CareData = {
  version: 1;
  bookings: Booking[];
  checks: Record<string, string[]>;
};
const KEY = "estetica-care-v1";
const EVENT = "estetica-care-change";
const empty: CareData = { version: 1, bookings: [], checks: {} };
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function validDate(date: unknown): date is string {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    return false;
  const parsed = new Date(date + "T12:00:00");
  return Number.isFinite(parsed.getTime()) && localDay(parsed) === date;
}
function read(): CareData {
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return { ...empty, bookings: [], checks: {} };
  let value: CareData;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error(
      "Não foi possível ler os dados locais. Seus registros foram preservados; verifique o armazenamento do navegador.",
    );
  }
  if (
    value?.version !== 1 ||
    !Array.isArray(value.bookings) ||
    !value.checks ||
    typeof value.checks !== "object" ||
    Array.isArray(value.checks) ||
    !value.bookings.every(
      (b) =>
        b &&
        typeof b.id === "string" &&
        typeof b.createdAt === "string" &&
        services.some((s) => s.name === b.service) &&
        professionals.some((p) => p.name === b.professional) &&
        validDate(b.date) &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(b.time),
    ) ||
    !Object.entries(value.checks).every(
      ([day, ids]) =>
        validDate(day) &&
        Array.isArray(ids) &&
        ids.every((id) => habits.some((h) => h.id === id)) &&
        new Set(ids).size === ids.length,
    )
  ) {
    throw new Error(
      "Os dados locais têm um formato incompatível. Nenhum registro foi sobrescrito.",
    );
  }
  return value;
}
function write(data: CareData) {
  window.localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(EVENT));
}
function subscribe(callback: () => void) {
  const clock = window.setInterval(callback, 60000);
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.clearInterval(clock);
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}
function snapshot() {
  try {
    return JSON.stringify({ ...read(), localDay: localDay() });
  } catch (error) {
    return JSON.stringify({
      error:
        error instanceof Error ? error.message : "Armazenamento indisponível.",
    });
  }
}
export function useLocalCare() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "loading");
  if (raw === "loading") return { data: empty, ready: false, error: "" };
  const parsed = JSON.parse(raw);
  return {
    data: (parsed.error ? empty : parsed) as CareData,
    ready: true,
    error: (parsed.error || "") as string,
  };
}
export function saveBooking(input: Omit<Booking, "id" | "createdAt">) {
  if (
    !services.some((s) => s.name === input.service) ||
    !professionals.some((p) => p.name === input.professional) ||
    !validDate(input.date) ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time)
  )
    throw new Error("Confira o serviço, profissional, data e horário.");
  const start = new Date(`${input.date}T${input.time}:00`).getTime();
  if (!Number.isFinite(start) || start <= Date.now())
    throw new Error("Escolha uma data e um horário futuros.");
  const data = read();
  const duration = (name: string) =>
    Number(services.find((s) => s.name === name)!.duration.split(" ")[0]) *
    60000;
  if (
    data.bookings.some((b) => {
      const other = new Date(`${b.date}T${b.time}:00`).getTime();
      return (
        start < other + duration(b.service) &&
        other < start + duration(input.service)
      );
    })
  )
    throw new Error(
      "Você já tem um planejamento que coincide com esse horário. Escolha outro horário ou remova o anterior na sua área.",
    );
  write({
    ...data,
    bookings: [
      ...data.bookings,
      {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ],
  });
}
export function removeBooking(id: string) {
  const data = read();
  write({ ...data, bookings: data.bookings.filter((b) => b.id !== id) });
}
export function toggleHabit(id: string) {
  if (!habits.some((h) => h.id === id)) throw new Error("Hábito inválido.");
  const data = read();
  const day = localDay();
  const current = data.checks[day] || [];
  write({
    ...data,
    checks: {
      ...data.checks,
      [day]: current.includes(id)
        ? current.filter((h) => h !== id)
        : [...current, id],
    },
  });
}
