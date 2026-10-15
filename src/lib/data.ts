import type { Locale } from "@/lib/brand";

export type Localized = Record<Locale, string>;

export type RegionKey = "europe" | "asia" | "africa" | "middle-east";

export const REGIONS: { key: RegionKey; label: Localized }[] = [
  { key: "europe", label: { pl: "Europa", uk: "Європа", ru: "Европа", en: "Europe" } },
  { key: "asia", label: { pl: "Azja", uk: "Азія", ru: "Азия", en: "Asia" } },
  { key: "africa", label: { pl: "Afryka", uk: "Африка", ru: "Африка", en: "Africa" } },
  {
    key: "middle-east",
    label: { pl: "Bliski Wschód", uk: "Близький Схід", ru: "Ближний Восток", en: "Middle East" },
  },
];

const WIKI = "https://thumb.wikimedia.org/wikipedia/commons/thumb";

export interface Destination {
  slug: string;
  name: Localized;
  blurb: Localized;
  region: RegionKey;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "grecja",
    name: { pl: "Grecja", uk: "Греція", ru: "Греция", en: "Greece" },
    blurb: {
      pl: "Białe domy, turkusowe morze i wyspy, na których dzień zaczyna się od śniadania nad wodą.",
      uk: "Білі будинки, бірюзове море та острови, де день починається зі сніданку над водою.",
      ru: "Белые дома, бирюзовое море и острова, где день начинается с завтрака над водой.",
      en: "Whitewashed villages, turquoise water and islands where the day starts with breakfast over the sea.",
    },
    region: "europe",
    image: `${WIKI}/e/e2/Zakintos_-_panorama.jpg/1280px-Zakintos_-_panorama.jpg`,
  },
  {
    slug: "hiszpania",
    name: { pl: "Hiszpania", uk: "Іспанія", ru: "Испания", en: "Spain" },
    blurb: {
      pl: "Katalońskie tarasy, andaluzyjskie plaza i długie plaże Costa del Sol.",
      uk: "Каталонські тераси, андалузькі плази та довгі пляжі Коста-дель-Соль.",
      ru: "Каталонские террасы, андалузские плазы и длинные пляжи Коста-дель-Соль.",
      en: "Catalan terraces, Andalusian plazas and the long beaches of the Costa del Sol.",
    },
    region: "europe",
    image: `${WIKI}/a/a6/Evening_light_over_Barcelona.jpg/1280px-Evening_light_over_Barcelona.jpg`,
  },
  {
    slug: "turcja",
    name: { pl: "Turcja", uk: "Туреччина", ru: "Турция", en: "Turkey" },
    blurb: {
      pl: "Riwiera turecka z hotelami all inclusive i wycieczki do Kapadocji balonem o świcie.",
      uk: "Турецька Рив'єра з готелями all inclusive та подорожі до Кападокії на повітряній кулі на світанку.",
      ru: "Турецкая Ривьера с отелями all inclusive и поездки в Каппадокию на шаре на рассвете.",
      en: "The Turkish Riviera with all inclusive resorts and sunrise balloon trips over Cappadocia.",
    },
    region: "europe",
    image: `${WIKI}/5/59/Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg/1280px-Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg`,
  },
  {
    slug: "egipt",
    name: { pl: "Egipt", uk: "Єгипет", ru: "Египет", en: "Egypt" },
    blurb: {
      pl: "Morze Czerwone, rafy koralowe i luksus w Hurghadzie oraz Sharm el-Sheikh.",
      uk: "Червоне море, коралові рифи та розкіш у Хургаді та Шарм-еш-Сейху.",
      ru: "Красное море, коралловые рифы и роскошь в Хургаде и Шарм-эль-Шейхе.",
      en: "The Red Sea, coral reefs and easy luxury in Hurghada and Sharm El Sheikh.",
    },
    region: "africa",
    image: `${WIKI}/9/94/South_Hurghada.jpg/1280px-South_Hurghada.jpg`,
  },
  {
    slug: "wlochy",
    name: { pl: "Włochy", uk: "Італія", ru: "Италия", en: "Italy" },
    blurb: {
      pl: "Wenecja, wybrzeże Amalfi i toskańskie wzgórza — kuchnia warta każdego kilometra.",
      uk: "Венеція, узбережжя Амальфі та тосканські пагорби — кухня, варта кожного кілометра.",
      ru: "Венеция, побережье Амальфи и тосканские холмы — кухня, достойная каждого километра.",
      en: "Venice, the Amalfi Coast and Tuscan hills — food worth every kilometre.",
    },
    region: "europe",
    image: `${WIKI}/4/4f/Venezia_aerial_view.jpg/1280px-Venezia_aerial_view.jpg`,
  },
  {
    slug: "chorwacja",
    name: { pl: "Chorwacja", uk: "Хорватія", ru: "Хорватия", en: "Croatia" },
    blurb: {
      pl: "Mury Dubrownika, wyspy Dalmacji i żeglarskie wakacje bez długiego lotu.",
      uk: "Стіни Дубровника, острови Далмації та вітрильні канікули без довгого перельоту.",
      ru: "Стены Дубровника, острова Далмации и парусные каникулы без долгого перелёта.",
      en: "Dubrovnik's walls, the Dalmatian islands and sailing holidays with no long flight.",
    },
    region: "europe",
    image: `${WIKI}/6/67/The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg/1280px-The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg`,
  },
  {
    slug: "bulgaria",
    name: { pl: "Bułgaria", uk: "Болгарія", ru: "Болгария", en: "Bulgaria" },
    blurb: {
      pl: "Najlepszy stosunek ceny do jakości nad Morzem Czarnym — idealna na pierwszy wyjazd.",
      uk: "Найкраще співвідношення ціни та якості над Чорним морем — ідеально для першої поїздки.",
      ru: "Лучшее соотношение цены и качества на Чёрном море — идеально для первой поездки.",
      en: "The best value for money on the Black Sea — perfect for a first trip.",
    },
    region: "europe",
    image: `${WIKI}/c/cd/Sanny_beach._Foto_by_Victor_Belousov._-_panoramio_-_Victor_Belousov_%284%29.jpg/1280px-Sanny_beach._Foto_by_Victor_Belousov._-_panoramio_-_Victor_Belousov_%284%29.jpg`,
  },
  {
    slug: "cypr",
    name: { pl: "Cypr", uk: "Кіпр", ru: "Кипр", en: "Cyprus" },
    blurb: {
      pl: "Słoneczne zatoki Ayia Napa, winnice i grecko-turecka kuchnia przez cały rok.",
      uk: "Сонячні затоки Айя-Напи, виноградники та грецько-турецька кухня цілий рік.",
      ru: "Солнечные бухты Айя-Напы, виноградники и греко-турецкая кухня круглый год.",
      en: "Sunny bays in Ayia Napa, vineyards and Greek-Turkish food all year round.",
    },
    region: "europe",
    image: `${WIKI}/7/7c/View_of_Agia_Napa_beach_located_in_vicinity_of_Nelia_Beach_Hotel.jpg/1280px-View_of_Agia_Napa_beach_located_in_vicinity_of_Nelia_Beach_Hotel.jpg`,
  },
  {
    slug: "emiraty",
    name: { pl: "Emiraty Arabskie", uk: "Об'єднані Арабські Емірати", ru: "ОАЭ", en: "United Arab Emirates" },
    blurb: {
      pl: "Dubaj, Abu Zabi i piaszczyste wyspy — nowoczesny luksus w cztery godziny od Polski.",
      uk: "Дубай, Абу-Дабі та піщані острови — сучасна розкіш за чотири години від Польщі.",
      ru: "Дубай, Абу-Даби и песчаные острова — современная роскошь в четырёх часах от Польши.",
      en: "Dubai, Abu Dhabi and man-made islands — modern luxury four hours from Poland.",
    },
    region: "middle-east",
    image: `${WIKI}/3/30/Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg/1280px-Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg`,
  },
  {
    slug: "tajlandia",
    name: { pl: "Tajlandia", uk: "Таїланд", ru: "Таиланд", en: "Thailand" },
    blurb: {
      pl: "Phuket, tuk-tuki i uliczne jedzenie — klasyka Azji Południowo-Wschodniej.",
      uk: "Пхукет, тук-туки та вулична їжа — класика Південно-Східної Азії.",
      ru: "Пхукет, тук-туки и уличная еда — классика Юго-Восточной Азии.",
      en: "Phuket, tuk-tuks and street food — the Southeast Asia classic.",
    },
    region: "asia",
    image: `${WIKI}/6/60/Phuket_Aerial.jpg/1280px-Phuket_Aerial.jpg`,
  },
  {
    slug: "bali",
    name: { pl: "Bali", uk: "Балі", ru: "Бали", en: "Bali" },
    blurb: {
      pl: "Tarasy ryżowe Ubud, surf na południu i wille z basenem w cenie wakacji w Europie.",
      uk: "Рисові тераси Убуд, серфінг на півдні та вілли з басейном за ціною відпочинку в Європі.",
      ru: "Рисовые террасы Убуд, серфинг на юге и виллы с басейном по цене отдыха в Европе.",
      en: "Rice terraces in Ubud, surf on the south coast and pool villas for a European holiday price.",
    },
    region: "asia",
    image: `${WIKI}/5/5d/Ubud_%2849818456887%29.jpg/1280px-Ubud_%2849818456887%29.jpg`,
  },
  {
    slug: "maroko",
    name: { pl: "Maroko", uk: "Марокко", ru: "Марокко", en: "Morocco" },
    blurb: {
      pl: "Medyny Marrakeszu, Sahara i górskie szlaki Atlasu — Afryka blisko Europy.",
      uk: "Медіни Марракеша, Сахара та гірські стежки Атласу — Африка ближче до Європи.",
      ru: "Медины Марракеша, Сахара и горные тропы Атласа — Африка ближе к Европе.",
      en: "Marrakesh medinas, the Sahara and Atlas trails — Africa close to Europe.",
    },
    region: "africa",
    image: `${WIKI}/7/79/Djemaa_el_Fna.jpg/1280px-Djemaa_el_Fna.jpg`,
  },
  {
    slug: "malediwy",
    name: { pl: "Malediwy", uk: "Мальдіви", ru: "Мальдивы", en: "Maldives" },
    blurb: {
      pl: "Bungalowy nad wodą, rafy na wyciągnięcie ręki i najciszejsze wakacje na liście.",
      uk: "Бунгало над водою, рифи на відстані руки і найтихіші канікули в списку.",
      ru: "Бунгало над водой, рифы в минуте от номера и самые тихие каникулы в списке.",
      en: "Overwater bungalows, reefs at your doorstep and the quietest holiday on the list.",
    },
    region: "asia",
    image: `${WIKI}/8/83/Mal%C3%A9.jpg/1280px-Mal%C3%A9.jpg`,
  },
];

export const CITIES: Record<string, Localized> = {
  warszawa: { pl: "Warszawa", uk: "Варшава", ru: "Варшава", en: "Warsaw" },
  krakow: { pl: "Kraków", uk: "Краків", ru: "Краков", en: "Kraków" },
  katowice: { pl: "Katowice", uk: "Катовице", ru: "Катовице", en: "Katowice" },
  wroclaw: { pl: "Wrocław", uk: "Вроцлав", ru: "Вроцлав", en: "Wrocław" },
  gdansk: { pl: "Gdańsk", uk: "Гданськ", ru: "Гданьск", en: "Gdańsk" },
  poznan: { pl: "Poznań", uk: "Познань", ru: "Познань", en: "Poznań" },
  londyn: { pl: "Londyn", uk: "Лондон", ru: "Лондон", en: "London" },
  paryz: { pl: "Paryż", uk: "Париж", ru: "Париж", en: "Paris" },
  rzym: { pl: "Rzym", uk: "Рим", ru: "Рим", en: "Rome" },
  amsterdam: { pl: "Amsterdam", uk: "Амстердам", ru: "Амстердам", en: "Amsterdam" },
  "nowy-jork": { pl: "Nowy Jork", uk: "Нью-Йорк", ru: "Нью-Йорк", en: "New York" },
  barcelona: { pl: "Barcelona", uk: "Барселона", ru: "Барселона", en: "Barcelona" },
};

export const HERO_IMAGE = `${WIKI}/3/3d/Amalfi_Coast_%28Italy%2C_October_2020%29_-_75_%2850558355441%29.jpg/1920px-Amalfi_Coast_%28Italy%2C_October_2020%29_-_75_%2850558355441%29.jpg`;

export const CATEGORY_IMAGES: Record<"tours" | "flights" | "hotels" | "excursions", string> = {
  tours: `${WIKI}/b/b6/Tenerife%2C_Canary_Islands_ESA23970088.jpeg/1280px-Tenerife%2C_Canary_Islands_ESA23970088.jpeg`,
  flights: `${WIKI}/9/92/Lotnisko_Chopina_w_Warszawie_2018b.jpg/1280px-Lotnisko_Chopina_w_Warszawie_2018b.jpg`,
  hotels: `${WIKI}/0/04/Sopot_Molo_and_main_square_2024_aerial.jpg/1280px-Sopot_Molo_and_main_square_2024_aerial.jpg`,
  excursions: `${WIKI}/8/87/Wawel_%284%29.jpg/1280px-Wawel_%284%29.jpg`,
};

export function destinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export const IMAGE_CREDITS =
  "Wikimedia Commons / Wikipedia (licencje CC BY-SA i public domain)";
