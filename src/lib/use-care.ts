"use client";
import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { useSession } from "@/components/session-provider";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import {
  subscribeCare,
  saveCloudBooking,
  removeCloudBooking,
  toggleCloudHabit,
} from "@/lib/firebase/care";
import {
  useLocalCare,
  saveBooking,
  removeBooking,
  toggleHabit,
  type CareData,
  type Booking,
} from "./local-care";
const empty: CareData = { version: 1, bookings: [], checks: {} };
export function useCare() {
  const local = useLocalCare();
  const session = useSession();
  const uid = session.user?.uid;
  const [remote, setRemote] = useState<{
    uid: string;
    data: CareData;
    error: string;
  } | null>(null);
  useEffect(() => {
    if (!isFirebaseConfigured || !uid || session.error) return;
    try {
      return subscribeCare(
        uid,
        (data) => setRemote({ uid, data, error: "" }),
        (error) => setRemote({ uid, data: empty, error }),
      );
    } catch {
      queueMicrotask(() =>
        setRemote({
          uid,
          data: empty,
          error: "Não foi possível iniciar a sincronização.",
        }),
      );
    }
  }, [uid, session.error]);
  if (!isFirebaseConfigured) return { ...local, mode: "local" as const };
  const current = remote?.uid === uid ? remote : null;
  return {
    data: current?.data ?? empty,
    ready: session.ready && (!uid || !!current),
    error:
      session.error ||
      (!uid
        ? "Entre na sua conta para acessar seus dados."
        : (current?.error ?? "")),
    mode: "firebase" as const,
  };
}
function careError(error: unknown): never {
  if (error instanceof FirebaseError) {
    const message = error.code.includes("permission-denied")
      ? "Não foi possível acessar os dados da sua conta. Tente novamente mais tarde."
      : error.code.includes("unauthenticated")
        ? "Entre novamente para salvar seus cuidados."
        : "Não foi possível salvar agora. Confira a conexão e tente novamente.";
    throw new Error(message);
  }
  throw error;
}
export async function createCareBooking(
  input: Omit<Booking, "id" | "createdAt">,
) {
  try {
    if (isFirebaseConfigured) await saveCloudBooking(input);
    else saveBooking(input);
  } catch (error) {
    careError(error);
  }
}
export async function deleteCareBooking(id: string) {
  try {
    if (isFirebaseConfigured) await removeCloudBooking(id);
    else removeBooking(id);
  } catch (error) {
    careError(error);
  }
}
export async function changeCareHabit(id: string) {
  try {
    if (isFirebaseConfigured) await toggleCloudHabit(id);
    else toggleHabit(id);
  } catch (error) {
    careError(error);
  }
}
