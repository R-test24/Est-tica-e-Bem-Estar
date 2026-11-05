"use client";
import Link from "next/link";
import { useSession, endSession } from "./session-provider";
import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
const links = [
  ["Conteúdos", "/conteudos"],
  ["Autocuidado", "/#temas"],
  ["Serviços", "/#servicos"],
  ["Apoio", "/apoio"],
  ["Minha área", "/minha-area"],
];
export function Header() {
  const { user } = useSession();
  const [sessionMessage, setSessionMessage] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="Estética e Bem-Estar — início"
        >
          <Leaf aria-hidden="true" size={30} strokeWidth={1.2} />
          <span>
            Estética <i>&</i> Bem-Estar<small>CUIDAR DE VOCÊ É ESSENCIAL</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Navegação principal"
        >
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          {user ? (
            <button
              className="login-link"
              disabled={leaving}
              onClick={async () => {
                setLeaving(true);
                try {
                  await endSession();
                  setOpen(false);
                  setSessionMessage("");
                } catch {
                  setSessionMessage("Não foi possível sair. Tente novamente.");
                } finally {
                  setLeaving(false);
                }
              }}
            >
              {leaving ? "Saindo…" : "Sair da conta"}
            </button>
          ) : (
            <Link
              className="login-link"
              href="/login"
              onClick={() => setOpen(false)}
            >
              Entrar <span aria-hidden="true">↗</span>
            </Link>
          )}
          {sessionMessage && <p role="status">{sessionMessage}</p>}
        </nav>
      </div>
    </header>
  );
}
