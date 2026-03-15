/* SEARCH */

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

document.addEventListener("click", () => {
searchBox.classList.remove("active");
});


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


/* QUANTITY */

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const qty = document.getElementById("qty");

plus.onclick = () => {
qty.value = parseInt(qty.value || 1) + 1;
};

minus.onclick = () => {

let value = parseInt(qty.value || 1);

if(value > 1){
qty.value = value - 1;
}

};


/* COLOR SELECT */

const colors = document.querySelectorAll(".color");

colors.forEach(color => {

color.addEventListener("click", () => {

colors.forEach(c => c.classList.remove("active"));

color.classList.add("active");

});

});