import Image from "next/image";
import { BenefitStrip } from "@/components/BenefitStrip";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BookingForm } from "@/components/BookingForm";
import { formatPrice, services } from "@/data/services";
import { getSiteUrl } from "@/lib/site";

const phoneDisplay = "8 999 764-24-44";
const phoneHref = "tel:+79997642444";
const siteUrl = getSiteUrl();

const processSteps = [
  "Заявка",
  "Уточнение адреса",
  "Выезд команды",
  "Детейлинг на месте",
  "Приемка результата"
];

const reviews = [
  {
    name: "Алексей",
    car: "BMW 5 Series",
    text: "Приехали вовремя, спокойно объяснили порядок работ. Машина после мойки и салона выглядит заметно свежее."
  },
  {
    name: "Ильдар",
    car: "Toyota Camry",
    text: "Удобно, что не пришлось ехать через город. Кузов, колеса и салон сделали аккуратно, без лишних разговоров."
  },
  {
    name: "Марина",
    car: "Kia Sportage",
    text: "Заказывала базовый комплекс с химчисткой. Понравилось внимание к мелочам и чистый результат без резкого запаха."
  }
];

const faq = [
  {
    question: "Выездной детейлинг в Уфе выполняется у дома или офиса?",
    answer:
      "Да. Команда приезжает по Уфе и пригороде в удобную точку: к дому, офису или на другую площадку, где можно спокойно выполнить детейлинг."
  },
  {
    question: "Можно выбрать несколько услуг сразу?",
    answer:
      "Да. Базовый детейлинг-комплекс можно дополнить химчисткой салона, мойкой подкапотного пространства, керамикой и антидождем."
  },
  {
    question: "Что входит в базовый детейлинг-комплекс?",
    answer:
      "В базовый комплекс входит трехфазная мойка кузова, уборка салона, чернение колес и работа с профессиональной автохимией."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#localbusiness`,
    name: "Сокольников Детейлинг",
    url: siteUrl,
    image: `${siteUrl}/images/before-after-car.png`,
    telephone: "+79997642444",
    priceRange: "от 5 000 ₽",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Уфа",
      addressRegion: "Республика Башкортостан",
      addressCountry: "RU"
    },
    areaServed: [
      {
        "@type": "City",
        name: "Уфа"
      },
      {
        "@type": "AdministrativeArea",
        name: "пригород Уфы"
      }
    ],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      name: service.name,
      price: service.price,
      priceCurrency: "RUB",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        areaServed: "Уфа и пригород"
      }
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Сокольников Детейлинг">
          <span>SD</span>
          <strong>Сокольников Детейлинг</strong>
        </a>
        <nav aria-label="Навигация">
          <a href="#services">Услуги</a>
          <a href="#process">Процесс</a>
          <a href="#gallery">Фото</a>
          <a href="#faq">FAQ</a>
          <a href="#booking">Запись</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Выездной детейлинг авто в Уфе и пригороде</p>
          <h1>Детейлинг Уфа с выездом к дому или офису</h1>
          <p className="hero-text">
            Мобильный детейлинг авто без поездки в детейлинг-центр. Приезжаем
            к дому, офису или в удобное место, моем кузов, приводим салон в
            порядок и аккуратно дорабатываем детали.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#booking">
              Записаться на детейлинг
            </a>
            <a className="button button-ghost" href="#services">
              Посмотреть услуги
            </a>
            <a className="button button-call" href={phoneHref}>
              {phoneDisplay}
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Черный автомобиль после детейлинга">
          <Image
            src="/images/hero-black-car.png"
            alt="Черный автомобиль для премиального выездного детейлинга в Уфе"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
          />
        </div>
      </section>

      <BenefitStrip />

      <section className="section services" id="services">
        <div className="section-heading">
          <p className="eyebrow">Услуги и цены</p>
          <h2>База как основа, дополнительные работы по необходимости</h2>
          <p>
            Можно выбрать базовый детейлинг-комплекс и добавить одну или
            несколько услуг: химчистку салона, мойку подкапотного пространства,
            керамику и антидождь. Стоимость прозрачная, без агрессивной продажи.
          </p>
        </div>
        <div className="price-board">
          {services.map((service) => (
            <article className="price-row" key={service.id}>
              <div>
                <span>
                  {service.id === "base"
                    ? "Основа"
                    : service.price >= 20000
                      ? "Пакет"
                      : "Дополнительно"}
                </span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <strong>
                {service.prefix}
                {formatPrice(service.price)}
              </strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section capability">
        <div className="capability-copy">
          <p className="eyebrow">Почему удобно</p>
          <h2>Команда приезжает подготовленной</h2>
          <p>
            С собой профессиональная автохимия, инвентарь и понятный порядок
            работы. Клиенту не нужно ехать через город, ждать в боксе или
            перестраивать день вокруг услуги. Такой формат удобен, когда нужен
            детейлинг у дома, офиса или в другой точке по Уфе.
          </p>
          <div className="feature-grid">
            <article>
              <h3>Кузов</h3>
              <p>Трехфазная мойка и аккуратная работа с трудными участками.</p>
            </article>
            <article>
              <h3>Салон</h3>
              <p>Уборка поверхностей, стекол, багажника и зон повседневного контакта.</p>
            </article>
            <article>
              <h3>Колеса</h3>
              <p>Чернение, визуальная чистота арок и завершенный внешний вид.</p>
            </article>
            <article>
              <h3>Защита</h3>
              <p>Керамика и антидождь как спокойный способ продлить чистоту.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading">
          <p className="eyebrow">Процесс</p>
          <h2>Пять шагов без лишней суеты</h2>
        </div>
        <div className="route-line">
          {processSteps.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">Фото работ</p>
          <h2>До и после видно сразу</h2>
          <p>
            Сравните состояние автомобиля до обработки и после детейлинга:
            чистый кузов, глубокий цвет и аккуратный внешний вид без поездки в
            детейлинг-центр.
          </p>
        </div>
        <BeforeAfterSlider />
      </section>

      <section className="section reviews">
        <div className="section-heading">
          <p className="eyebrow">Отзывы</p>
          <h2>Клиенты отмечают аккуратность и удобство выезда</h2>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <span>★★★★★</span>
              <h3>{review.name}</h3>
              <p className="car-name">{review.car}</p>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="section-heading">
          <p className="eyebrow">Вопросы</p>
          <h2>Коротко о выездном детейлинге</h2>
          <p>
            Ответы на частые вопросы перед записью: где работаем, какие услуги
            можно совместить и что входит в базовый комплекс.
          </p>
        </div>
        <div className="faq-list">
          {faq.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section booking" id="booking">
        <div className="booking-copy">
          <p className="eyebrow">Запись</p>
          <h2>Оставьте заявку на выездной детейлинг</h2>
          <p>
            Укажите адрес, автомобиль и нужные услуги. Заявка уйдет мастеру в
            Telegram, после чего с вами свяжутся для подтверждения времени.
          </p>
        </div>
        <BookingForm />
      </section>

      <section className="section service-area">
        <h2>Зона выезда</h2>
        <p>
          Работаем по Уфе и пригороде. Команда приезжает со своей
          профессиональной химией и оборудованием, чтобы выполнить детейлинг у
          дома, офиса или в другой удобной точке.
        </p>
        <address>
          <strong>Сокольников Детейлинг</strong>
          <span>Выездной сервис: Уфа и пригород</span>
          <a href={phoneHref}>{phoneDisplay}</a>
        </address>
      </section>
    </main>
  );
}
