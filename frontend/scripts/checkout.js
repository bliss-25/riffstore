/* LOAD CART */
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("orderItems");
const orderTotal = document.getElementById("orderTotal");

/* RENDER ORDER */
function renderOrder() {
  if (!orderItems) return;

  orderItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    orderItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>${item.qty} x ₹${item.price}</p>
      </div>
    `;
  });

  if (orderTotal) {
    orderTotal.innerText = total.toLocaleString();
  }
}

/* PLACE ORDER */
function placeOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;

  if (!name || !address) {
    alert("Please fill all details");
    return;
  }

  alert("🎉 Order placed successfully!");

  localStorage.removeItem("cart");

  window.location.href = "../index.html";
}

/* RENDER SUMMARY (RIGHT SIDE) */
const summaryContainer = document.querySelector(".order-summary");

function renderSummary() {
  if (!summaryContainer) return;

  if (cart.length === 0) {
    summaryContainer.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  let total = 0;

  summaryContainer.innerHTML = cart.map(item => {
    total += item.price * item.qty; // ✅ FIXED

    return `
      <div class="summary-item">
        <p>${item.name}</p>
        <p>${item.qty} × ₹${item.price}</p>
      </div>
    `;
  }).join("");

  summaryContainer.innerHTML += `
    <hr>
    <h3>Total: ₹${total}</h3>
  `;
}

/* INIT */
renderOrder();
renderSummary();