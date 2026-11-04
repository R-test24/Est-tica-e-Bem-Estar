import type { Metadata } from "next";
import { CareDashboard } from "@/components/care-dashboard";
export const metadata: Metadata = { title: "Minha área de cuidado" };
export default function MyCarePage() {
  return <CareDashboard />;
}
