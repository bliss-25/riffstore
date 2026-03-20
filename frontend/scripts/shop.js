/* ===============================
SEARCH BAR (SAFE)
================================ */

const searchBox = document.getElementById("searchBox");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("searchInput");

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

// ✅ SAFE PRODUCTS
let allProducts = Array.isArray(products) ? products : [];
allProducts = allProducts.filter(p => p && typeof p === "object" && p.id);

let filteredProducts = [...allProducts];

/* ===============================
CATEGORY + FILTER SYSTEM
================================ */

if (grid) {

const brandFilter = document.getElementById("brandFilter");
const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const resetBtn = document.getElementById("resetBtn");

/* RESET */
if (resetBtn) {
  resetBtn.addEventListener("click", () => {

    if (searchInput) searchInput.value = "";
    if (brandFilter) brandFilter.value = "";
    if (typeFilter) typeFilter.value = "";
    if (priceFilter) priceFilter.value = "";

    const pickupFilter = document.getElementById("pickupFilter");
    const bodyFilter = document.getElementById("bodyFilter");

    if (pickupFilter) pickupFilter.value = "";
    if (bodyFilter) bodyFilter.value = "";

    renderProducts(filteredProducts);
  });
}

/* ===============================
POPULATE FILTERS
================================ */

function populateFilters(productsList) {

  if (!brandFilter) return;

  const brands = [...new Set(productsList.map(p => p.name.split(" ")[0]))];
  const types = [...new Set(productsList.map(p => p.category))];

  const woods = ["Mahogany", "Rosewood", "Maple"];
  const bodies = ["Solid", "Hollow", "Semi-Hollow"];

  brandFilter.innerHTML = `<option value="">Brand</option>`;
  brands.forEach(b => {
    brandFilter.innerHTML += `<option value="${b.toLowerCase()}">${b}</option>`;
  });

  if (typeFilter) {
    typeFilter.innerHTML = `<option value="">Type</option>`;
    types.forEach(t => {
      typeFilter.innerHTML += `<option value="${t.toLowerCase()}">${t}</option>`;
    });
  }

  const pickupFilter = document.getElementById("pickupFilter");
  if (pickupFilter) {
    pickupFilter.innerHTML = `<option value="">Top Wood</option>`;
    woods.forEach(w => {
      pickupFilter.innerHTML += `<option value="${w.toLowerCase()}">${w}</option>`;
    });
  }

  const bodyFilter = document.getElementById("bodyFilter");
  if (bodyFilter) {
    bodyFilter.innerHTML = `<option value="">Body Shape</option>`;
    bodies.forEach(b => {
      bodyFilter.innerHTML += `<option value="${b.toLowerCase()}">${b}</option>`;
    });
  }
}

/* ===============================
APPLY FILTERS
================================ */

function applyFilters() {

  let result = [...filteredProducts];

  if (searchInput && searchInput.value) {
    const value = searchInput.value.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(value)
    );
  }

  if (brandFilter && brandFilter.value) {
    result = result.filter(p =>
      p.name.toLowerCase().startsWith(brandFilter.value.toLowerCase())
    );
  }

  if (typeFilter && typeFilter.value) {
    result = result.filter(p =>
      p.category.toLowerCase() === typeFilter.value.toLowerCase()
    );
  }

  if (priceFilter && priceFilter.value) {

    if (priceFilter.value === "low") {
      result = result.filter(p => p.price < 50000);
    }

    if (priceFilter.value === "mid") {
      result = result.filter(p => p.price >= 50000 && p.price <= 100000);
    }

    if (priceFilter.value === "high") {
      result = result.filter(p => p.price > 100000);
    }
  }

  renderProducts(result);
}

/* EVENTS */
[brandFilter, typeFilter, priceFilter].forEach(filter => {
  if (filter) filter.addEventListener("change", applyFilters);
});

/* CATEGORY */
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

if (category) {
  filteredProducts = filteredProducts.filter(
    p => p.category?.toLowerCase() === category.toLowerCase()
  );
}

populateFilters(filteredProducts);
renderProducts(filteredProducts);

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}

}

/* ===============================
RENDER PRODUCTS
================================ */

function renderProducts(list) {

  if (!grid) return;

  grid.innerHTML = "";

  if (!list || list.length === 0) {
    grid.innerHTML = `<p class="no-products">No products found</p>`;
    return;
  }

  let html = "";

  list.forEach(product => {

    if (!product || !product.id) return;

    html += `
    <div class="product-card" onclick="openProduct('${product.id}')">

      ${product.offer ? `<div class="offer-tag">${product.offer}</div>` : ""}

      <div class="wishlist" data-id="${product.id}">
        <i class="fa-regular fa-heart"></i>
      </div>

      <div class="product-img">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <p class="rating">${product.rating || ""}</p>
        <p class="delivery">${product.delivery || ""}</p>

        <div class="colors">
          ${(product.colors || []).map(c => `<span class="${c}"></span>`).join("")}
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

  // ✅ FIXED (clean wishlist)
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistData = wishlistData.filter(item => item && item.id);

  document.querySelectorAll(".wishlist").forEach((heart) => {

    const id = heart.dataset.id;
    if (!id) return;

    const icon = heart.querySelector("i");

    if (wishlistData.find(item => item && item.id == id)) {
      heart.classList.add("active");
      icon.classList.replace("fa-regular","fa-solid");
    }

    heart.addEventListener("click", (e) => {

      e.stopPropagation();

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter(item => item && item.id);

      const exists = wishlist.find(item => item && item.id == id);
      const product = allProducts.find(p => p && p.id == id);

      if (!product) return;

      if (exists) {
        wishlist = wishlist.filter(item => item && item.id != id);
        heart.classList.remove("active");
        icon.classList.replace("fa-solid","fa-regular");
      } else {
        wishlist.push(product);
        heart.classList.add("active");
        icon.classList.replace("fa-regular","fa-solid");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount();
    });

  });

  document.querySelectorAll(".cart-btn").forEach(button => {

    button.addEventListener("click", function (e) {

      e.stopPropagation();

      const id = this.dataset.id;
      if (!id) return;

      addToCart(e, id);

      this.innerHTML = "✔ Added";

      setTimeout(() => {
        this.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
      }, 1200);

    });

  });
}

/* ===============================
ADD TO CART
================================ */

function addToCart(event, id) {

  event.stopPropagation();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => String(item.id) === String(id));

  if (existing) {
    existing.qty += 1;
  } else {

    const product = allProducts.find(p => p && String(p.id) === String(id));

    if (!product) {
      console.error("Product not found:", id);
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
UTILS
================================ */

function openProduct(id) {
  window.location.href = "product.html?id=" + id;
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + Number(item.qty), 0);

  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.innerText = count;
}

function updateWishlistCount() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter(item => item && item.id);

  const countEl = document.getElementById("wishlistCount");
  if (countEl) countEl.innerText = wishlist.length;
}

/* ===============================
INIT
================================ */

updateCartCount();
updateWishlistCount();

// ===============================
// CARE DATA (DYNAMIC)
// ===============================

const careData = {
  electric: [
    { icon: "fa-soap", title: "Clean Strings", text: "Wipe strings after playing." },
    { icon: "fa-bolt", title: "Check Wiring", text: "Maintain pickups & electronics." },
    { icon: "fa-music", title: "Tune Regularly", text: "Keep tuning stable." },
    { icon: "fa-guitar", title: "Use Stand", text: "Avoid damage from falling." }
  ],

  bass: [
    { icon: "fa-soap", title: "Clean Strings", text: "Bass strings collect dirt fast." },
    { icon: "fa-weight-hanging", title: "Neck Support", text: "Support heavy neck." },
    { icon: "fa-music", title: "Tune Deep", text: "Maintain low frequencies." },
    { icon: "fa-box", title: "Use Case", text: "Protect large body." }
  ],

  acoustic: [
    { icon: "fa-temperature-low", title: "Humidity Care", text: "Avoid moisture." },
    { icon: "fa-sun", title: "Avoid Heat", text: "Keep away from sunlight." },
    { icon: "fa-music", title: "Tune Often", text: "Wood reacts to temp." },
    { icon: "fa-guitar", title: "Use Stand", text: "Prevent damage." }
  ],

  default: [
    { icon: "fa-box", title: "Store Properly", text: "Keep instruments safe." },
    { icon: "fa-shield-alt", title: "Use Case", text: "Protect while traveling." },
    { icon: "fa-music", title: "Regular Check", text: "Maintain sound quality." },
    { icon: "fa-tools", title: "Maintenance", text: "Clean & inspect regularly." }
  ]
};


// ===============================
// LOAD CARE SECTION
// ===============================

function loadCareSection(category) {

  const grid = document.getElementById("careGrid");
  const title = document.getElementById("careTitle");

  if (!grid || !title) return;

  grid.innerHTML = "";

  const data = careData[category] || careData.default;

  title.innerText = category
    ? `How to Take Care of Your ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : "Instrument Care Tips";

  data.forEach(item => {
    grid.innerHTML += `
      <div class="care-card">
        <i class="fas ${item.icon}"></i>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `;
  });
}


// ===============================
// DEFAULT LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadCareSection(); // shows general tips first
});