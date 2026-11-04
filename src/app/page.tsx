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
import { services, professionals, articles } from "@/data/content";
export default function Home() {
  return (
    <main id="conteudo">
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-line" />
              UM ENCONTRO COM A SUA MELHOR VERSÃO
            </p>
            <h1>
              Seu tempo de
              <br />
              cuidar. Seu jeito
              <br />
              de <em>florescer.</em>
            </h1>
            <p className="hero-description">
              Estética, acolhimento e bem-estar em um só lugar.
              <br className="desktop-break" /> Um espaço para desacelerar e se
              reconectar com você.
            </p>
            <div className="hero-actions">
              <ActionLink href="#agendamento">Reserve seu momento</ActionLink>
              <a className="text-link" href="#servicos">
                Conheça nossos cuidados <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>
                <Check size={14} />
                Cuidado individualizado
              </span>
              <span>
                <Check size={14} />
                Respeito à sua essência
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
      <section className="section shell" id="servicos">
        <div className="section-top">
          <SectionHeading
            eyebrow="NOSSOS CUIDADOS"
            title="Pequenos rituais. Grandes sensações."
            description="Experiências pensadas para respeitar seu ritmo e valorizar o que faz você se sentir bem."
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
        <div className="article-grid">
          {articles.map((a) => (
            <article className="article-card" key={a.title}>
              <div className="article-icon">
                <Icon name={a.icon} />
              </div>
              <p className="eyebrow">{a.category}</p>
              <h3>{a.title}</h3>
              <p className="muted">{a.text}</p>
            </article>
          ))}
        </div>
        <div className="future-banner">
          <Leaf aria-hidden="true" />
          <div>
            <h3>Seu cuidado merece continuidade.</h3>
            <p>
              Em breve: acompanhamento de hábitos e um programa de fidelidade
              para celebrar sua jornada.
            </p>
          </div>
          <ActionLink href="/cadastro" secondary>
            Faça parte
          </ActionLink>
        </div>
      </section>
    </main>
  );
}
