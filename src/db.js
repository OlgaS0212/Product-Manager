import fs from "node:fs";

import Database from "better-sqlite3";

// Öppnar databasen
const db = new Database("database/products.db");


// Läser SQL-koden från schema.sql
const schema = fs.readFileSync("database/schema.sql", "utf8");


// Skapar tabellen om den inte finns
db.exec(schema);


//Databasen tillgänglig för andra filer
export default db;