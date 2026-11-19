
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const product = {
        name: formData.get("productName"),
        price: Number(formData.get("price")),
        sku: formData.get("sku"),
        description: formData.get("description")
    };

    console.log(product);
});
