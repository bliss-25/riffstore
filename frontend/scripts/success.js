document.addEventListener("DOMContentLoaded", () => {

const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) return;

const lastOrder = orders[orders.length - 1];

document.getElementById("orderId").textContent = lastOrder.id;
document.getElementById("orderTotal").textContent = lastOrder.total;

// Current Date
const today = new Date();
document.getElementById("orderDate").textContent =
today.toLocaleDateString("en-IN", {
day: "numeric",
month: "long",
year: "numeric"
});

});

function goHome() {
window.location.href = "../index.html";
}
