/* ===============================
SEARCH
================================ */
const searchBox = document.getElementById("searchBox");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("searchInput");

if (searchBox && searchIcon) {
searchIcon.addEventListener("click", (e) => {
e.stopPropagation();
searchBox.classList.toggle("active");

```
if (searchBox.classList.contains("active") && searchInput) {
  searchInput.focus();
}
```

});

document.addEventListener("click", () => {
searchBox.classList.remove("active");
});
}

/* ===============================
TOAST
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
}, 2500);
}

/* ===============================
GLOBAL VARIABLES
================================ */
let shippingCost = 0;
let discountValue = 0;

/* ===============================
GET CART
================================ */
function getCart() {
return JSON.parse(localStorage.getItem("cart")) || [];
}

/* ===============================
RENDER CHECKOUT ITEMS
================================ */
function renderCheckout() {
const container = document.getElementById("checkoutItems");
const cart = getCart();

let subtotal = 0;
container.innerHTML = "";

if (cart.length === 0) {
container.innerHTML = "<p>Your cart is empty</p>";
return;
}

cart.forEach(item => {
subtotal += item.price * item.qty;


container.innerHTML += `
  <div class="checkout-item">
    <img src="${item.image || ''}" class="checkout-img">

    <div class="checkout-info">
      <div class="checkout-title">${item.name}</div>
      <div class="checkout-sub">Qty: ${item.qty}</div>
    </div>

    <div class="checkout-price">₹${item.price * item.qty}</div>
  </div>
`;


});

document.getElementById("subtotal").textContent = "₹" + subtotal;

updateTotal();
}

/* ===============================
SHIPPING
================================ */
function selectShipping(cost, element) {
shippingCost = cost;

document.querySelectorAll(".shipping-card").forEach(card => {
card.classList.remove("active");
});

element.classList.add("active");

updateTotal();
}

/* ===============================
DISCOUNT
================================ */
function applyDiscount() {
const code = document.getElementById("discountCode").value.trim();
const note = document.querySelector(".discount-note");

if (code === "RIFF10") {
discountValue = 0.1;


if (note) {
  note.textContent = "Discount applied successfully 🎉";
  note.style.color = "#1a7f37";
}

showToast("Discount applied 🎉", "success");


} else {
discountValue = 0;

if (note) {
  note.textContent = "Invalid discount code";
  note.style.color = "red";
}

showToast("Invalid code ❌", "error");


}

updateTotal();
}

/* AUTO FILL DISCOUNT */
const discountNote = document.querySelector(".discount-note");
if (discountNote) {
discountNote.addEventListener("click", () => {
document.getElementById("discountCode").value = "RIFF10";
});
}

/* ===============================
TOTAL CALCULATION
================================ */
function updateTotal() {
let subtotal = Number(document.getElementById("subtotal").textContent.replace("₹", ""));

let discount = subtotal * discountValue;
let afterDiscount = subtotal - discount;

let tax = afterDiscount * 0.02;

let total = afterDiscount + tax + shippingCost;

document.getElementById("discount").textContent = "₹" + discount.toFixed(0);
document.getElementById("shippingCost").textContent = "₹" + shippingCost;
document.getElementById("tax").textContent = "₹" + tax.toFixed(0);
document.getElementById("total").textContent = "₹" + total.toFixed(0);
}

/* ===============================
PLACE ORDER
================================ */
function placeOrder() {

const name = document.getElementById("firstName").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const city = document.getElementById("city").value.trim();
const state = document.getElementById("state").value;
const pincode = document.getElementById("pincode").value.trim();
const house = document.getElementById("house").value.trim();
const address = document.getElementById("address").value.trim();

const phoneRegex = /^[6-9][0-9]{9}$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

if (!name || !email || !phone || !city || !state || !pincode || !house || !address) {
showToast("Please fill all fields", "error");
return;
}

if (!emailRegex.test(email)) {
showToast("Enter valid email", "error");
return;
}

if (!phoneRegex.test(phone)) {
showToast("Invalid phone number", "error");
return;
}

if (!pincodeRegex.test(pincode)) {
showToast("Invalid pincode", "error");
return;
}

const totalValue = document.getElementById("total").textContent;

const tempOrder = {
id: "ORD" + Date.now(),
items: getCart(),
total: totalValue,
address: { name, phone, city, state, pincode, house, address }
};

localStorage.setItem("tempOrder", JSON.stringify(tempOrder));
localStorage.setItem("checkoutTotal", totalValue);

console.log("FINAL TOTAL:", totalValue);

window.location.href = "payment.html";
}

/* ===============================
INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
renderCheckout();

const phoneInput = document.getElementById("phone");
const pinInput = document.getElementById("pincode");

if (phoneInput) {
phoneInput.addEventListener("input", function () {
this.value = this.value.replace(/\D/g, "").slice(0, 10);
});
}

if (pinInput) {
pinInput.addEventListener("input", function () {
this.value = this.value.replace(/\D/g, "").slice(0, 6);
});
}
});
