import type { Metadata } from "next";
import Link from "next/link";
import { EducationLibrary } from "@/components/education-library";
export const metadata: Metadata = {
  title: "Aprender a se cuidar",
  description:
    "Orientações educativas sobre estética, saúde mental, prevenção e envelhecimento saudável em todas as fases da vida.",
};
export default function Contents() {
  return (
    <main id="conteudo" className="shell learning-main">
      <header className="learning-heading">
        <p className="eyebrow">INFORMAÇÃO PARA VIVER MELHOR</p>
        <h1>
          Aprender também é <em>autocuidado.</em>
        </h1>
        <p className="muted">
          Explore orientações para cultivar hábitos possíveis, fortalecer
          vínculos e cuidar da qualidade de vida em todas as fases.
        </p>
      </header>
      <p className="notice">
        Conteúdo educativo, sem diagnóstico ou prescrição. As orientações não
        substituem avaliação profissional.{" "}
        <Link href="/apoio">Conheça caminhos de apoio.</Link>
      </p>
      <EducationLibrary />
    </main>
  );
}
