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

const colorOptions = document.querySelectorAll(".colors span");

colorOptions.forEach(color => {

color.addEventListener("click",function(){

const parent = this.parentElement;

parent.querySelectorAll("span").forEach(c=>{
c.classList.remove("active");
});

this.classList.add("active");

});

});


/* WISHLIST HEART */

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

btn.classList.toggle("active");

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