/* ===============================
SEARCH BAR
================================ */
const searchBox = document.getElementById("searchBox");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("searchInput");

if (searchIcon) {
  searchIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
      searchInput.focus();
    }
  });
}

document.addEventListener("click", (e) => {
  if (searchBox && !searchBox.contains(e.target)) {
    searchBox.classList.remove("active");
  }
});

/* ===============================
GET PRODUCT ID FROM URL
================================ */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

/* ===============================
FIND PRODUCT (CLEAN FIX)
================================ */
let product = null;

// 1. Try exact match
product = products.find(p => String(p.id) === String(productId));

// 2. If not found → convert numeric ID to index
if (!product && !isNaN(productId)) {
  const index = Number(productId) - 1;
  product = products[index];
}
// fallback (handles old numeric ids like 17 → drum17)
if (!product) {
  product = products.find(p => String(p.id).endsWith(productId));
}

/* ===============================
SAFETY CHECK
================================ */
if (!product) {
  document.body.innerHTML = `
    <h2 style="text-align:center;margin-top:50px;">
      Product not found 😢
    </h2>
  `;
}

/* ===============================
UPDATE PRODUCT INFO
================================ */
if (product) {
  document.querySelector(".product-title").innerText = product.name;
  document.querySelector(".product-price").innerText = "₹" + product.price;
  document.querySelector(".product-desc").innerText = product.desc;
  document.getElementById("mainImage").src = product.image;
}

/* ===============================
IMAGE GALLERY
================================ */
const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.src = thumb.src;
  });
});

/* ===============================
QUANTITY
================================ */
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const qty = document.getElementById("qty");

if (plus) {
  plus.onclick = () => {
    qty.value = Number(qty.value) + 1;
  };
}

if (minus) {
  minus.onclick = () => {
    let value = Number(qty.value);
    if (value > 1) {
      qty.value = value - 1;
    }
  };
}

/* ===============================
COLOR SELECT
================================ */
const colors = document.querySelectorAll(".color");

colors.forEach(color => {
  color.addEventListener("click", () => {
    colors.forEach(c => c.classList.remove("active"));
    color.classList.add("active");
  });
});

/* ===============================
ADD TO CART
================================ */
function addToCartFromProduct() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let quantity = Number(document.getElementById("qty").value);

  let existing = cart.find(item => String(item.id) === String(product.id));

  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  const btn = document.querySelector(".add-cart");
  btn.innerText = "✔ Added";

  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add To Cart';
  }, 1500);
}

/* ===============================
UPDATE CART COUNT
================================ */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach(item => {
    count += Number(item.qty);
  });

  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.innerText = count;
  }
}

/* ===============================
INIT
================================ */
updateCartCount();