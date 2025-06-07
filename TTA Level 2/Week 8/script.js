const products = [
  {
    name: "Laptop",
    price: "$899",
    image: ""
  },
  {
    name: "Headphones",
    price: "$199",
    image: "https://via.placeholder.com/200x150?text=Headphones"
  },
  {
    name: "Camera",
    price: "$599",
    image: "C:\Users\mario\OneDrive\Desktop\TTA\TTA Level 2\Week 8\Images\digital-photography.jpg"
  }
];

let cartCount = 0;

const cartCounter = document.getElementById("cart-count");
const productList = document.getElementById("product-list");

products.forEach(product => {
  const productDiv = document.createElement("div");
  productDiv.className = "product";

  productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Price: ${product.price}</p>
    <button>Add to Cart</button>
  `;

  productDiv.querySelector("button").addEventListener("click", () => {
    cartCount++;
    cartCounter.textContent = cartCount;
  });

  productList.appendChild(productDiv);
});
