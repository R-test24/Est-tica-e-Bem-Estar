"use client";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Award, Check, Trash2 } from "lucide-react";
import { habits, localDay } from "@/lib/local-care";
import { useCare, deleteCareBooking, changeCareHabit } from "@/lib/use-care";
import { Icon } from "@/components/ui";
export function CareDashboard() {
  const { data, ready, error, mode } = useCare();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);
  const today = localDay();
  const checked = data.checks[today] || [];
  const total = Object.values(data.checks).reduce(
    (sum, ids) => sum + ids.length,
    0,
  );
  const points = total * 10;
  const level =
    points >= 200 ? "Florescer" : points >= 100 ? "Cultivar" : "Semente";
  const bookings = [...data.bookings].sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
  );
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    return {
      id: localDay(day),
      label: day.toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      }),
    };
  });
  async function action(fn: () => Promise<void>, success: string) {
    setPending(true);
    try {
      await fn();
      setMessage(success);
    } catch (e) {
      setMessage(
        e instanceof Error
          ? e.message
          : "Não foi possível salvar. Confira o armazenamento do navegador.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <main id="conteudo" className="shell care-main">
      <div className="care-heading">
        <div>
          <p className="eyebrow">SUA JORNADA, NO SEU RITMO</p>
          <h1>
            Um espaço para <em>cuidar de você.</em>
          </h1>
          <p className="muted">
            Organize seus momentos de cuidado e celebre pequenas conquistas.
          </p>
        </div>
        <Link className="button button-primary" href="/#agendamento">
          Planejar um cuidado ↗
        </Link>
      </div>
      <p className="notice">
        {mode === "firebase"
          ? "Seus dados são vinculados à sua conta. Os planejamentos não confirmam reservas com profissionais. Os pontos continuam demonstrativos. Não registre informações sensíveis."
          : "Modo local de demonstração. Os dados ficam neste navegador, compartilhados entre quem o utiliza. Não são vinculados ao login, não sincronizam entre dispositivos e podem ser perdidos ao limpar o armazenamento. Não registre informações sensíveis."}
      </p>
      {!ready ? (
        <p role="status">Carregando seus registros…</p>
      ) : error ? (
        <p role="alert" className="notice">
          {error}{" "}
          {mode === "firebase" && (
            <Link href="/login">Entrar na minha conta ↗</Link>
          )}
        </p>
      ) : (
        <>
          <div className="care-stats">
            <article>
              <CalendarDays aria-hidden="true" />
              <strong>{bookings.length}</strong>
              <span>planejamentos salvos</span>
            </article>
            <article>
              <Check aria-hidden="true" />
              <strong>
                {checked.length} / {habits.length}
              </strong>
              <span>cuidados registrados hoje</span>
            </article>
            <article>
              <Award aria-hidden="true" />
              <strong>{points}</strong>
              <span>pontos demonstrativos</span>
            </article>
          </div>
          <div className="care-columns">
            <section className="care-panel" aria-labelledby="plans-title">
              <p className="eyebrow">TEMPO PARA VOCÊ</p>
              <h2 id="plans-title">Meus planejamentos</h2>
              <p className="muted">
                Planejamentos sem confirmação ou envio ao profissional.
              </p>
              {bookings.length === 0 ? (
                <div className="empty-state">
                  <CalendarDays aria-hidden="true" />
                  <h3>Seu próximo cuidado começa aqui.</h3>
                  <p>
                    Escolha um serviço e salve o momento que gostaria de
                    reservar.
                  </p>
                  <Link className="text-link" href="/#agendamento">
                    Escolher um cuidado ↗
                  </Link>
                </div>
              ) : (
                <ul className="booking-list">
                  {bookings.map((b) => (
                    <li key={b.id}>
                      <span className="profile-label">
                        PLANEJAMENTO • NÃO CONFIRMADO
                      </span>
                      <h3>{b.service}</h3>
                      <p>{b.professional}</p>
                      <p>
                        {new Date(b.date + "T12:00:00").toLocaleDateString(
                          "pt-BR",
                        )}{" "}
                        às {b.time}
                      </p>
                      {removing === b.id ? (
                        <div className="remove-confirm">
                          <p>Remover este planejamento?</p>
                          <button
                            className="button button-secondary"
                            disabled={pending}
                            onClick={() => {
                              action(
                                () => deleteCareBooking(b.id),
                                "Planejamento removido.",
                              );
                              setRemoving(null);
                            }}
                          >
                            Sim, remover
                          </button>
                          <button
                            className="text-link"
                            onClick={() => setRemoving(null)}
                          >
                            Manter
                          </button>
                        </div>
                      ) : (
                        <button
                          className="remove-button"
                          onClick={() => setRemoving(b.id)}
                        >
                          <Trash2 size={15} aria-hidden="true" />
                          Remover planejamento de {b.service}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section className="care-panel" aria-labelledby="habits-title">
              <p className="eyebrow">PEQUENOS PASSOS</p>
              <h2 id="habits-title">Meus cuidados de hoje</h2>
              <p className="muted">
                Sugestões opcionais, sem metas clínicas. Marque apenas o que fez
                sentido para você.
              </p>
              <div className="habit-list">
                {habits.map((h) => (
                  <label key={h.id}>
                    <Icon name={h.icon} />
                    <span>{h.label}</span>
                    <input
                      type="checkbox"
                      checked={checked.includes(h.id)}
                      disabled={pending}
                      onChange={() =>
                        action(
                          () => changeCareHabit(h.id),
                          "Registro de hoje atualizado.",
                        )
                      }
                    />
                  </label>
                ))}
              </div>
              <h3 className="history-title">Seus últimos 7 dias</h3>
              <ul className="habit-history">
                {days.map((day) => (
                  <li key={day.id}>
                    <span>{day.label}</span>
                    <strong>
                      {data.checks[day.id]?.length || 0} / {habits.length}
                    </strong>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <section
            className="care-panel loyalty-panel"
            aria-labelledby="loyalty-title"
          >
            <Award size={36} aria-hidden="true" />
            <div>
              <p className="eyebrow">CULTIVANDO CONSTÂNCIA</p>
              <h2 id="loyalty-title">Sua jornada: {level}</h2>
              <p className="muted">
                Cada cuidado registrado vale 10 pontos. Desmarcar um cuidado
                remove seus pontos. Níveis: Semente (0), Cultivar (100),
                Florescer (200).
              </p>
              <progress
                max={200}
                value={Math.min(points, 200)}
                aria-label="Progresso até o nível Florescer"
              />
              <p className="form-note">
                Programa demonstrativo, sem descontos ou recompensas reais.
                Agendamentos não geram pontos.
              </p>
            </div>
          </section>
        </>
      )}
      <p className="form-message care-feedback" role="status">
        {message}
      </p>
    </main>
  );
}
