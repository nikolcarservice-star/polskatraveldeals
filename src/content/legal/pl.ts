import type { LegalDoc, LegalSlug } from "./types";

export const legalPl: Record<LegalSlug, LegalDoc> = {
  regulamin: {
    slug: "regulamin",
    updated: "15 października 2026",
    intro:
      "Regulamin określa zasady korzystania z serwisu POLSKA TRAVEL DEALS, w tym z wyszukiwarki i porównywarki ofert podróżniczych.",
    sections: [
      {
        id: "postanowienia-ogolne",
        heading: "1. Postanowienia ogólne",
        paragraphs: [
          "Właścicielem serwisu jest Polska Travel Deals, działający pod adresem polskatraveldeals.vercel.app. Korzystanie z serwisu jest dobrowolne i oznacza akceptację niniejszego regulaminu.",
          "Serwis ma charakter informacyjny i porównawczy. Nie jesteśmy organizatorem turystyki ani pośrednikiem w rozumieniu ustawy o imprezach turystycznych i powiązanych usługach turystycznych.",
        ],
      },
      {
        id: "uslugi",
        heading: "2. Zakres usług",
        paragraphs: [
          "Udostępniamy wyszukiwarkę i porównywarkę ofert wycieczek, przelotów, hoteli oraz atrakcji, pochodzących od partnerów zewnętrznych. Prezentujemy ceny, terminy i warunki w celach orientacyjnych.",
          "Zakres bezpłatnych funkcji może ulec zmianie. Nie wymagamy rejestracji, aby przeglądać i porównywać oferty.",
        ],
      },
      {
        id: "rezerwacje",
        heading: "3. Rezerwacje i płatności",
        paragraphs: [
          "Rezerwacji oraz płatności dokonujesz bezpośrednio u partnera, do którego prowadzi link oferty. Z tym partnerem łączy Cię umowa, a jego regulamin i polityka anulowania mają zastosowanie.",
          "POLSKA TRAVEL DEALS nie pośredniczy w zawieraniu umów ani w rozliczeniach i nie przyjmuje płatności za oferty prezentowane w serwisie.",
        ],
      },
      {
        id: "ceny",
        heading: "4. Ceny i dostępność",
        paragraphs: [
          "Ceny i dostępność pochodzą od partnerów i mogą zmieniać się w czasie rzeczywistym. Ostateczne potwierdzenie ceny i warunków otrzymujesz od organizatora lub przewoźnika.",
          "Zastrzegamy sobie prawo do korekty prezentowanych danych, gdy partner przekaże nam zaktualizowane informacje.",
        ],
      },
      {
        id: "afiliacja",
        heading: "5. Linki afiliacyjne",
        paragraphs: [
          "Część linków w serwisie to linki afiliacyjne. Możemy otrzymać prowizję od partnera, jeśli dokonasz rezerwacji przez taki link. Nie wpływa to na Twoją cenę ani na warunki rezerwacji.",
          "Szczegóły znajdziesz w dokumencie „Ujawnienie afiliacyjne”.",
        ],
      },
      {
        id: "odpowiedzialnosc",
        heading: "6. Odpowiedzialność",
        paragraphs: [
          "Dokładamy starań, aby dane w serwisie były aktualne, jednak nie gwarantujemy ich kompletności ani dostępności ofert u partnerów. Odpowiedzialność za treść ofert ponosi partner.",
          "Nie odpowiadamy za treści i zasady stron zewnętrznych, do których prowadzą linki partnerów.",
        ],
      },
      {
        id: "reklamacje",
        heading: "7. Reklamacje i spory",
        paragraphs: [
          "Reklamacje dotyczące serwisu możesz zgłosić na adres kontakt@polskatraveldeals.vercel.app. Odpowiadamy w ciągu 14 dni.",
          "W sprawach związanych z rezerwacją kontaktuj się bezpośrednio z partnerem, u którego złożyłeś rezerwację. Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji.",
        ],
      },
      {
        id: "zmiany",
        heading: "8. Zmiany regulaminu",
        paragraphs: [
          "Regulamin może być aktualizowany. Nowa wersja obowiązuje od daty publikacji wraz ze zaktualizowaną datą „Ostatnia aktualizacja”.",
        ],
      },
    ],
  },

  "polityka-prywatnosci": {
    slug: "polityka-prywatnosci",
    updated: "15 października 2026",
    intro:
      "Ta polityka wyjaśnia, jakie dane przetwarzamy, po co to robimy i jakie prawa Ci przysługują zgodnie z RODO.",
    sections: [
      {
        id: "administrator",
        heading: "1. Administrator danych",
        paragraphs: [
          "Administratorem danych osobowych jest Polska Travel Deals. Kontakt w sprawach danych osobowych: rodo@polskatraveldeals.vercel.app.",
        ],
      },
      {
        id: "zakres",
        heading: "2. Zakres i cele przetwarzania",
        paragraphs: [
          "Przetwarzamy dane, które nam dobrowolnie podajesz: adres e-mail w formularzu newslettera oraz imię, e-mail, temat i treść wiadomości w formularzu kontaktowym.",
          "Dane techniczne (adres IP, typ przeglądarki, czas wizyty) przetwarzamy w celu bezpieczeństwa i prawidłowego działania serwisu, na podstawie uzasadnionego interesu administratora.",
          "Nie podejmujemy decyzji wywołujących skutki prawne w sposób zautomatyzowany i nie prowadzimy profilowania.",
        ],
      },
      {
        id: "podstawy",
        heading: "3. Podstawy prawne",
        paragraphs: [
          "Zgoda — dla newslettera; uzasadniony interes — dla bezpieczeństwa serwisu i odpowiedzi na zapytania; wykonanie umowy lub prawny obowiązek — gdy jest to niezbędne.",
        ],
      },
      {
        id: "odbiorcy",
        heading: "4. Odbiorcy danych",
        paragraphs: [
          "Korzystamy z dostawców technicznych: hostingu (Vercel) oraz dostawcy poczty e-mail, wyłącznie w zakresie niezbędnym do obsługi serwisu.",
          "Twoje dane mogą zostać przekazane partnerowi rezerwacyjnemu wyłącznie, gdy samodzielnie przechodzisz do jego serwisu i tam je podajesz — wtedy administratorem jest partner.",
        ],
      },
      {
        id: "przechowywanie",
        heading: "5. Czas przechowywania",
        paragraphs: [
          "Dane z formularza kontaktowego przechowujemy do czasu udzielenia odpowiedzi, nie dłużej niż 12 miesięcy. Dane newslettera — do wypisania się. Dane techniczne — zgodnie z wymogami bezpieczeństwa hostingu.",
        ],
      },
      {
        id: "prawa",
        heading: "6. Twoje prawa",
        paragraphs: [
          "Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie.",
          "Zgody możesz cofnąć w każdej chwili, nie wpływa to na zgodność przetwarzania przed jej cofnięciem. Przysługuje Ci prawo wniesienia skargi do Prezesa UODO.",
        ],
      },
      {
        id: "newsletter",
        heading: "7. Newsletter",
        paragraphs: [
          "Zapis do newslettera potwierdzasz kliknięciem w link w wiadomości potwierdzającej. W każdej chwili możesz wypisać się jednym kliknięciem, korzystając z linku rezygnacji w wiadomości.",
        ],
      },
      {
        id: "bezpieczenstwo",
        heading: "8. Bezpieczeństwo",
        paragraphs: [
          "Stosujemy organizacyjne i techniczne środki ochrony: szyfrowanie HTTPS, ograniczenie dostępu oraz minimalizację zbieranych danych.",
        ],
      },
      {
        id: "zmiany",
        heading: "9. Zmiany polityki",
        paragraphs: [
          "Polityka może być aktualizowana. Data ostatniej zmiany znajduje się na górze strony.",
        ],
      },
    ],
  },

  "polityka-cookies": {
    slug: "polityka-cookies",
    updated: "15 października 2026",
    intro:
      "Informacja o plikach cookies wykorzystywanych w serwisie oraz o tym, jak nimi zarządzać.",
    sections: [
      {
        id: "czym-sa",
        heading: "1. Czym są pliki cookies",
        paragraphs: [
          "Cookies to niewielkie pliki tekstowe zapisywane na Twoim urządzeniu podczas odwiedzin na stronie. Pozwalają stronie zapamiętać ustawienia i działać poprawnie.",
        ],
      },
      {
        id: "rodzaje",
        heading: "2. Jakie cookies stosujemy",
        paragraphs: [
          "Niezbędne — utrzymują sesję i bezpieczeństwo; bez nich serwis nie działa. Preferencyjne — zapamiętują wybrany język (ciasteczko ptd-locale). Funkcjonalne — zapamiętują zgodę wyrażoną w banerze cookies.",
          "Analityczne narzędzia mogą zostać uruchomione wyłącznie po wyrażeniu zgody. Partnerzy, do których przechodzisz, stosują własne cookies zgodnie ze swoimi politykami.",
        ],
      },
      {
        id: "zarzadzanie",
        heading: "3. Zarządzanie cookies",
        paragraphs: [
          "Możesz usunąć lub zablokować cookies w ustawieniach swojej przeglądarki. Ograniczenie cookies niezbędnych może spowodować, że niektóre funkcje serwisu przestaną działać.",
        ],
      },
      {
        id: "podmioty-trzecie",
        heading: "4. Linki zewnętrzne",
        paragraphs: [
          "Po kliknięciu oferty przechodzisz do strony partnera. Za cookies ustawiane poza naszym serwisem odpowiada ten partner.",
        ],
      },
      {
        id: "okres",
        heading: "5. Okres przechowywania",
        paragraphs: [
          "Cookies sesyjne wygasają po zamknięciu przeglądarki. Cookies preferencyjne przechowujemy do 12 miesięcy lub do ich usunięcia.",
        ],
      },
      {
        id: "kontakt",
        heading: "6. Kontakt",
        paragraphs: [
          "Pytania dotyczące cookies prześlij na adres kontakt@polskatraveldeals.vercel.app.",
        ],
      },
    ],
  },

  "ujawnienie-afiliacyjne": {
    slug: "ujawnienie-afiliacyjne",
    updated: "15 października 2026",
    intro:
      "Uczciwie wyjaśniamy, jak działa nasz model przychodów i dlaczego część linków jest oznaczona.",
    sections: [
      {
        id: "czym-sa-linki",
        heading: "1. Czym są linki afiliacyjne",
        paragraphs: [
          "Link afiliacyjny to link do strony partnera, po którym nasz serwis może zostać oznaczony jako źródło odwiedzin. Jeśli w wyniku takiego przejścia dokonasz rezerwacji, możemy otrzymać prowizję.",
        ],
      },
      {
        id: "jak-zarabiamy",
        heading: "2. Jak zarabiamy",
        paragraphs: [
          "Współpracujemy z programami partnerskimi, m.in. Travelpayouts (Viator, GetTransfer, Aviasales, Hotellook i inne), Klook oraz Booking.com. Prowizja pochodzi od partnera.",
        ],
      },
      {
        id: "cena",
        heading: "3. Cena dla Ciebie",
        paragraphs: [
          "Korzystanie z serwisu jest bezpłatne. Prowizja nie podwyższa ceny oferty — płacisz tyle, ile wynika z oferty partnera.",
        ],
      },
      {
        id: "oznaczenia",
        heading: "4. Oznaczenia",
        paragraphs: [
          "Przy kartach ofert umieszczamy oznaczenie „Link afiliacyjny”. Pełną informację znajdziesz w tej polityce oraz w stopce serwisu.",
        ],
      },
      {
        id: "wplyw",
        heading: "5. Wpływ na sortowanie",
        paragraphs: [
          "Prowizja partnera nie decyduje o kolejności wyników. Sortowanie zależy od wybranych przez Ciebie filtrów, ceny, ocen i popularności ofert.",
        ],
      },
    ],
  },

  "nota-prawna": {
    slug: "nota-prawna",
    updated: "15 października 2026",
    intro: "Nota prawna: operator serwisu, sposób kontaktu oraz źródła treści.",
    sections: [
      {
        id: "operator",
        heading: "1. Operator serwisu",
        paragraphs: [
          "POLSKA TRAVEL DEALS — Polska Travel Deals. Domena: polskatraveldeals.vercel.app. Adres e-mail dla korespondencji: kontakt@polskatraveldeals.vercel.app.",
          "Serwis nie jest biurem podróży ani organizatorem imprez turystycznych i nie sprzedaje samodzielnie usług turystycznych.",
        ],
      },
      {
        id: "kontakt",
        heading: "2. Kontakt",
        paragraphs: [
          "Sprawy ogólne: kontakt@polskatraveldeals.vercel.app. Sprawy techniczne: pomoc@polskatraveldeals.vercel.app. Dane osobowe: rodo@polskatraveldeals.vercel.app.",
        ],
      },
      {
        id: "tresci",
        heading: "3. Treści i licencje",
        paragraphs: [
          "Teksty serwisu stanowią nasze treści oryginalne. Zdjęcia pochodzą z Wikimedia Commons na licencjach CC BY-SA oraz w domenie publicznej; źródła są zgodne z wymaganiami licencji.",
        ],
      },
      {
        id: "wlasnosc",
        heading: "4. Własność intelektualna",
        paragraphs: [
          "Nazwa POLSKA TRAVEL DEALS, identyfikacja wizualna i układ serwisu należą do jego operatora. Znaki towarowe partnerów pozostają ich własnością.",
        ],
      },
    ],
  },
};
