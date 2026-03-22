/* ===============================
GET CART
================================ */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

/* ===============================
SAVE CART
================================ */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===============================
ADD TO CART
================================ */
function addToCart(event, id, title, price, image, type = "product") {

  if (event) event.stopPropagation();

  let cart = getCart();

  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id,
      title,
      price,
      image,
      qty: 1,
      type // 🔥 THIS IS THE FIX
    });
  }

  saveCart(cart);
  updateCartCount();
  showToast(type === "lesson" ? "Enrolled successfully ✅" : "Added to cart 🛒");
}
/* ===============================
UPDATE COUNT
================================ */
function updateCartCount() {

  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;

  let cart = getCart();

  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  cartCount.textContent = count;
}

/* ===============================
REMOVE ITEM
================================ */
function removeFromCart(id) {

  let cart = getCart().filter(item => item.id !== id);

  saveCart(cart);
  renderCart();
  updateCartCount();
}

/* ===============================
UPDATE QTY
================================ */
function updateQty(id, change) {

  let cart = getCart();

  let item = cart.find(i => i.id === id);

  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart(cart);
  renderCart();
  updateCartCount();
}

/* ===============================
RENDER CART (SAFE)
================================ */
function renderCart() {

  const container = document.getElementById("cartItems");

  // 🔥 CRITICAL FIX
  if (!container) return;

  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  let cart = getCart();

  container.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-text">Your cart is empty 🛒</p>`;
    if (totalEl) totalEl.textContent = "0";
    return;
  }

  cart.forEach(item => {

    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img">

        <div class="cart-info">
          <h3>${item.title}</h3>
          <p>₹${item.price}</p>

          <div class="cart-qty">
            <button onclick="updateQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateQty('${item.id}', 1)">+</button>
          </div>

          <button onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    `;
  });

  if (totalEl) totalEl.textContent = total;

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
  }
}

/* ===============================
TOAST
================================ */
function showToast(message) {

  let toast = document.createElement("div");
  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#00ff88";
  toast.style.color = "#000";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.fontWeight = "bold";
  toast.style.zIndex = "999";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}

/* ===============================
GLOBAL (IMPORTANT)
================================ */
window.addToCart = addToCart;
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;

/* ===============================
INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
