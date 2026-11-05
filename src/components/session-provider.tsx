"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  getFirebaseServices,
  isFirebaseConfigured,
} from "@/lib/firebase/client";
type Session = { user: User | null; ready: boolean; error: string };
const Context = createContext<Session>({
  user: null,
  ready: !isFirebaseConfigured,
  error: "",
});
export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    ready: !isFirebaseConfigured,
    error: "",
  });
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    try {
      const services = getFirebaseServices()!;
      return onAuthStateChanged(
        services.auth,
        (user) => setSession({ user, ready: true, error: "" }),
        () =>
          setSession({
            user: null,
            ready: true,
            error:
              "Não foi possível verificar sua sessão. Recarregue e tente novamente.",
          }),
      );
    } catch {
      queueMicrotask(() =>
        setSession({
          user: null,
          ready: true,
          error:
            "Não foi possível ativar o acesso às contas. Tente novamente mais tarde.",
        }),
      );
    }
  }, []);
  return <Context.Provider value={session}>{children}</Context.Provider>;
}
export const useSession = () => useContext(Context);
export async function endSession() {
  const services = getFirebaseServices();
  if (services) await signOut(services.auth);
}
