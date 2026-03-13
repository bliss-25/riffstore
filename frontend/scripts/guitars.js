/* SEARCH BAR EXPAND */

const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("searchInput");

searchIcon.addEventListener("click", () => {
searchContainer.classList.toggle("active");
searchInput.focus();
});


/* PRODUCT COLOR SELECTION */

const colorOptions = document.querySelectorAll(".colors span");

colorOptions.forEach(color => {

color.addEventListener("click", function(){

const parent = this.parentElement;

parent.querySelectorAll("span").forEach(c => {
c.classList.remove("active");
});

this.classList.add("active");

});

});


/* ADD TO CART BUTTON */

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(button => {

button.addEventListener("click", () => {

button.innerHTML = "✔ Added";
button.style.background = "#16a34a";
button.style.color = "white";

setTimeout(() => {

button.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';
button.style.background = "white";
button.style.color = "black";

},2000);

});

});


/* FILTER + SEARCH SYSTEM */

const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");
const pickupFilter = document.getElementById("pickupFilter");
const bodyFilter = document.getElementById("bodyFilter");
const sortFilter = document.getElementById("sortFilter");

const products = document.querySelectorAll(".product-card");
const productGrid = document.querySelector(".product-grid");


function filterProducts(){

let searchValue = searchInput.value.toLowerCase();
let brand = brandFilter.value;
let price = priceFilter.value;
let pickup = pickupFilter.value;
let body = bodyFilter.value;

products.forEach(product => {

let text = product.textContent.toLowerCase();

let productBrand = product.dataset.brand;
let productPrice = parseInt(product.dataset.price);
let productPickup = product.dataset.pickup;
let productBody = product.dataset.body;

let show = true;

/* SEARCH */

if(!text.includes(searchValue)){
show = false;
}

/* BRAND */

if(brand && brand !== productBrand){
show = false;
}

/* PRICE */

if(price && productPrice > price){
show = false;
}

/* PICKUP */

if(pickup && pickup !== productPickup){
show = false;
}

/* BODY */

if(body && body !== productBody){
show = false;
}

/* SHOW / HIDE */

if(show){
product.classList.remove("hide");
}else{
product.classList.add("hide");
}

});

}


/* SORT PRODUCTS */

function sortProducts(){

let sortValue = sortFilter.value;
let items = Array.from(products);

if(sortValue === "low"){
items.sort((a,b) => a.dataset.price - b.dataset.price);
}

if(sortValue === "high"){
items.sort((a,b) => b.dataset.price - a.dataset.price);
}

items.forEach(item => productGrid.appendChild(item));

}


/* EVENT LISTENERS */

searchInput.addEventListener("keyup", filterProducts);

brandFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);
pickupFilter.addEventListener("change", filterProducts);
bodyFilter.addEventListener("change", filterProducts);

sortFilter.addEventListener("change", sortProducts);


const clearBtn = document.getElementById("clearFilters");

clearBtn.addEventListener("click", () => {

searchInput.value = "";
brandFilter.value = "";
priceFilter.value = "";
pickupFilter.value = "";
bodyFilter.value = "";
sortFilter.value = "";

products.forEach(product=>{
product.classList.remove("hide");
});

});