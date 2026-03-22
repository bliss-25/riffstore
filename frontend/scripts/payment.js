let selectedMethod = "card";

/* ===============================
SELECT PAYMENT METHOD
================================ */
function selectMethod(element, method) {
selectedMethod = method;

document.querySelectorAll(".payment-option").forEach(opt => {
opt.classList.remove("active");
});

element.classList.add("active");

document.getElementById("cardBox").classList.add("hidden");
document.getElementById("upiBox").classList.add("hidden");

if (method === "card") {
document.getElementById("cardBox").classList.remove("hidden");
}

if (method === "upi") {
document.getElementById("upiBox").classList.remove("hidden");
}
}

/* ===============================
LOAD TOTAL FROM CHECKOUT (SAFE)
================================ */
document.addEventListener("DOMContentLoaded", () => {

const total = localStorage.getItem("checkoutTotal");
const amountEl = document.getElementById("finalAmount");

if (amountEl && total) {
amountEl.textContent = total;
} else if (amountEl) {
amountEl.textContent = "₹0";
}

});

/* ===============================
PAYMENT PROCESS (IMPROVED)
================================ */
function payNow() {

const btn = document.querySelector(".pay-btn");

if (!btn) return;

btn.textContent = "Processing...";
btn.disabled = true;

showToast("Processing payment...", "success");

setTimeout(() => {


// GET TEMP ORDER
const tempOrder = JSON.parse(localStorage.getItem("tempOrder"));

if (tempOrder) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(tempOrder);

  localStorage.setItem("orders", JSON.stringify(orders));
} else {
  showToast("Something went wrong", "error");
  return;
}

//  CLEAR CART AFTER PAYMENT
localStorage.removeItem("cart");
localStorage.removeItem("tempOrder");
localStorage.removeItem("checkoutTotal");

//  GO TO SUCCESS PAGE
window.location.href = "success.html";

}, 1500);
}

/* ===============================
TOAST (CENTER POPUP)
================================ */
function showToast(message, type = "success") {

let toast = document.getElementById("toast");

if (!toast) {
toast = document.createElement("div");
toast.id = "toast";
document.body.appendChild(toast);
}

const icon = type === "success" ? "🎉" : "❌";

toast.innerHTML = `${icon} ${message}`;
toast.className = "show " + type;

setTimeout(() => {
toast.className = "";
}, 2000);
}
