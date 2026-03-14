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
/* IMAGE GALLERY */

const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(thumb => {

thumb.addEventListener("click", () => {

thumbs.forEach(t => t.classList.remove("active"));

thumb.classList.add("active");

mainImage.src = thumb.src;

});

});

/* QUANTITY BUTTONS */

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const qty = document.getElementById("qty");

if (plus && minus && qty) {

plus.onclick = () => {
qty.value = parseInt(qty.value) + 1;
};

minus.onclick = () => {
if (qty.value > 1) {
qty.value = parseInt(qty.value) - 1;
}
};

}
