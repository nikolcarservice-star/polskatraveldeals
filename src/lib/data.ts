export type RegionKey = "europe" | "asia" | "africa" | "middle-east";

export const REGIONS: { key: RegionKey; label: string }[] = [
  { key: "europe", label: "Europa" },
  { key: "asia", label: "Azja" },
  { key: "africa", label: "Afryka" },
  { key: "middle-east", label: "Bliski Wschód" },
];

const WIKI = "https://thumb.wikimedia.org/wikipedia/commons/thumb";

export interface Destination {
  slug: string;
  name: string;
  blurb: string;
  region: RegionKey;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "grecja",
    name: "Grecja",
    blurb:
      "Białe domy, turkusowe morze i wyspy, na których dzień zaczyna się od śniadania nad wodą.",
    region: "europe",
    image: `${WIKI}/e/e2/Zakintos_-_panorama.jpg/1280px-Zakintos_-_panorama.jpg`,
  },
  {
    slug: "hiszpania",
    name: "Hiszpania",
    blurb: "Katalońskie tarasy, andaluzyjskie plaza i długie plaże Costa del Sol.",
    region: "europe",
    image: `${WIKI}/a/a6/Evening_light_over_Barcelona.jpg/1280px-Evening_light_over_Barcelona.jpg`,
  },
  {
    slug: "turcja",
    name: "Turcja",
    blurb:
      "Riwiera turecka z hotelami all inclusive i wycieczki do Kapadocji balonem o świcie.",
    region: "europe",
    image: `${WIKI}/5/59/Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg/1280px-Cappadocia_balloon_trip%2C_Ortahisar_Castle_%2811893715185%29.jpg`,
  },
  {
    slug: "egipt",
    name: "Egipt",
    blurb: "Morze Czerwone, rafy koralowe i luksus w Hurghadzie oraz Sharm el-Sheikh.",
    region: "africa",
    image: `${WIKI}/9/94/South_Hurghada.jpg/1280px-South_Hurghada.jpg`,
  },
  {
    slug: "wlochy",
    name: "Włochy",
    blurb:
      "Wenecja, wybrzeże Amalfi i toskańskie wzgórza — kuchnia warta każdego kilometra.",
    region: "europe",
    image: `${WIKI}/4/4f/Venezia_aerial_view.jpg/1280px-Venezia_aerial_view.jpg`,
  },
  {
    slug: "chorwacja",
    name: "Chorwacja",
    blurb:
      "Mury Dubrownika, wyspy Dalmacji i żeglarskie wakacje bez długiego lotu.",
    region: "europe",
    image: `${WIKI}/6/67/The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg/1280px-The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg`,
  },
  {
    slug: "bulgaria",
    name: "Bułgaria",
    blurb:
      "Najlepszy stosunek ceny do jakości nad Morzem Czarnym — idealna na pierwszy wyjazd.",
    region: "europe",
    image: `${WIKI}/c/cd/Sanny_beach._Foto_by_Victor_Belousov._-_panoramio_-_Victor_Belousov_%284%29.jpg/1280px-Sanny_beach._Foto_by_Victor_Belousov._-_panoramio_-_Victor_Belousov_%284%29.jpg`,
  },
  {
    slug: "cypr",
    name: "Cypr",
    blurb:
      "Słoneczne zatoki Ayia Napa, winnice i grecko-turecka kuchnia przez cały rok.",
    region: "europe",
    image: `${WIKI}/7/7c/View_of_Agia_Napa_beach_located_in_vicinity_of_Nelia_Beach_Hotel.jpg/1280px-View_of_Agia_Napa_beach_located_in_vicinity_of_Nelia_Beach_Hotel.jpg`,
  },
  {
    slug: "emiraty",
    name: "Emiraty Arabskie",
    blurb:
      "Dubaj, Abu Zabi i piaszczyste wyspy — nowoczesny luksus w cztery godziny od Polski.",
    region: "middle-east",
    image: `${WIKI}/3/30/Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg/1280px-Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg`,
  },
  {
    slug: "tajlandia",
    name: "Tajlandia",
    blurb:
      "Phuket, tuk-tuki i uliczne jedzenie — klasyka Azji Południowo-Wschodniej.",
    region: "asia",
    image: `${WIKI}/6/60/Phuket_Aerial.jpg/1280px-Phuket_Aerial.jpg`,
  },
  {
    slug: "bali",
    name: "Bali",
    blurb:
      "Tarasy ryżowe Ubud, surf na południu i wille z basenem w cenie wakacji w Europie.",
    region: "asia",
    image: `${WIKI}/5/5d/Ubud_%2849818456887%29.jpg/1280px-Ubud_%2849818456887%29.jpg`,
  },
  {
    slug: "maroko",
    name: "Maroko",
    blurb:
      "Medyny Marrakeszu, Sahara i górskie szlaki Atlasu — Afryka blisko Europy.",
    region: "africa",
    image: `${WIKI}/7/79/Djemaa_el_Fna.jpg/1280px-Djemaa_el_Fna.jpg`,
  },
  {
    slug: "malediwy",
    name: "Malediwy",
    blurb:
      "Bungalowy nad wodą, rafy na wyciągnięcie ręki i najciszejsze wakacje na liście.",
    region: "asia",
    image: `${WIKI}/8/83/Mal%C3%A9.jpg/1280px-Mal%C3%A9.jpg`,
  },
];

export const CITIES: Record<string, string> = {
  warszawa: "Warszawa",
  krakow: "Kraków",
  katowice: "Katowice",
  wroclaw: "Wrocław",
  gdansk: "Gdańsk",
  poznan: "Poznań",
  londyn: "Londyn",
  paryz: "Paryż",
  rzym: "Rzym",
  amsterdam: "Amsterdam",
  "nowy-jork": "Nowy Jork",
  barcelona: "Barcelona",
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
