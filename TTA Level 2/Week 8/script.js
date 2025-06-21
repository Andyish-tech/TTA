const products = [
  {
    name: "Laptop",
    price: "$899",
    image: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg?auto=webp&quality=75&width=980&dpr=2"
  },
  {
    name: "Headphones",
    price: "$199",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQTP3?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=MVJhVmI0YmhYQVJ5Y0VDdzF1YWp3MmorYzFkTG5HaE9wejd5WUxYZjRMOHoveDdpQVpwS0ltY2w2UW05aU90TzVtaW9peGdOaitwV1Nxb1VublZoTVE"
  },
  {
  name: "Camera",
  price: "$599",
  image: "https://www.dpreview.com/files/p/articles/6269402639/canon_eosr8.jpeg"
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
