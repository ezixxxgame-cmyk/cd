"use client";

import { FormEvent, useMemo, useState } from "react";
import { formatPrice, services } from "@/data/services";

type SubmitState = "idle" | "sending" | "success" | "error";

export function BookingForm() {
  const [selected, setSelected] = useState<string[]>(["base"]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [status, setStatus] = useState("");

  const total = useMemo(
    () =>
      services
        .filter((service) => selected.includes(service.id))
        .reduce((sum, service) => sum + service.price, 0),
    [selected]
  );

  function toggleService(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedServices = services.filter((service) =>
      selected.includes(service.id)
    );

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
          address: String(formData.get("address") || ""),
          car: String(formData.get("car") || ""),
          services: selectedServices.map((service) => ({
            id: service.id,
            name: service.name,
            price: service.price,
            prefix: service.prefix || ""
          })),
          total
        })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitState("success");
      setStatus("Заявка отправлена. В ближайшее время мы свяжемся с вами.");
      form.reset();
      setSelected(["base"]);
    } catch {
      setSubmitState("error");
      setStatus("Не удалось отправить заявку. Проверьте данные или попробуйте позже.");
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label>
          <span>Имя</span>
          <input name="name" placeholder="Как к вам обращаться" required />
        </label>
        <label>
          <span>Телефон</span>
          <input
            name="phone"
            placeholder="+7 ___ ___-__-__"
            inputMode="tel"
            required
          />
        </label>
        <label>
          <span>Адрес</span>
          <input name="address" placeholder="Уфа, район или точка выезда" required />
        </label>
        <label>
          <span>Марка авто</span>
          <input name="car" placeholder="Например, BMW 5" required />
        </label>
      </div>

      <fieldset className="service-picker">
        <legend>Выберите услуги</legend>
        {services.map((service) => (
          <label className="service-option" key={service.id}>
            <input
              type="checkbox"
              checked={selected.includes(service.id)}
              onChange={() => toggleService(service.id)}
            />
            <span className="service-check" aria-hidden="true" />
            <span>
              <strong>{service.name}</strong>
              <small>{service.description}</small>
            </span>
            <b>
              {service.prefix}
              {formatPrice(service.price)}
            </b>
          </label>
        ))}
      </fieldset>

      <div className="form-footer">
        <div>
          <span>Ориентир по стоимости</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <button
          className="button button-primary"
          type="submit"
          disabled={submitState === "sending"}
        >
          {submitState === "sending" ? "Отправляем..." : "Записаться на детейлинг"}
        </button>
      </div>
      {status ? (
        <p className={`form-status form-status-${submitState}`}>{status}</p>
      ) : null}
    </form>
  );
}
