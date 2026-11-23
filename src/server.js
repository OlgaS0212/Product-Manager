import express from "express";
import db from "./db.js";

const app = express();

app.use(express.static("public"));



// Hämtar alla produkter från databasen
app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();

    res.json(products);
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});

