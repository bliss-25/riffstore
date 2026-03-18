/* ===============================
LOAD CART
================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* ===============================
ELEMENTS
================================ */

const cartContent = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");


/* ===============================
RENDER CART
================================ */

function renderCart() {

  cartContent.innerHTML = "";

  if (cart.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.innerText = 0;
    cartCount.innerText = 0;
    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image || '../assets/image/guitar1.png'}">

      <div class="cart-info">
        <h4>${item.name || "Unknown"}</h4>
        <p>₹${(item.price || 0).toLocaleString()}</p>

        <div class="cart-qty">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>

      <button class="remove-btn" onclick="removeItem(${index})">🗑</button>
    `;

    cartContent.appendChild(div);
  });

  cartTotal.innerText = total.toLocaleString();
  cartCount.innerText = count;

  updateCartCount(); // 🔥 sync navbar
}


/* ===============================
CHANGE QUANTITY
================================ */

function changeQty(index, change) {

  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


/* ===============================
REMOVE ITEM
================================ */

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


/* ===============================
UPDATE NAVBAR COUNT
================================ */

function updateCartCount() {

  let count = 0;

  cart.forEach(item => {
    count += item.qty;
  });

  const navCount = document.getElementById("cartCount");

  if (navCount) {
    navCount.innerText = count;
  }
}


/* ===============================
INIT
================================ */

renderCart();
updateCartCount();