export type Service = {
  id: string;
  name: string;
  price: number;
  prefix?: string;
  description: string;
};

export const services: Service[] = [
  {
    id: "base",
    name: "Базовый детейлинг-комплекс",
    price: 5000,
    description:
      "Трехфазная мойка кузова, уборка салона, чернение колес и премиальная автохимия."
  },
  {
    id: "dry-cleaning",
    name: "Глубокая химчистка",
    price: 4000,
    prefix: "+",
    description:
      "Более глубокая работа по тканям, пластику и зонам, где обычной уборки мало."
  },
  {
    id: "engine-bay",
    name: "Мойка подкапотного пространства",
    price: 3000,
    prefix: "+",
    description:
      "Аккуратная обработка подкапотной зоны с учетом чувствительных элементов."
  },
  {
    id: "ceramic-rain",
    name: "Керамика + антидождь",
    price: 6000,
    prefix: "+",
    description:
      "Защитный финиш для кузова и стекол, чтобы автомобиль дольше сохранял чистый вид."
  },
  {
    id: "polish-ceramic-complex",
    name: "Полировка + комплекс + керамика",
    price: 25000,
    description:
      "Расширенный пакет: детейлинг-комплекс, полировка кузова и защитная керамика."
  }
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " ₽";
