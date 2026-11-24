
const form = document.querySelector("form");

// Hämtar tabellens tbody från HTML
const tableBody = document.querySelector("#productTableBody");


// Skapar en ny rad i produkttabellen
function laggTillRad(product) {
    const row = document.createElement("tr");

// Skapar en cell för produktnamnet
const nameCell = document.createElement("td");
nameCell.textContent = product.name;
row.appendChild(nameCell);

// Skapar en cell för SKU
const skuCell = document.createElement("td");
skuCell.textContent = product.sku;
row.appendChild(skuCell);

// Skapar en cell för priset
const priceCell = document.createElement("td");
priceCell.textContent = product.price;
row.appendChild(priceCell);

// Lägger till raden i tabellen
tableBody.appendChild(row);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const product = {
        name: formData.get("productName"),
        price: Number(formData.get("price")),
        sku: formData.get("sku"),
        description: formData.get("description")
    };

    console.log(product);


// Skickar produkten till backend
const response = await fetch("/api/products", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
});

// Kontrollerar om produkten har skapats
if (response.status === 201) {
    const newProduct = await response.json();

    laggTillRad(newProduct);
    form.reset();
}

});


// Hämtar alla produkter från backend med fetch
async function loadProducts() {
    const response = await fetch("/api/products");
    const products = await response.json();


// Visar alla produkter i tabellen
tableBody.replaceChildren();

products.forEach((product) => {
    laggTillRad(product);
});
}

// Hämtar produkterna när sidan laddas
loadProducts();