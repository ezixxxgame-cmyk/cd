type Benefit = {
  icon: "car" | "flask" | "clock" | "hundred";
  text: string;
};

const benefits: Benefit[] = [
  { icon: "car", text: "Выезд по Уфе и пригороде" },
  { icon: "flask", text: "Профессиональная химия detail и качественное оборудование" },
  { icon: "clock", text: "Экономия времени без поездки в центр" },
  { icon: "hundred", text: "Внимание к кузову, салону, колесам и трудным зонам" }
];

function Icon({ name }: { name: Benefit["icon"] }) {
  if (name === "car") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 28h30l-3-9H12l-3 9Z" />
        <path d="M7 28v8h5m24 0h5v-8" />
        <path d="M14 36h20" />
        <circle cx="15" cy="36" r="3" />
        <circle cx="33" cy="36" r="3" />
      </svg>
    );
  }

  if (name === "flask") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M18 7h12" />
        <path d="M21 7v13L11 37c-1 2 0 4 3 4h20c3 0 4-2 3-4L27 20V7" />
        <path d="M16 32h16" />
        <path d="M20 25h8" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="17" />
        <path d="M24 13v12l8 5" />
        <path d="M13 8 8 13" />
        <path d="M35 8l5 5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 18c0-5 4-9 9-9 2 0 4 1 5 2 1-1 3-2 5-2 5 0 9 4 9 9 0 10-14 19-14 19S10 28 10 18Z" />
      <path d="M15 24h18" />
      <path d="M18 20h12" />
      <text x="24" y="29" textAnchor="middle">100</text>
    </svg>
  );
}

export function BenefitStrip() {
  return (
    <section className="section strip" aria-label="Коротко о сервисе">
      {benefits.map((benefit) => (
        <article key={benefit.text}>
          <Icon name={benefit.icon} />
          <p>{benefit.text}</p>
        </article>
      ))}
    </section>
  );
}
