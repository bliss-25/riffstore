/* ===============================
SEARCH BAR (SAFE)
================================ */

const searchBox = document.getElementById("searchBox");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("searchInput");

// Only works if toggle mode exists
if (searchIcon && searchBox) {

  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active") && searchInput) {
      searchInput.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target)) {
      searchBox.classList.remove("active");
    }
  });
}

/* ===============================
GLOBAL VARIABLES
================================ */

const grid = document.querySelector(".product-grid");

/* SAFE PRODUCTS */
let filteredProducts = typeof products !== "undefined" ? products : [];

/* ===============================
CATEGORY FILTER
================================ */

if (grid) {

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    filteredProducts = filteredProducts.filter(
      p => p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  renderProducts(filteredProducts);

  /* SEARCH FILTER */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      const searchFiltered = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(value)
      );

      renderProducts(searchFiltered);
    });
  }
}

/* ===============================
RENDER PRODUCTS
================================ */

function renderProducts(list) {

  if (!grid) return;

  grid.innerHTML = "";

  let html = "";

  list.forEach(product => {

    html += `
    <div class="product-card" onclick="openProduct(${product.id})">

      ${product.offer ? `<div class="offer-tag">${product.offer}</div>` : ""}

      <div class="wishlist" data-id="${product.id}">
        <i class="fa-regular fa-heart"></i>
      </div>

      <div class="product-img">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">

        <h3>${product.name}</h3>

        <p class="price">${product.price}</p>

        <p class="rating">${product.rating || ""}</p>

        <p class="delivery">${product.delivery || ""}</p>

        <div class="colors">
          ${(product.colors || []).map(color => `<span class="${color}"></span>`).join("")}
        </div>

        <p class="desc">${product.desc || ""}</p>

        <button class="cart-btn" data-id="${product.id}">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>

      </div>
    </div>
    `;
  });

  grid.innerHTML = html;

  activateUI();
}

/* ===============================
ACTIVATE UI
================================ */

function activateUI() {

  /* COLOR SELECT */
  document.querySelectorAll(".colors").forEach(group => {
    const colors = group.querySelectorAll("span");

    colors.forEach(color => {
      color.addEventListener("click", function (e) {
        e.stopPropagation();
        colors.forEach(c => c.classList.remove("active"));
        this.classList.add("active");
      });
    });
  });

  /* ===============================
  WISHLIST
  ============================== */

  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

  document.querySelectorAll(".wishlist").forEach((heart) => {

    const id = parseInt(heart.dataset.id);
    const icon = heart.querySelector("i");

    // Restore state
    if (wishlistData.find(item => item.id === id)) {
      heart.classList.add("active");
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    }

    heart.addEventListener("click", (e) => {

      e.stopPropagation();

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = wishlist.find(item => item.id === id);
      const product = products.find(p => p.id === id);

      if (exists) {
        wishlist = wishlist.filter(item => item.id !== id);

        heart.classList.remove("active");
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

      } else {
        wishlist.push(product);

        heart.classList.add("active");
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      updateWishlistCount();
    });

  });

  /* ===============================
  ADD TO CART
  ============================== */

  document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", function (e) {

      e.stopPropagation();

      const id = parseInt(this.dataset.id);

      addToCart(e, id);

      this.classList.add("added");
      this.innerHTML = "✔ Added";

      setTimeout(() => {
        this.classList.remove("added");
        this.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
      }, 1200);

    });

  });
}

/* ===============================
OPEN PRODUCT
================================ */

function openProduct(id) {

  if (!id) {
    console.error("❌ Product ID missing:", id);
    return;
  }

  window.location.href = "product.html?id=" + id;
}

/* ===============================
ADD TO CART
================================ */

function addToCart(event, id) {

  event.stopPropagation();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {

    const product = products.find(p => p.id === id);

    if (!product) {
      console.error("Product not found", id);
      return;
    }

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}

/* ===============================
COUNTERS
================================ */

function updateCartCount() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = cart.reduce((sum, item) => sum + Number(item.qty), 0);

  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.innerText = count;
  }
}

function updateWishlistCount() {

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const countEl = document.getElementById("wishlistCount");

  if (countEl) {
    countEl.innerText = wishlist.length;
  }
}

/* ===============================
INIT
================================ */

updateCartCount();
updateWishlistCount();