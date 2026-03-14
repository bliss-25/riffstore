/* SEARCH BAR */

const searchBox = document.getElementById("searchBox");
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.getElementById("searchInput");

if(searchIcon){

searchIcon.addEventListener("click",(e)=>{

e.stopPropagation();
searchBox.classList.toggle("active");

if(searchBox.classList.contains("active")){
searchInput.focus();
}

});

}

/* CLOSE SEARCH WHEN CLICKING OUTSIDE */

document.addEventListener("click",(e)=>{

if(searchBox && !searchBox.contains(e.target)){
searchBox.classList.remove("active");
}

});


/* COLOR SELECTION */

const colorGroups = document.querySelectorAll(".colors");

colorGroups.forEach(group => {

const colors = group.querySelectorAll("span");

colors.forEach(color => {

color.addEventListener("click", function(){

colors.forEach(c => c.classList.remove("active"));

this.classList.add("active");

});

});

});


/* WISHLIST HEART */

const hearts = document.querySelectorAll(".wishlist");

hearts.forEach((heart) => {

heart.addEventListener("click", () => {

const icon = heart.querySelector("i");

heart.classList.toggle("active");

if(icon.classList.contains("fa-regular")){
icon.classList.remove("fa-regular");
icon.classList.add("fa-solid");
}else{
icon.classList.remove("fa-solid");
icon.classList.add("fa-regular");
}

});

});


/* ADD TO CART EFFECT */

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(button => {

button.addEventListener("click", function(){

this.classList.add("added");
this.innerHTML = "✔ Added";

setTimeout(() => {

this.classList.remove("added");
this.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Add to Cart';

},2000);

});

});

const featureCards = document.querySelectorAll(".feature-card");

featureCards.forEach(card => {

card.addEventListener("click", () => {

card.classList.toggle("active");

});

});