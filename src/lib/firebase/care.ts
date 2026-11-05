"use client";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseServices } from "./client";
import {
  localDay,
  habits,
  validateBooking,
  type Booking,
  type CareData,
} from "@/lib/local-care";
function context() {
  const services = getFirebaseServices();
  if (!services?.auth.currentUser)
    throw new Error("Entre na sua conta para salvar seus cuidados.");
  return { ...services, uid: services.auth.currentUser.uid };
}
function parseBooking(id: string, value: Record<string, unknown>): Booking {
  if (
    !(value.startsAt instanceof Timestamp) ||
    !(value.createdAt instanceof Timestamp) ||
    typeof value.service !== "string" ||
    typeof value.professional !== "string"
  )
    throw new Error("Planejamento com formato inválido.");
  const date = value.startsAt.toDate();
  return {
    id,
    service: value.service,
    professional: value.professional,
    date: localDay(date),
    time: `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
    createdAt: value.createdAt.toDate().toISOString(),
  };
}
export function subscribeCare(
  uid: string,
  next: (data: CareData) => void,
  fail: (message: string) => void,
): Unsubscribe {
  const { db, uid: currentUid } = context();
  if (currentUid !== uid)
    throw new Error("A sessão mudou. Recarregue a página.");
  let bookings: Booking[] = [],
    checks: CareData["checks"] = {},
    haveBookings = false,
    haveDays = false,
    active = true;
  const timeout = window.setTimeout(() => {
    if (active && (!haveBookings || !haveDays))
      fail(
        "Não foi possível sincronizar seus dados. Verifique a conexão e recarregue a página.",
      );
  }, 15000);
  const emit = () => {
    if (active && haveBookings && haveDays)
      next({ version: 1, bookings, checks });
  };
  const error = () => {
    if (active)
      fail(
        "Não foi possível acessar seus dados. Confira a conexão e tente novamente.",
      );
  };
  const stopBookings = onSnapshot(
    collection(db, "users", uid, "bookings"),
    { includeMetadataChanges: true },
    (snapshot) => {
      // Não confirmar alterações otimistas antes do reconhecimento do servidor.
      if (snapshot.metadata.hasPendingWrites || snapshot.metadata.fromCache)
        return;
      try {
        bookings = snapshot.docs.map((d) => parseBooking(d.id, d.data()));
        haveBookings = true;
        emit();
      } catch {
        error();
      }
    },
    error,
  );
  const stopDays = onSnapshot(
    collection(db, "users", uid, "days"),
    { includeMetadataChanges: true },
    (snapshot) => {
      if (snapshot.metadata.hasPendingWrites || snapshot.metadata.fromCache)
        return;
      try {
        checks = {};
        for (const d of snapshot.docs) {
          const value = d.data();
          if (
            !(value.day instanceof Timestamp) ||
            !Array.isArray(value.habits) ||
            value.habits.some((id) => !habits.some((h) => h.id === id))
          )
            throw new Error();
          checks[d.id] = value.habits;
        }
        haveDays = true;
        emit();
      } catch {
        error();
      }
    },
    error,
  );
  return () => {
    window.clearTimeout(timeout);
    active = false;
    stopBookings();
    stopDays();
  };
}
export async function saveCloudBooking(
  input: Omit<Booking, "id" | "createdAt">,
) {
  const { db, uid } = context();
  const ref = collection(db, "users", uid, "bookings");
  const existing = await getDocs(ref);
  validateBooking(
    input,
    existing.docs.map((d) => parseBooking(d.id, d.data())),
  );
  const startsAt = Timestamp.fromDate(
    new Date(`${input.date}T${input.time}:00`),
  );
  await addDoc(ref, {
    service: input.service,
    professional: input.professional,
    startsAt,
    createdAt: serverTimestamp(),
    status: "planned",
  });
}
export async function removeCloudBooking(id: string) {
  const { db, uid } = context();
  await deleteDoc(doc(db, "users", uid, "bookings", id));
}
export async function toggleCloudHabit(id: string) {
  if (!habits.some((h) => h.id === id)) throw new Error("Cuidado inválido.");
  const { db, uid } = context();
  const today = localDay();
  const ref = doc(db, "users", uid, "days", today);
  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(ref);
    const current: string[] = snapshot.exists() ? snapshot.data().habits : [];
    const updated = current.includes(id)
      ? current.filter((h) => h !== id)
      : [...current, id];
    transaction.set(ref, {
      day: Timestamp.fromDate(new Date(today + "T00:00:00Z")),
      habits: updated,
      updatedAt: serverTimestamp(),
    });
  });
}
