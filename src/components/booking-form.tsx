"use client";
import { useState } from "react";
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
        const selected = String(data.get("date"));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(selected + "T00:00:00") < today) {
          setMessage("Escolha uma data a partir de hoje.");
          return;
        }
        setMessage(
          "Sua seleção está pronta. O agendamento online será disponibilizado em breve; nenhum horário foi reservado.",
        );
      }}
    >
      <label>
        Seu momento de cuidado
        <select required defaultValue="">
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
        <select required defaultValue="">
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
      <button className="button button-primary" type="submit">
        <CalendarDays size={17} aria-hidden="true" />
        Planejar meu cuidado
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">
        Demonstração de agendamento. Disponibilidade e reservas em breve.
      </p>
      <p role="status" className="form-message">
        {message}
      </p>
    </form>
  );
}
