"use client";
import Link from "next/link";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { getFirebaseServices } from "@/lib/firebase/client";
export function PasswordResetForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <main id="conteudo" className="shell learning-main">
      <section className="auth-card reset-card">
        <p className="eyebrow">RECUPERE SEU ACESSO</p>
        <h1>Esqueceu sua senha?</h1>
        <p>Informe o e-mail utilizado na sua conta.</p>
        <form
          className="auth-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const email = String(
              new FormData(e.currentTarget).get("email") ?? "",
            ).trim();
            setPending(true);
            setMessage("");
            try {
              const services = getFirebaseServices();
              if (!services) {
                setMessage(
                  "A recuperação de senha estará disponível quando o acesso às contas for ativado. Nenhum dado foi enviado.",
                );
                return;
              }
              try {
                await sendPasswordResetEmail(services.auth, email);
              } catch (error) {
                if (!(
                  error &&
                  typeof error === "object" &&
                  "code" in error &&
                  error.code === "auth/user-not-found"
                ))
                  throw error;
              }
              setMessage(
                "Se houver uma conta para este e-mail, você receberá as instruções de recuperação. Confira também a caixa de spam.",
              );
            } catch {
              setMessage(
                "Não foi possível solicitar a recuperação agora. Verifique a conexão e tente novamente.",
              );
            } finally {
              setPending(false);
            }
          }}
        >
          <label>
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <button className="button button-primary" disabled={pending}>
            {pending ? "Enviando…" : "Enviar instruções"}
          </button>
          <p role="status" className="form-message">
            {message}
          </p>
        </form>
        <p className="auth-switch">
          <Link href="/login">Voltar para entrar</Link>
        </p>
      </section>
    </main>
  );
}
