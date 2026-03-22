


document.addEventListener("DOMContentLoaded", function () {

  const dropdown = document.getElementById("profileDropdown");
  const icon = document.querySelector(".user-icon");

  // TOGGLE MENU
  icon.addEventListener("click", function (e) {
    e.stopPropagation(); // 🔥 VERY IMPORTANT
    dropdown.classList.toggle("active");
  });

  // CLOSE WHEN CLICK OUTSIDE
  document.addEventListener("click", function () {
    dropdown.classList.remove("active");
  });

  // PREVENT CLOSING WHEN CLICKING INSIDE DROPDOWN
  dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // LOAD USER DATA
  const user = JSON.parse(localStorage.getItem("user"));

  const usernameEl = document.querySelector(".username");
  const phoneEl = document.querySelector(".phone");

  if (usernameEl) {
    usernameEl.innerText = user?.name ? "Hello, " + user.name : "Hello, Guest";
  }

  if (phoneEl && user?.phone) {
    phoneEl.innerText = user.phone;
  }

});

// PROFILE NAVIGATION
function openProfile(section) {
  localStorage.setItem("profileSection", section);
  window.location.href = "profile.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// NAVIGATION
function goTo(page) {
  window.location.href = page;
}

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}


const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {

panel.addEventListener("mouseenter", () => {

panels.forEach(p => p.classList.remove("expand"));

panel.classList.add("expand");

});

panel.addEventListener("mouseleave", () => {

panel.classList.remove("expand");

});

});



// VIDEO SWITCH

const video = document.getElementById("riffVideo");

if(video){

const source = video.querySelector("source");

const videos = [
"../assets/video/musicvid1.mp4",
"../assets/video/musicvid2.mp4"
];

let index = 0;

setInterval(() => {

video.classList.add("fade");   // start fade out

setTimeout(() => {

index = (index + 1) % videos.length;

source.src = videos[index];
video.load();

video.classList.remove("fade");  // fade back in

},1200); // fade duration

},12000); // time before switching video

}
console.log(searchBox, searchIcon, searchInput);