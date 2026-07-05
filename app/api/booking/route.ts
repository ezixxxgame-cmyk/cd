import { NextResponse } from "next/server";

type BookingService = {
  name: string;
  price: number;
  prefix?: string;
};

type BookingRequest = {
  name?: string;
  phone?: string;
  address?: string;
  car?: string;
  services?: BookingService[];
  total?: number;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " ₽";

function clean(value: unknown) {
  return String(value || "").trim();
}

function buildMessage(data: Required<BookingRequest>) {
  const serviceLines = data.services
    .map((service) => `- ${service.name}: ${service.prefix || ""}${formatPrice(service.price)}`)
    .join("\n");

  return [
    "Новая заявка на детейлинг",
    "",
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Адрес: ${data.address}`,
    `Авто: ${data.car}`,
    "",
    "Услуги:",
    serviceLines,
    "",
    `Ориентир по стоимости: ${formatPrice(data.total)}`
  ].join("\n");
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram env vars are not configured" },
      { status: 500 }
    );
  }

  let payload: BookingRequest;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = clean(payload.name);
  const phone = clean(payload.phone);
  const address = clean(payload.address);
  const car = clean(payload.car);
  const services = Array.isArray(payload.services) ? payload.services : [];
  const total = Number(payload.total || 0);

  if (!name || !phone || !address || !car || services.length === 0 || total <= 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const message = buildMessage({
    name,
    phone,
    address,
    car,
    services,
    total
  });

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    }
  );

  if (!telegramResponse.ok) {
    return NextResponse.json(
      { error: "Telegram request failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
