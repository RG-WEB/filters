const productContainer = document.querySelector(".products-container");

const btnContainer = document.querySelector(".companies");

import { products } from "./utils/products.js";

let filteredProducts = [...products];

function displayProducts(articles) {
  if (!filteredProducts.length) {
    productContainer.innerHTML = `<h6>Désolé, aucun produit ne correspond à votre recherche</h6>`;
    return;
  }

  const newArticles = articles.map(function (item) {
    const { title, company, image, price } = item;

    return `
          <article class="product">
          <img src="${image}" class="product-img img" alt="" />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}</span>
          </footer>
        </article>
        `;
  });
  productContainer.innerHTML = newArticles.join("");
}

displayProducts(filteredProducts);

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value.toLowerCase();

  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });

  displayProducts(filteredProducts);
});

const displayButtons = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];
  btnContainer.innerHTML = buttons
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join("");
};

displayButtons();

btnContainer.addEventListener("click", (e) => {
  const btnTarget = e.target;

  if (btnTarget.textContent.toLowerCase() === "all") {
    displayProducts(products);
  } else {
    filteredProducts = products.filter((filter) => {
      return filter.company === btnTarget.textContent.toLowerCase();
    });
    displayProducts(filteredProducts);
  }
});
