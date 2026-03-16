/* ===============================
SEARCH BAR
================================ */

const searchBox = document.getElementById("searchBox");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("searchInput");

if (searchIcon) {

searchIcon.addEventListener("click",(e)=>{

e.stopPropagation();
searchBox.classList.toggle("active");

if(searchBox.classList.contains("active")){
searchInput.focus();
}

});

}

document.addEventListener("click",(e)=>{

if(searchBox && !searchBox.contains(e.target)){
searchBox.classList.remove("active");
}

});


/* ===============================
GET PRODUCT ID FROM URL
================================ */

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(p => p.id === productId);


/* ===============================
UPDATE PRODUCT INFO
================================ */

if(product){

document.querySelector(".product-title").innerText = product.name;

document.querySelector(".product-price").innerText = product.price;

document.querySelector(".product-desc").innerText = product.desc;

document.getElementById("mainImage").src = product.image;

}


/* ===============================
IMAGE GALLERY
================================ */

const mainImage = document.getElementById("mainImage");

const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(thumb => {

thumb.addEventListener("click",()=>{

thumbs.forEach(t=>t.classList.remove("active"));

thumb.classList.add("active");

mainImage.src = thumb.src;

});

});


/* ===============================
QUANTITY
================================ */

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const qty = document.getElementById("qty");

if(plus){

plus.onclick = ()=>{

qty.value = Number(qty.value) + 1;

};

}

if(minus){

minus.onclick = ()=>{

let value = Number(qty.value);

if(value > 1){
qty.value = value - 1;
}

};

}


/* ===============================
COLOR SELECT
================================ */

const colors = document.querySelectorAll(".color");

colors.forEach(color=>{

color.addEventListener("click",()=>{

colors.forEach(c=>c.classList.remove("active"));

color.classList.add("active");

});

});


/* ===============================
ADD TO CART
================================ */

const addCartBtn = document.querySelector(".add-cart");

if(addCartBtn){

addCartBtn.addEventListener("click",()=>{

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let quantity = Number(qty.value);

let existing = cart.find(item => item.id === productId);

if(existing){

existing.qty += quantity;

}else{

cart.push({
id: productId,
qty: quantity
});

}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

addCartBtn.innerText = "✔ Added";

setTimeout(()=>{
addCartBtn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add To Cart';
},1500);

});

}


/* ===============================
UPDATE CART COUNT
================================ */

function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let count = 0;

cart.forEach(item=>{
count += Number(item.qty);
});

const cartCount = document.getElementById("cart-count");

if(cartCount){
cartCount.innerText = count;
}

}

updateCartCount();
/* ===============================
ADD TO CART FROM PRODUCT PAGE
================================ */

function addToCartFromProduct(){

const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

const qtyInput = document.getElementById("qty");

let quantity = Number(qtyInput.value) || 1;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item => item.id === productId);

if(existing){

existing.qty += quantity;

}else{

cart.push({
id: productId,
qty: quantity
});

}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

}