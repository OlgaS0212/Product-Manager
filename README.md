# Product Manager

En webbapplikation för att hantera produkter.

## Tekniker

- HTML
- CSS
- JavaScript
- Node.js
- Express
- SQLite

## Funktioner

- Visa produkter från databasen.
- Lägga till nya produkter.
- Ta bort produkter.
- Uppdatera produkter via API.
- Validera produktuppgifter.
- Visa felmeddelanden vid misslyckade API-anrop.

## Installation

1. Installera Node.js om det inte redan finns.
2. Öppna projektmappen i terminalen.
3. Installera projektets beroenden:

   `npm install`

## Starta applikationen

Starta servern med:

`npm start`

Öppna sedan följande adress i webbläsaren:

`http://localhost:3000`

## Databas

Applikationen använder SQLite för att lagra produkter.

Databasens tabellstruktur finns i `database/schema.sql`.

## API

- `GET /api/products` – Hämta alla produkter.
- `POST /api/products` – Lägg till en produkt.
- `PUT /api/products/:id` – Uppdatera en produkt.
- `DELETE /api/products/:id` – Ta bort en produkt.
