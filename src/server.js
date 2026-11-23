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

});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});

