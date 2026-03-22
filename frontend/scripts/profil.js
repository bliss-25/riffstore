/* TAB SWITCH */
function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

/* LOAD DATA */
function loadData() {
  loadCourses();
  loadOrders();
  loadWishlist();
  loadAddresses();
  loadProfile();
}

/* COURSES */
function loadCourses() {
  let courses = JSON.parse(localStorage.getItem("courses")) || [];
  let container = document.getElementById("coursesList");

  container.innerHTML = courses.length
    ? courses.map(c => `<div class="card">${c.title}</div>`).join("")
    : "No courses yet";
}

/* ORDERS */
function loadOrders() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let container = document.getElementById("ordersList");

  container.innerHTML = orders.length
    ? orders.map(o => `<div class="card">Order #${o.id}<br>${o.date}</div>`).join("")
    : "No orders yet";
}

/* WISHLIST */
function loadWishlist() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let container = document.getElementById("wishlistList");

  container.innerHTML = wishlist.length
    ? wishlist.map(w => `<div class="card">${w.title}</div>`).join("")
    : "No wishlist items";
}

/* ADDRESS */
function loadAddresses() {
  let addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  let container = document.getElementById("addressList");

  container.innerHTML = addresses.length
    ? addresses.map(a => `<div class="card">${a}</div>`).join("")
    : "No addresses saved";
}

function addAddress() {
  let input = document.getElementById("newAddress");
  let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  addresses.push(input.value);
  localStorage.setItem("addresses", JSON.stringify(addresses));

  input.value = "";
  loadAddresses();
}

/* PROFILE */
function loadProfile() {
  let profile = JSON.parse(localStorage.getItem("profile")) || {};

  document.getElementById("username").innerText = profile.name || "User";
  document.getElementById("email").innerText = profile.email || "user@email.com";
}

function saveProfile() {
  let name = document.getElementById("nameInput").value;
  let email = document.getElementById("emailInput").value;

  localStorage.setItem("profile", JSON.stringify({ name, email }));
  loadProfile();
}

/* INIT */
loadData();