import { before, after, beforeEach, test } from "node:test";
import { readFileSync } from "node:fs";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-estetica",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});
after(async () => {
  await env?.cleanup();
});
beforeEach(async () => {
  await env.clearFirestore();
});
const db = (uid = "alice") => env.authenticatedContext(uid).firestore();
const plan = () => ({
  service: "Cuidados com a pele",
  professional: "Marina Oliveira",
  startsAt: Timestamp.fromMillis(Date.now() + 86400000),
  createdAt: serverTimestamp(),
  status: "planned",
});
function today() {
  const d = new Date();
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}
const dayId = () => today().toISOString().slice(0, 10);
const day = () => ({
  day: Timestamp.fromDate(today()),
  habits: ["pausa"],
  updatedAt: serverTimestamp(),
});

test("owner can create/read/list/delete own plans; no profile root is required", async () => {
  const store = db();
  const ref = doc(store, "users/alice/bookings/plan");
  await assertSucceeds(setDoc(ref, plan()));
  await assertSucceeds(getDoc(ref));
  await assertSucceeds(getDocs(collection(store, "users/alice/bookings")));
  await assertSucceeds(deleteDoc(ref));
});
test("unauthenticated read/list/write denied", async () => {
  const store = env.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(store, "users/alice/bookings/plan")));
  await assertFails(getDocs(collection(store, "users/alice/bookings")));
  await assertFails(setDoc(doc(store, "users/alice/bookings/plan"), plan()));
});
test("another account cannot read/list/create/update/delete private data", async () => {
  await setDoc(doc(db(), "users/alice/bookings/plan"), plan());
  const other = db("bob");
  const ref = doc(other, "users/alice/bookings/plan");
  await assertFails(getDoc(ref));
  await assertFails(getDocs(collection(other, "users/alice/bookings")));
  await assertFails(setDoc(doc(other, "users/alice/bookings/other"), plan()));
  await assertFails(updateDoc(ref, { status: "confirmed" }));
  await assertFails(deleteDoc(ref));
});
test("missing fields, extra roles/owners, invalid enums and oversized fields denied", async () => {
  for (const payload of [
    { ...plan(), role: "admin" },
    { ...plan(), ownerId: "bob" },
    { ...plan(), service: "x".repeat(10000) },
    { ...plan(), startsAt: "tomorrow" },
    { ...plan(), professional: "unknown" },
    { ...plan(), status: "confirmed" },
  ])
    await assertFails(setDoc(doc(db(), "users/alice/bookings/bad"), payload));
  const missing = plan();
  delete missing.createdAt;
  await assertFails(setDoc(doc(db(), "users/alice/bookings/bad"), missing));
});
test("past booking and forged createdAt denied; all booking updates denied", async () => {
  const ref = doc(db(), "users/alice/bookings/plan");
  await assertFails(
    setDoc(ref, { ...plan(), startsAt: Timestamp.fromMillis(0) }),
  );
  await assertFails(
    setDoc(ref, { ...plan(), createdAt: Timestamp.fromMillis(0) }),
  );
  await setDoc(ref, plan());
  await assertFails(updateDoc(ref, { service: "Ritual de autocuidado" }));
  await assertFails(updateDoc(ref, { createdAt: serverTimestamp() }));
});
test("owner can write and update today's habit list; no extra fields allowed", async () => {
  const ref = doc(db(), `users/alice/days/${dayId()}`);
  await assertSucceeds(setDoc(ref, day()));
  await assertSucceeds(
    updateDoc(ref, {
      habits: ["pausa", "movimento"],
      updatedAt: serverTimestamp(),
    }),
  );
  await assertFails(
    updateDoc(ref, { role: "admin", updatedAt: serverTimestamp() }),
  );
  await assertFails(setDoc(ref, { habits: [], updatedAt: serverTimestamp() }));
  await assertSucceeds(getDocs(collection(db(), "users/alice/days")));
});
test("duplicate/invalid habits, forged date, timestamp and extra points denied", async () => {
  const ref = doc(db(), `users/alice/days/${dayId()}`);
  for (const payload of [
    { ...day(), habits: ["pausa", "pausa"] },
    { ...day(), habits: ["fake"] },
    { ...day(), habits: [1] },
    { ...day(), habits: "pausa" },
    { ...day(), points: 999 },
    { ...day(), updatedAt: Timestamp.fromMillis(0) },
    { ...day(), day: "today" },
  ])
    await assertFails(setDoc(ref, payload));
  await assertFails(setDoc(doc(db(), "users/alice/days/forged"), day()));
});
test("old and far-future day records cannot be forged; day is immutable", async () => {
  await assertFails(
    setDoc(doc(db(), "users/alice/days/2020-01-01"), {
      ...day(),
      day: Timestamp.fromDate(new Date("2020-01-01T00:00:00Z")),
    }),
  );
  await assertFails(
    setDoc(doc(db(), "users/alice/days/2099-01-01"), {
      ...day(),
      day: Timestamp.fromDate(new Date("2099-01-01T00:00:00Z")),
    }),
  );
  const ref = doc(db(), `users/alice/days/${dayId()}`);
  await setDoc(ref, day());
  await assertFails(
    updateDoc(ref, {
      day: Timestamp.fromMillis(0),
      updatedAt: serverTimestamp(),
    }),
  );
});
test("habit records cannot cross account boundaries", async () => {
  await setDoc(doc(db(), `users/alice/days/${dayId()}`), day());
  const ref = doc(db("bob"), `users/alice/days/${dayId()}`);
  await assertFails(getDoc(ref));
  await assertFails(setDoc(ref, day()));
  await assertFails(deleteDoc(ref));
});
test("unknown collections, root profiles, public catalog and point counters denied", async () => {
  for (const path of [
    "users/alice",
    "profiles/alice",
    "catalog/service",
    "points/alice",
  ]) {
    await assertFails(setDoc(doc(db(), path), { role: "admin", points: 999 }));
    await assertFails(getDoc(doc(db(), path)));
  }
});
