"use client";
import { useState } from "react";
import Link from "next/link";
import { createCareBooking, useCare } from "@/lib/use-care";
import { services, professionals } from "@/data/content";
import { ArrowRight, CalendarDays } from "lucide-react";
export function BookingForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const { mode } = useCare();
  return (
    <form
      className="booking-form"
      onChange={() => setMessage("")}
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setPending(true);
        try {
          await createCareBooking({
            service: String(data.get("service")),
            professional: String(data.get("professional")),
            date: String(data.get("date")),
            time: String(data.get("time")),
          });
          setMessage(
            mode === "firebase"
              ? "Planejamento salvo na sua conta. Nenhum horário foi reservado com o profissional."
              : "Planejamento salvo neste navegador. Nenhum horário foi reservado com o profissional.",
          );
          form.reset();
        } catch (error) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Não foi possível salvar. Confira se o armazenamento do navegador está disponível.",
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <label>
        Seu momento de cuidado
        <select name="service" required defaultValue="">
          <option disabled value="">
            Escolha um serviço
          </option>
          {services.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
        </select>
      </label>
      <label>
        Com quem?
        <select name="professional" required defaultValue="">
          <option disabled value="">
            Escolha um profissional
          </option>
          {professionals.map((p) => (
            <option key={p.name}>{p.name}</option>
          ))}
        </select>
      </label>
      <label>
        Melhor dia
        <input type="date" name="date" required aria-label="Data desejada" />
      </label>
      <label>
        Horário desejado
        <input type="time" name="time" required />
      </label>
      <button
        className="button button-primary"
        type="submit"
        disabled={pending}
      >
        <CalendarDays size={17} aria-hidden="true" />
        {pending ? "Salvando…" : "Planejar meu cuidado"}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">
        {mode === "firebase"
          ? "Planos vinculados à sua conta. Entre para salvar e acessar em outros dispositivos."
          : "Seus planos ficam apenas neste navegador."}{" "}
        Não há consulta de disponibilidade nem confirmação de reserva.
      </p>
      <Link href="/minha-area" className="text-link">
        Ver meus planejamentos ↗
      </Link>
      <p role="status" className="form-message">
        {message}
      </p>
    </form>
  );
}
