import express from "express";
import db from "./db.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));



// Hämtar alla produkter från databasen
app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();

    res.json(products);
});


// Tar emot en ny produkt
app.post("/api/products", (req, res) => {

    const { name, price, sku, description } = req.body;
    console.log(name, price, sku, description);



// Kontrollerar produktnamnet
if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
        error: "Produktnamn saknas"
    });
}

// Kontrollerar SKU
if (typeof sku !== "string" || !sku.trim()) {
    return res.status(400).json({
        error: "SKU saknas"
    });
}

// Kontrollerar beskrivningen
if (typeof description !== "string" || !description.trim()) {
    return res.status(400).json({
        error: "Beskrivning saknas"
    });
}

// Kontrollerar priset
if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return res.status(400).json({
        error: "Ogiltigt pris"
    });
}

// Sparar produkten i databasen
const result = db.prepare(
    "INSERT INTO products (name, price, sku, description) VALUES (?, ?, ?, ?)"
).run(name, price, sku, description);

// Skickar tillbaka den nya produkten
res.status(201).json({
    id: Number(result.lastInsertRowid),
    name,
    price,
    sku,
    description
});
});



// Uppdaterar en produkt
app.put("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, price, sku, description } = req.body;

    // Kontrollerar produktens ID
if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
        error: "Ogiltigt produkt-ID"
    });
}

// Kontrollerar produktuppgifterna
if (
    typeof name !== "string" || !name.trim() ||
    typeof sku !== "string" || !sku.trim() ||
    typeof description !== "string" || !description.trim() ||
    typeof price !== "number" || !Number.isFinite(price) || price <= 0
) {
    return res.status(400).json({
        error: "Ogiltiga produktuppgifter"
    });
}

// Uppdaterar produkten i databasen
const result = db.prepare(
    "UPDATE products SET name = ?, price = ?, sku = ?, description = ? WHERE id = ?"
).run(name, price, sku, description, id);

// Kontrollerar om produkten finns
if (result.changes === 0) {
    return res.status(404).json({
        error: "Produkten hittades inte"
    });
}

// Skickar tillbaka den uppdaterade produkten
res.status(200).json({
    id,
    name,
    price,
    sku,
    description
});
});






app.listen(3000, () => {
    console.log("Server running on port 3000");
});

