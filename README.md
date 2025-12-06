# Aplikacja Pogodowa 🌤️

Aplikacja webowa do wyświetlania informacji pogodowych dla stolic województw w Polsce. Zbudowana z React, Redux i React Router.

## ✨ Funkcjonalności

- **Wyświetlanie pogody dla 16 stolic województw** - Warszawa, Kraków, Gdańsk, Wrocław, Poznań, Bydgoszcz, Lublin, Zielona Góra, Łódź, Opole, Rzeszów, Białystok, Katowice, Kielce, Olsztyn, Szczecin
- **Szczegółowe informacje pogodowe**:
  - Temperatura (z możliwością przełączania między °C i °F)
  - Warunki pogodowe
  - Prędkość i kierunek wiatru
  - Zachmurzenie
  - Prawdopodobieństwo opadów, rodzaj i ilość opadów
  - 5-dniowa prognoza pogody
- **Ulubione miasta** - oznaczanie miast jako ulubione za pomocą ikony serca
- **Filtrowanie i sortowanie** - wyszukiwanie miast, filtrowanie po warunkach pogodowych, sortowanie po nazwie lub temperaturze
- **Statystyki** - najcieplejsze i najzimniejsze miasto, średnia temperatura
- **Przełączanie jednostek temperatury** - globalne przełączanie między Celsius a Fahrenheit
- **Zachowanie ustawień** - ulubione miasta i wybrana jednostka temperatury są zapisywane w localStorage

## 🛠️ Technologie

- **React 19** - biblioteka do budowy interfejsu użytkownika
- **Redux Toolkit** - zarządzanie globalnym stanem aplikacji (temperatura, ulubione miasta)
- **React Router** - nawigacja między podstronami
- **React Router DOM** - routing w aplikacji
- **Vite** - narzędzie do budowania i rozwoju aplikacji
- **localStorage** - przechowywanie ustawień użytkownika w przeglądarce

## 📦 Instalacja

1. Sklonuj repozytorium:
```bash
git clone <url-repozytorium>
cd weather-app
```

2. Zainstaluj zależności:
```bash
npm install
```

## 🚀 Uruchomienie

### Tryb deweloperski
```bash
npm run dev
```
Aplikacja będzie dostępna pod adresem `http://localhost:5173`

### Budowanie produkcyjne
```bash
npm run build
```

### Podgląd zbudowanej aplikacji
```bash
npm run preview
```

## 📁 Struktura projektu

```
src/
├── components/          # Komponenty reużywalne
│   ├── WeatherCard.jsx      # Karta pogodowa miasta
│   ├── weatherDetails.jsx   # Szczegóły pogody
│   └── CityDetailPage.jsx   # Strona szczegółów miasta
├── store/               # Redux store
│   ├── store.js              # Konfiguracja Redux store
│   ├── temperatureSlice.js   # Slice dla jednostki temperatury
│   └── favoritesSlice.js     # Slice dla ulubionych miast
├── hooks/               # Custom hooks
│   ├── useTemperature.js    # Hook do zarządzania temperaturą
│   └── useFavorites.js      # Hook do zarządzania ulubionymi
├── HomePage.jsx         # Strona główna
├── FavoritesPage.jsx    # Strona ulubionych miast
├── App.jsx              # Główny komponent aplikacji
└── weatherdata.jsx      # Dane pogodowe miast
```

## 🎯 Główne funkcjonalności techniczne

### Redux Store
- **temperatureSlice** - zarządza jednostką temperatury (C/F) z automatycznym zapisem do localStorage
- **favoritesSlice** - zarządza listą ulubionych miast z automatycznym zapisem do localStorage

### React Hooks
- **useState** - zarządzanie stanem lokalnym komponentów
- **useReducer** - zarządzanie widokiem szczegółowym miasta
- **useEffect** - efekty uboczne (ładowanie danych, localStorage)
- **useMemo** - optymalizacja obliczeń (filtrowanie, sortowanie, statystyki)
- **useCallback** - optymalizacja funkcji callback

### React Router
- `/` - strona główna z listą wszystkich miast
- `/miasto/:cityId` - szczegóły wybranego miasta
- `/ulubione` - lista ulubionych miast

## 💾 Przechowywanie danych

Aplikacja wykorzystuje **localStorage** przeglądarki do przechowywania:
- `temperatureUnit` - wybrana jednostka temperatury ('C' lub 'F')
- `favoriteCities` - tablica ID ulubionych miast

Dane są automatycznie przywracane po odświeżeniu strony.

## 📝 Licencja

Ten projekt jest projektem edukacyjnym.
