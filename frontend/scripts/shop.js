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

/* ===============================
CLOSE SEARCH WHEN CLICKING OUTSIDE
================================ */

document.addEventListener("click", (e) => {

if (searchBox && !searchBox.contains(e.target)) {
searchBox.classList.remove("active");
}

});


/* ===============================
LOAD PRODUCTS INTO GRID
================================ */

const grid = document.querySelector(".product-grid");

if (grid) {

products.forEach(product => {

grid.innerHTML += `
<div class="product-card" onclick="openProduct(${product.id})">

${product.offer ? `<div class="offer-tag">${product.offer}</div>` : ""}

<div class="wishlist">
<i class="fa-regular fa-heart"></i>
</div>

<div class="product-img">
<img src="${product.image}" alt="${product.name}">
</div>

<div class="product-info">

<h3>${product.name}</h3>

<p class="price">${product.price}</p>

<p class="rating">${product.rating}</p>

<p class="delivery">${product.delivery}</p>

<div class="colors">
${product.colors.map(color => `<span class="${color}"></span>`).join("")}
</div>

<p class="desc">${product.desc}</p>

<button class="cart-btn" onclick="addToCart(event, ${product.id})">
<i class="fa-solid fa-bag-shopping"></i> Add to Cart
</button>

</div>

</div>
`;

});


/* ===============================
ACTIVATE COLOR SELECTION
================================ */

document.querySelectorAll(".colors").forEach(group => {

const colors = group.querySelectorAll("span");

colors.forEach(color => {

color.addEventListener("click", function () {

colors.forEach(c => c.classList.remove("active"));

this.classList.add("active");

});

});

});


/* ===============================
WISHLIST HEART
================================ */

document.querySelectorAll(".wishlist").forEach((heart) => {

heart.addEventListener("click", () => {

const icon = heart.querySelector("i");

heart.classList.toggle("active");

if (icon.classList.contains("fa-regular")) {
icon.classList.replace("fa-regular", "fa-solid");
} else {
icon.classList.replace("fa-solid", "fa-regular");
}

});

});


/* ===============================
ADD TO CART EFFECT
================================ */

document.querySelectorAll(".cart-btn").forEach(button => {

button.addEventListener("click", function(e){

e.stopPropagation();

this.classList.add("added");
this.innerHTML = "✔ Added";

setTimeout(() => {

this.classList.remove("added");
this.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';

}, 2000);

});

});

}


/* ===============================
OPEN PRODUCT PAGE
================================ */

function openProduct(id){

window.location.href = `product.html?id=${id}`;

}


/* ===============================
ADD TO CART
================================ */

function addToCart(event, id){

event.stopPropagation();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item => item.id === id);

if(existing){
existing.qty += 1;
}else{
cart.push({id:id, qty:1});
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

}


/* ===============================
UPDATE CART COUNT
================================ */

function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let count = 0;

cart.forEach(item => {

if(typeof item === "object" && item.qty){
count += Number(item.qty);
}

});

const cartCount = document.getElementById("cart-count");

if(cartCount){
cartCount.innerText = count;
}

}


updateCartCount();