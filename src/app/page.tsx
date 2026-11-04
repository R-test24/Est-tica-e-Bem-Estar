import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Clock3,
  Leaf,
  Flower2,
  Sparkles,
} from "lucide-react";
import { ActionLink, Icon, SectionHeading } from "@/components/ui";
import { BookingForm } from "@/components/booking-form";
import Link from "next/link";
import { guides, themes } from "@/data/education";
import { services, professionals } from "@/data/content";
export default function Home() {
  return (
    <main id="conteudo">
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" />
              AUTOCUIDADO EM TODAS AS FASES DA VIDA
            </p>
            <h1>
              Informação para
              <br />
              cuidar. Hábitos
              <br />
              para <em>florescer.</em>
            </h1>
            <p className="hero-description">
              Estética, saúde mental, prevenção e envelhecimento saudável. Um
              espaço para aprender, cultivar o autocuidado e viver com mais
              qualidade.
            </p>
            <div className="hero-actions">
              <ActionLink href="/conteudos">Explore os conteúdos</ActionLink>
              <a className="text-link" href="#bem-estar">
                Conheça os temas <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <Check size={14} />
                Informação e acolhimento
              </span>
              <span>
                <Check size={14} />
                Respeito a cada fase
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            role="img"
            aria-label="Ilustração de folhas e formas orgânicas em tons de verde-sálvia"
          >
            <div className="art-orbit" />
            <div className="art-vase" />
            <Leaf className="botanical leaf-one" strokeWidth={0.65} />
            <Leaf className="botanical leaf-two" strokeWidth={0.65} />
            <Leaf className="botanical leaf-three" strokeWidth={0.65} />
            <div className="art-caption">
              beleza é estar
              <br />
              <em>bem com você.</em>
            </div>
            <div className="floating-note">
              <Flower2 size={29} strokeWidth={1} />
              <span>
                Uma pausa para você<small>O cuidado começa por aqui.</small>
              </span>
            </div>
            <span className="art-number">01 / ESSÊNCIA</span>
          </div>
        </div>
      </section>
      <div className="values-strip">
        <div className="shell">
          <span>
            <Leaf />
            Beleza com propósito
          </span>
          <span>
            <Flower2 />
            Cuidado que acolhe
          </span>
          <span>
            <Sparkles />
            Bem-estar em cada detalhe
          </span>
        </div>
      </div>
      <section className="section shell" id="temas">
        <div className="section-top">
          <SectionHeading
            eyebrow="QUATRO CAMINHOS, UM MESMO CUIDADO"
            title="Bem-estar para a vida toda."
            description="Informação para apoiar suas escolhas, sem padrões de beleza, cobranças ou diagnósticos online."
          />
          <ActionLink href="/conteudos" secondary>
            Aprender a se cuidar
          </ActionLink>
        </div>
        <div className="pillar-grid">
          {themes.map((t) => (
            <article className="pillar-card" key={t.id}>
              <Icon name={t.icon} />
              <h3>{t.label}</h3>
              <p>{t.description}</p>
              <Link className="text-link" href="/conteudos">
                Explorar conteúdos ↗
              </Link>
            </article>
          ))}
        </div>
        <div className="life-stages">
          <p className="eyebrow">CADA FASE TEM SEU RITMO</p>
          <h2>O cuidado acompanha as suas mudanças.</h2>
          <div>
            <p>
              <strong>Juventude</strong>Autoestima, relações e uma convivência
              mais gentil com a própria imagem.
            </p>
            <p>
              <strong>Vida adulta</strong>Equilíbrio na rotina, vínculos e
              prevenção com orientação.
            </p>
            <p>
              <strong>Pessoa idosa</strong>Autonomia, participação social e
              respeito à sua história.
            </p>
          </div>
          <p className="muted">
            As experiências são diversas. Adapte os cuidados à sua realidade e
            busque orientação profissional quando necessário.
          </p>
        </div>
      </section>
      <section className="section shell" id="servicos">
        <div className="section-top">
          <SectionHeading
            eyebrow="NOSSOS CUIDADOS"
            title="Pequenos rituais. Grandes sensações."
            description="Exemplos de experiências de estética e bem-estar para planejar localmente. Não são tratamentos médicos nem ofertas de reserva confirmada."
          />
          <a className="text-link" href="#agendamento">
            Encontre seu cuidado <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <article className="service-card" key={s.name}>
              <div className={`service-art service-art-${i}`}>
                <Icon name={s.icon} />
                <span>0{i + 1}</span>
              </div>
              <div className="service-body">
                <p className="eyebrow">{s.category}</p>
                <h3>{s.name}</h3>
                <p className="muted">{s.description}</p>
                <div className="card-bottom">
                  <span>
                    <Clock3 size={14} />
                    {s.duration}
                  </span>
                  <a href="#agendamento" aria-label={`Planejar ${s.name}`}>
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="philosophy">
        <div className="shell philosophy-grid">
          <div className="philosophy-art" aria-hidden="true">
            <Flower2 strokeWidth={0.65} />
            <span>
              De dentro
              <br />
              para <em>fora.</em>
            </span>
          </div>
          <div>
            <p className="eyebrow">NOSSA ESSÊNCIA</p>
            <h2>Sentir-se bem vai além do espelho.</h2>
            <p className="muted">
              Acreditamos em uma beleza que respeita histórias, acolhe
              diferenças e caminha junto com a saúde e o equilíbrio.
            </p>
            <p className="muted">
              Aqui, cada cuidado é um convite para ouvir seu corpo, desacelerar
              a mente e cultivar uma relação mais gentil com você.
            </p>
            <a href="#bem-estar" className="text-link">
              Descubra uma rotina com mais leveza <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="section shell" id="profissionais">
        <SectionHeading
          eyebrow="CONEXÕES QUE CUIDAM"
          title="Pessoas que acolhem a sua essência."
          description="Conheça a proposta da nossa equipe. Perfis ilustrativos para esta primeira versão."
        />
        <div className="professional-grid">
          {professionals.map((p) => (
            <article className="professional-card" key={p.name}>
              <div className="portrait" style={{ background: p.color }}>
                <span aria-hidden="true">{p.initials}</span>
                <Flower2 aria-hidden="true" strokeWidth={0.7} />
              </div>
              <h3>{p.name}</h3>
              <p className="muted">{p.role}</p>
              <span className="profile-label">Perfil demonstrativo</span>
            </article>
          ))}
        </div>
      </section>
      <section className="booking-section" id="agendamento">
        <div className="shell booking-grid">
          <div>
            <p className="eyebrow">UM COMPROMISSO COM VOCÊ</p>
            <h2>
              Abra espaço para
              <br />o seu <em>bem-estar.</em>
            </h2>
            <p>
              Escolha um cuidado, encontre um profissional e planeje uma pausa
              na sua rotina.
            </p>
            <div className="booking-detail">
              <Clock3 size={22} />
              <span>
                Seu ritmo importa.<small>Comece com um momento só seu.</small>
              </span>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>
      <section className="section shell" id="bem-estar">
        <SectionHeading
          eyebrow="PARA CULTIVAR TODOS OS DIAS"
          title="Bem-estar também se aprende."
          description="Inspirações e conteúdos educativos para cuidar de você com mais consciência."
        />
        <div className="education-grid">
          {themes.map((t) => {
            const g = guides.find((g) => g.theme === t.id)!;
            return (
              <article className="article-card" key={g.slug}>
                <div className="article-icon">
                  <Icon name={t.icon} />
                </div>
                <p className="eyebrow">{t.label}</p>
                <h3>{g.title}</h3>
                <p className="muted">{g.summary}</p>
                <Link className="text-link" href={`/conteudos/${g.slug}`}>
                  Ler orientação ↗
                </Link>
              </article>
            );
          })}
        </div>
        <div className="future-banner">
          <Leaf aria-hidden="true" />
          <div>
            <h3>Seu cuidado merece continuidade.</h3>
            <p>
              Acompanhe seus cuidados diários e pontos demonstrativos para
              celebrar sua jornada.
            </p>
          </div>
          <ActionLink href="/minha-area" secondary>
            Minha jornada
          </ActionLink>
        </div>
      </section>
      <section className="support-home">
        <div className="shell">
          <div>
            <p className="eyebrow">VOCÊ NÃO PRECISA ESTAR SOZINHO</p>
            <h2>Acolhimento também faz parte do cuidado.</h2>
            <p>
              Conheça caminhos de apoio emocional e atendimento na rede pública.
              Em uma emergência, ligue 192.
            </p>
          </div>
          <ActionLink href="/apoio">Onde encontrar apoio</ActionLink>
        </div>
      </section>
    </main>
  );
}
