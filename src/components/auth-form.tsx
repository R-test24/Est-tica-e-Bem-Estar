"use client";
import Link from "next/link";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  getFirebaseServices,
  isFirebaseConfigured,
} from "@/lib/firebase/client";
import { ArrowUpRight, Leaf } from "lucide-react";
export function AuthForm({ mode }: { mode: "login" | "cadastro" }) {
  const registering = mode === "cadastro";
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    if (registering && password !== data.get("confirmPassword")) {
      setMessage("As senhas precisam ser iguais.");
      return;
    }
    const services = getFirebaseServices();
    if (!services) {
      setMessage(
        "O acesso às contas estará disponível em breve. Nenhum dado foi enviado.",
      );
      return;
    }
    setPending(true);
    try {
      if (registering)
        await createUserWithEmailAndPassword(services.auth, email, password);
      else await signInWithEmailAndPassword(services.auth, email, password);
      setSuccess(true);
      setMessage(
        registering
          ? "Conta criada com sucesso. Sua área pessoal estará disponível em breve."
          : "Você entrou com sucesso. Sua área pessoal estará disponível em breve.",
      );
      form.reset();
    } catch (error) {
      const code = error instanceof FirebaseError ? error.code : "";
      setMessage(
        code === "auth/too-many-requests"
          ? "Muitas tentativas. Aguarde um pouco e tente novamente."
          : code === "auth/network-request-failed"
            ? "Não foi possível conectar. Verifique sua conexão."
            : registering
              ? "Não foi possível criar a conta. Confira os dados ou tente entrar, caso já tenha uma conta."
              : "Não foi possível entrar. Confira seu e-mail e senha e tente novamente.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <main id="conteudo" className="auth-main shell">
      <div className="auth-intro">
        <Leaf size={44} strokeWidth={1} />
        <p className="eyebrow">SEU ESPAÇO DE CUIDADO</p>
        <h1>
          Uma relação mais
          <br />
          <em>gentil com você.</em>
        </h1>
        <p>
          Seu primeiro passo para uma rotina com mais equilíbrio, cuidado e
          leveza.
        </p>
      </div>
      <section className="auth-card" aria-labelledby="auth-title">
        <p className="eyebrow">BEM-VINDO À SUA JORNADA</p>
        <h2 id="auth-title">
          {registering ? "Comece por você." : "Que bom ter você aqui."}
        </h2>
        <p className="muted">
          {registering
            ? "Crie sua conta para fazer parte."
            : "Entre com seu e-mail e senha."}
        </p>
        {!isFirebaseConfigured && (
          <p className="notice">
            Prévia da plataforma: login e cadastro serão ativados em breve.
          </p>
        )}
        <form onSubmit={submit} className="auth-form">
          <label>
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="voce@exemplo.com"
            />
          </label>
          <label>
            Senha
            <input
              name="password"
              type="password"
              autoComplete={registering ? "new-password" : "current-password"}
              required
              minLength={registering ? 8 : undefined}
              maxLength={128}
              placeholder={
                registering ? "Pelo menos 8 caracteres" : "Sua senha"
              }
            />
          </label>
          {registering && (
            <label>
              Confirme a senha
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
              />
            </label>
          )}
          <button
            type="submit"
            className="button button-primary"
            disabled={pending || success}
          >
            {pending
              ? "Aguarde…"
              : registering
                ? "Criar minha conta"
                : "Entrar"}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <p role="status" className="form-message">
            {message}
          </p>
        </form>
        <p className="auth-switch">
          {registering ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
          <Link href={registering ? "/login" : "/cadastro"}>
            {registering ? "Entre aqui" : "Cadastre-se"}
          </Link>
        </p>
      </section>
    </main>
  );
}
