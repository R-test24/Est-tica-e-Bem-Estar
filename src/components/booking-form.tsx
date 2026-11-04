"use client";
import { useState } from "react";
import Link from "next/link";
import { saveBooking } from "@/lib/local-care";
import { services, professionals } from "@/data/content";
import { ArrowRight, CalendarDays } from "lucide-react";
export function BookingForm() {
  const [message, setMessage] = useState("");
  return (
    <form
      className="booking-form"
      onChange={() => setMessage("")}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
          saveBooking({
            service: String(data.get("service")),
            professional: String(data.get("professional")),
            date: String(data.get("date")),
            time: String(data.get("time")),
          });
          setMessage(
            "Planejamento salvo neste navegador. Nenhum horário foi reservado com o profissional.",
          );
          event.currentTarget.reset();
        } catch (error) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Não foi possível salvar. Confira se o armazenamento do navegador está disponível.",
          );
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
      <button className="button button-primary" type="submit">
        <CalendarDays size={17} aria-hidden="true" />
        Planejar meu cuidado
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">
        Seus planos ficam apenas neste navegador. Não há consulta de
        disponibilidade nem confirmação de reserva.
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
