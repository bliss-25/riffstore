/* ===============================
SAFE SEARCH (NO CRASH)
================================ */
const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("searchInput");

if (searchIcon && searchContainer && searchInput) {
  searchIcon.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    searchInput.focus();
  });
}


/* ===============================
LESSONS DATA
================================ */
const lessons = [
  {
    id: "l1",
    title: "Beginner Guitar Course",
    price: 1999,
    image: "../assets/image/bass.jpg",
    rating: "★★★★★ (120)",
    desc: "Start from basics and learn chords.",
    delivery: "Access instantly"
  },
  {
    id: "l2",
    title: "Electric Guitar Mastery",
    price: 2999,
    image: "../assets/image/drums1.jpg",
    rating: "★★★★☆ (95)",
    desc: "Master solos and riffs.",
    delivery: "Access instantly"
  },
  {
    id: "l3",
    title: "Acoustic Guitar Essentials",
    price: 1499,
    image: "../assets/image/drums5.jpg",
    rating: "★★★★★ (200)",
    desc: "Learn fingerstyle & chords.",
    delivery: "Access instantly"
  }
];


/* ===============================
RENDER LESSONS
================================ */
function renderLessons() {

  const grid = document.getElementById("lessonsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  lessons.forEach(lesson => {

    let card = `
      <div class="product-card">

        <div class="wishlist">
          <i class="fa-regular fa-heart"></i>
        </div>

        <div class="product-img">
          <img src="${lesson.image}">
        </div>

        <div class="product-info">

          <h3>${lesson.title}</h3>
          <p class="price">₹${lesson.price}</p>
          <p class="rating">${lesson.rating}</p>
          <p class="delivery">${lesson.delivery}</p>

          <p class="desc">${lesson.desc}</p>

          <button class="cart-btn"
            onclick="addToCart(event, '${lesson.id}', '${lesson.title}', ${lesson.price}, '${lesson.image}', 'lesson')">
            <i class="fa-solid fa-bag-shopping"></i> Enroll Now
          </button>

        </div>
      </div>
    `;

    grid.innerHTML += card;
  });

  initWishlist();
}


/* ===============================
WISHLIST (UI ONLY)
================================ */
function initWishlist() {

  document.querySelectorAll(".wishlist i").forEach(icon => {

    icon.addEventListener("click", function (e) {
      e.stopPropagation();

      this.classList.toggle("fa-solid");
      this.classList.toggle("fa-regular");

      this.style.color = this.classList.contains("fa-solid") ? "red" : "#fff";
    });

  });
}


/* ===============================
INIT
================================ */
document.addEventListener("DOMContentLoaded", renderLessons);