"use client";
import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export const isFirebaseConfigured = Object.values(config).every(Boolean);
const emulatorMode = process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true";
const runtime = globalThis as typeof globalThis & {
  __esteticaEmulators?: WeakSet<object>;
};
const initialized = (runtime.__esteticaEmulators ??= new WeakSet<object>());
export function getFirebaseServices() {
  if (!isFirebaseConfigured || typeof window === "undefined") return null;
  const app = getApps().length ? getApp() : initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
  if (emulatorMode && !initialized.has(auth)) {
    // Um build publicado nunca pode usar HTTP de emulador em host remoto.
    if (
      !["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname) ||
      !config.projectId?.startsWith("demo-")
    ) {
      throw new Error("Emuladores exigem localhost e um ID de projeto demo-.");
    }
    if (!auth.emulatorConfig)
      connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    initialized.add(auth);
  }
  return { auth, db };
}
