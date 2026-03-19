/* ===============================
SELECT CONTAINER
================================ */
const container = document.querySelector(".wishlist-container");

/* ===============================
LOAD DATA
================================ */
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ===============================
CLEAN DATA (🔥 IMPORTANT)
================================ */
wishlist = wishlist.filter(item => item && item.id);
localStorage.setItem("wishlist", JSON.stringify(wishlist));

/* ===============================
IMAGE FALLBACK
================================ */
function getImage(category) {
  if (category === "electric") return "../assets/image/guitar.png";
  if (category === "drums") return "../assets/image/drum.png";
  if (category === "acoustic") return "../assets/image/acoustic.png";
  return "../assets/image/default.png";
}

/* ===============================
RENDER WISHLIST
================================ */
function renderWishlist() {

  if (!container) return;

  /* EMPTY STATE */
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty">
        <h2>You haven't saved any items yet</h2>
        <p>Start adding your favorite instruments</p>

        <button class="shop-btn" onclick="goToShop()">
          Continue Shopping
        </button>
      </div>
    `;
    return;
  }

  let html = "";

  wishlist.forEach(item => {

    if (!item || !item.id) return; // 🔥 SAFETY

    html += `
    <div class="wishlist-card" data-id="${item.id}">

      <!-- REMOVE -->
      <div class="remove-btn" data-id="${item.id}">
        <i class="fa-solid fa-heart"></i>
      </div>

      <!-- IMAGE -->
      <div class="wishlist-img">
        <img class="product-img"
          src="${item.image || getImage(item.category)}"
          alt="${item.title || item.name}">
      </div>

      <!-- INFO -->
      <div class="wishlist-info">
        <p>Instruments</p>
        <h4>${item.title || item.name}</h4>

        <div>
          <span class="wishlist-price">₹${item.price}</span>
          <span class="old-price">₹${item.price + 5000}</span>
        </div>

        <!-- MOVE TO CART -->
        <button class="move-cart-btn" data-id="${item.id}">
          <i class="fa-solid fa-bag-shopping"></i> Move to Cart
        </button>
      </div>

    </div>
    `;
  });

  container.innerHTML = html;

  /* ===============================
  EVENTS
  ================================= */

  // 🔥 OPEN PRODUCT (FINAL FIX)
  document.querySelectorAll(".product-img").forEach((img) => {
    img.addEventListener("click", () => {

      const card = img.closest(".wishlist-card");
      if (!card) return;

      const id = card.dataset.id;

      const item = wishlist.find(p => p && String(p.id) === String(id));
      if (!item) return;

      let correctId = item.id;

      // convert old numeric ID → string ID
      if (!isNaN(item.id) && typeof products !== "undefined") {
        const idx = Number(item.id) - 1;
        if (products[idx]) {
          correctId = products[idx].id;
        }
      }

      window.location.href = `./product.html?id=${correctId}`;
    });
  });

  // REMOVE
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      removeItem(id);
    });
  });

  // MOVE TO CART
  document.querySelectorAll(".move-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      moveToCart(id);
    });
  });
}

/* ===============================
REMOVE ITEM
================================ */
function removeItem(id) {

  wishlist = wishlist.filter(item => item && String(item.id) !== String(id));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlist();
}

/* ===============================
MOVE TO CART
================================ */
function moveToCart(id) {

  const item = wishlist.find(p => p && String(p.id) === String(id));
  if (!item) return;

  const existing = cart.find(p => String(p.id) === String(id));

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      title: item.title || item.name,
      price: item.price,
      image: item.image || getImage(item.category),
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // REMOVE FROM WISHLIST
  wishlist = wishlist.filter(p => p && String(p.id) !== String(id));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlist();
}

/* ===============================
GO TO SHOP
================================ */
function goToShop() {
  window.location.href = "../index.html";
}

/* ===============================
INIT
================================ */
renderWishlist();