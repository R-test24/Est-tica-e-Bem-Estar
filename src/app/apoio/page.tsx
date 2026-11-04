import type { Metadata } from "next";
import { ActionLink } from "@/components/ui";
export const metadata: Metadata = { title: "Onde encontrar apoio" };
export default function SupportPage() {
  return (
    <main id="conteudo" className="shell learning-main">
      <header className="learning-heading">
        <p className="eyebrow">ACOLHIMENTO E ORIENTAÇÃO</p>
        <h1>
          Pedir ajuda é uma forma de <em>cuidado.</em>
        </h1>
        <p className="muted">
          Caminhos de apoio no Brasil. Escolha o serviço adequado à sua
          necessidade; esta plataforma não realiza atendimento ou monitoramento.
        </p>
      </header>
      <section className="urgent-support" aria-labelledby="urgent-title">
        <h2 id="urgent-title">Há risco imediato ou uma emergência?</h2>
        <p>
          Procure um serviço de urgência ou ligue para o SAMU:{" "}
          <a href="tel:192">192</a>. Se houver perigo ou violência em curso,
          ligue <a href="tel:190">190</a>. O CVV oferece escuta emocional e não
          substitui atendimento de emergência.
        </p>
      </section>
      <div className="education-grid">
        <article className="care-panel">
          <p className="eyebrow">ESCUTA EMOCIONAL</p>
          <h2>CVV • 188</h2>
          <p>
            Atendimento telefônico gratuito, 24 horas, para conversar com sigilo
            e acolhimento.
          </p>
          <a className="button button-primary" href="tel:188">
            Ligar para 188
          </a>
          <p>
            <a
              className="text-link"
              href="https://cvv.org.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Outros canais e horários no CVV ↗
            </a>
          </p>
        </article>
        <article className="care-panel">
          <p className="eyebrow">CUIDADO CONTINUADO</p>
          <h2>Unidade Básica de Saúde</h2>
          <p>
            A UBS é um caminho para orientação, acompanhamento e encaminhamento
            na rede de saúde. Consulte a secretaria de saúde do seu município
            para localizar uma unidade.
          </p>
          <a
            className="text-link"
            href="https://www.gov.br/saude/pt-br/composicao/saps"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conheça a atenção primária ↗
          </a>
        </article>
        <article className="care-panel">
          <p className="eyebrow">REDE DE SAÚDE MENTAL</p>
          <h2>CAPS</h2>
          <p>
            Os Centros de Atenção Psicossocial integram a rede pública de saúde
            mental. A oferta e o funcionamento variam por território; busque
            informações na rede municipal.
          </p>
          <a
            className="text-link"
            href="https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps/caps"
            target="_blank"
            rel="noopener noreferrer"
          >
            Saiba mais sobre os CAPS ↗
          </a>
        </article>
      </div>
      <section className="future-banner">
        <div>
          <h2>Uma conversa pode ser o primeiro passo.</h2>
          <p>
            Se for possível e seguro, procure companhia de alguém de confiança
            para buscar atendimento.
          </p>
        </div>
        <ActionLink href="/conteudos" secondary>
          Voltar aos conteúdos
        </ActionLink>
      </section>
    </main>
  );
}
