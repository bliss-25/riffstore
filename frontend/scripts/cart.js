/* ===============================
LOAD CART ITEMS
================================ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let total = 0;

cartItems.innerHTML = "";

cart.forEach(item => {

const product = products.find(p => p.id == item.id);

if(product){

let price = parseInt(product.price.replace(/[₹,]/g,""));

total += price * item.qty;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${product.image}" width="80">

<div class="cart-info">

<h3>${product.name}</h3>

<p>${product.price}</p>

<div class="cart-qty">
<button onclick="changeQty(${product.id}, -1)">-</button>
<span>${item.qty}</span>
<button onclick="changeQty(${product.id}, 1)">+</button>
</div>

</div>

<button onclick="removeItem(${product.id})">
Remove
</button>

</div>

`;

}

});

cartTotal.innerText = "₹" + total.toLocaleString();


/* ===============================
REMOVE ITEM
================================ */

function removeItem(id){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.filter(item => item.id !== id);

localStorage.setItem("cart", JSON.stringify(cart));

location.reload();

}


/* ===============================
CHANGE QUANTITY
================================ */

function changeQty(id, change){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let item = cart.find(p => p.id === id);

if(item){

item.qty += change;

if(item.qty <= 0){
cart = cart.filter(p => p.id !== id);
}

}

localStorage.setItem("cart", JSON.stringify(cart));

location.reload();

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