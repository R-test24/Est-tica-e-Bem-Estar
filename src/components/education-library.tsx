"use client";
import { useState } from "react";
import Link from "next/link";
import { guides, themes, stages } from "@/data/education";
import { Icon } from "@/components/ui";
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export function EducationLibrary() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("todos");
  const [stage, setStage] = useState("Todas as fases");
  const results = guides.filter(
    (g) =>
      (theme === "todos" || g.theme === theme) &&
      (stage === "Todas as fases" ||
        g.stages.includes("Todas as fases") ||
        g.stages.some((s) => s === stage)) &&
      normalize(
        [
          g.title,
          g.summary,
          themes.find((t) => t.id === g.theme)!.label,
          ...g.sections.map((s) => s.text),
        ].join(" "),
      ).includes(normalize(query.trim())),
  );
  return (
    <>
      <div className="library-filters">
        <label>
          O que você quer aprender?
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque por pele, descanso, autonomia…"
            maxLength={120}
          />
        </label>
        <label>
          Fase da vida
          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            {stages.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="theme-filters" role="group" aria-label="Filtrar por tema">
        <button
          aria-pressed={theme === "todos"}
          onClick={() => setTheme("todos")}
        >
          Todos os temas
        </button>
        {themes.map((t) => (
          <button
            key={t.id}
            aria-pressed={theme === t.id}
            onClick={() => setTheme(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p role="status" className="library-count">
        {results.length}{" "}
        {results.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}
      </p>
      <div className="education-grid">
        {results.map((g) => {
          const t = themes.find((t) => t.id === g.theme)!;
          return (
            <article className="article-card" key={g.slug}>
              <div className="article-icon">
                <Icon name={t.icon} />
              </div>
              <p className="eyebrow">{t.label}</p>
              <h2>
                <Link href={`/conteudos/${g.slug}`}>{g.title}</Link>
              </h2>
              <p className="muted">{g.summary}</p>
              <p className="stage-label">{g.stages.join(" • ")}</p>
              <Link className="text-link" href={`/conteudos/${g.slug}`}>
                Ler orientação <span aria-hidden="true">↗</span>
              </Link>
            </article>
          );
        })}
      </div>
      {results.length === 0 && (
        <div className="empty-state">
          <h2>Nenhum conteúdo para esta combinação.</h2>
          <p>Tente outra palavra ou amplie os filtros.</p>
          <button
            className="button button-secondary"
            onClick={() => {
              setQuery("");
              setTheme("todos");
              setStage("Todas as fases");
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </>
  );
}
