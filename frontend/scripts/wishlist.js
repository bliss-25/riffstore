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
IMAGE FALLBACK (IMPORTANT 🔥)
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

    html += `
    <div class="wishlist-card" onclick="openProduct('${item.id}')">

      <!-- REMOVE -->
      <div class="remove-btn" onclick="removeItem(event, '${item.id}')">
        <i class="fa-solid fa-heart"></i>
      </div>

      <!-- IMAGE -->
      <div class="wishlist-img">
        <img src="${item.image || getImage(item.category)}" alt="${item.title || item.name}">
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
        <button class="move-cart-btn" onclick="moveToCart(event, '${item.id}')">
          <i class="fa-solid fa-bag-shopping"></i> Move to Cart
        </button>
      </div>

    </div>
    `;
  });

  container.innerHTML = html; // ✅ FIXED (no overwrite bug)
}

/* ===============================
REMOVE ITEM
================================ */
function removeItem(e, id) {
  e.stopPropagation();

  const card = e.target.closest(".wishlist-card");

  if (card) {
    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";
  }

  setTimeout(() => {
    wishlist = wishlist.filter(item => String(item.id) !== String(id));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
  }, 200);
}

/* ===============================
MOVE TO CART
================================ */
function moveToCart(e, id) {
  e.stopPropagation();

  const item = wishlist.find(p => String(p.id) === String(id));

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

  /* SAVE CART */
  localStorage.setItem("cart", JSON.stringify(cart));

  /* REMOVE FROM WISHLIST */
  wishlist = wishlist.filter(p => String(p.id) !== String(id));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlist();
}

/* ===============================
OPEN PRODUCT PAGE
================================ */
function openProduct(id) {
  if (!id) return;

  localStorage.setItem("selectedProductId", id);
  window.location.href = "./product.html";
}

/* ===============================
GO TO SHOP
================================ */
function goToShop() {
  window.location.href = "../index.html";
}

/* ===============================
MAKE GLOBAL (IMPORTANT)
================================ */
window.openProduct = openProduct;
window.removeItem = removeItem;
window.moveToCart = moveToCart;
window.goToShop = goToShop;

/* ===============================
INIT
================================ */
renderWishlist();