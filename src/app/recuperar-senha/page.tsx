import type { Metadata } from "next";
import { PasswordResetForm } from "@/components/password-reset-form";
export const metadata: Metadata = { title: "Recuperar senha" };
export default function ResetPage() {
  return <PasswordResetForm />;
}
