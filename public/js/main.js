
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

// Skapar en knapp för att ta bort produkten
const deleteCell = document.createElement("td");
const deleteButton = document.createElement("button");
deleteButton.textContent = "🗑︎";

// Lyssnar på klick på raderingsknappen
deleteButton.addEventListener("click", async () => {
    console.log("Ta bort produkt:", product.id);
try {

// Skickar en DELETE-begäran till backend
const response = await fetch(`/api/products/${product.id}`, {
    method: "DELETE"

});
// Tar bort raden när produkten har raderats
if (response.status === 204) {
    row.remove();
}else {
    alert("Det gick inte att ta bort produkten.");
}
} catch (error) {
    alert("Kunde inte ansluta till servern.");
}
});

deleteCell.appendChild(deleteButton);
row.appendChild(deleteCell);

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

try {
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
} else {
    alert("Det gick inte att lägga till produkten.");
}
} catch (error) {
    alert("Kunde inte ansluta till servern.");
}

});


// Hämtar alla produkter från backend med fetch
async function loadProducts() {
    try {
    const response = await fetch("/api/products");

// Kontrollerar om begäran lyckades
if (!response.ok) {
    throw new Error("Kunde inte hämta produkterna");
}

    const products = await response.json();


// Visar alla produkter i tabellen
tableBody.replaceChildren();

products.forEach((product) => {
    laggTillRad(product);
});
} catch (error) {
    alert("Kunde inte hämta produkterna.");
}
}

// Hämtar produkterna när sidan laddas
loadProducts();


//setInterval(loadProducts, 3000);
