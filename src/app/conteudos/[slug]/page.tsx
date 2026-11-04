import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, themes } from "@/data/education";
import { ActionLink } from "@/components/ui";
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  return {
    title: guide?.title ?? "Conteúdo não encontrado",
    description: guide?.summary,
  };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  const theme = themes.find((t) => t.id === guide.theme)!;
  return (
    <main id="conteudo" className="shell learning-main">
      <nav aria-label="Caminho da página" className="breadcrumb">
        <Link href="/">Início</Link>
        <span aria-hidden="true">/</span>
        <Link href="/conteudos">Conteúdos</Link>
      </nav>
      <article className="guide-layout">
        <div className="guide-copy">
          <header className="learning-heading">
            <p className="eyebrow">{theme.label}</p>
            <h1>{guide.title}</h1>
            <p className="muted">{guide.summary}</p>
            <p className="stage-label">{guide.stages.join(" • ")}</p>
          </header>
          <p className="notice">
            Orientação educativa geral. Não oferece diagnóstico, tratamento ou
            recomendações individualizadas.
          </p>
          {guide.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <section className="practical-steps">
            <p className="eyebrow">UM PASSO POSSÍVEL HOJE</p>
            <h2>Experimente no seu ritmo</h2>
            <ul>
              {guide.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <ActionLink href="/minha-area">Acompanhar meus cuidados</ActionLink>
          </section>
          <section className="guide-sources">
            <h2>Para saber mais</h2>
            <p>
              Referências institucionais relacionadas ao tema. Os textos desta
              plataforma são sínteses educativas; não representam revisão
              clínica ou endosso dessas instituições.
            </p>
            <ul>
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label} <span aria-label="abre em nova aba">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="guide-aside">
          <h2>Você não precisa cuidar de tudo sozinho.</h2>
          <p>
            Conheça os serviços de apoio emocional e os caminhos para
            atendimento no SUS.
          </p>
          <ActionLink href="/apoio" secondary>
            Encontrar apoio
          </ActionLink>
          <hr />
          <h3>Continue aprendendo</h3>
          {guides
            .filter((g) => g.theme === guide.theme && g.slug !== guide.slug)
            .map((g) => (
              <Link
                className="related-guide"
                href={`/conteudos/${g.slug}`}
                key={g.slug}
              >
                {g.title} ↗
              </Link>
            ))}
        </aside>
      </article>
    </main>
  );
}
