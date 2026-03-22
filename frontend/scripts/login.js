// ===============================
// GET ELEMENTS
// ===============================
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const rememberCheckbox = document.querySelector('#remember');
const loginBtn = document.querySelector('#loginBtn');
const forgotBtn = document.querySelector('#forgotBtn');

// ===============================
// LOAD REMEMBERED USER
// ===============================
window.onload = () => {
  const savedUser = JSON.parse(localStorage.getItem("rememberUser"));

  if (savedUser) {
    emailInput.value = savedUser.email;
    passwordInput.value = savedUser.password;
    rememberCheckbox.checked = true;
  }
};

// ===============================
// LOGIN FUNCTION
// ===============================
loginBtn.addEventListener("click", () => {

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid email");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!storedUser) {
    alert("No account found");
    return;
  }

  if (storedUser.email !== email || storedUser.password !== password) {
    alert("Wrong email or password");
    return;
  }

  localStorage.setItem("user", JSON.stringify(storedUser));

  if (rememberCheckbox.checked) {
    localStorage.setItem("rememberUser", JSON.stringify({ email, password }));
  } else {
    localStorage.removeItem("rememberUser");
  }

  alert("Login Successful");
 window.location.href = "index.html";
});

// ===============================
// FORGOT PASSWORD
// ===============================
forgotBtn.addEventListener("click", () => {

  const email = prompt("Enter your email:");

  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!storedUser || storedUser.email !== email) {
    alert("Email not found");
    return;
  }

  alert("Your password is: " + storedUser.password);
});

loginBtn.addEventListener("click", () => {

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid email");
    return;
  }

  // 🔥 START LOADING
  loginBtn.classList.add("loading");

  setTimeout(() => {

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("Wrong email or password");
      loginBtn.classList.remove("loading");
      return;
    }

    localStorage.setItem("user", JSON.stringify(storedUser));

    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberUser", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("rememberUser");
    }

    alert("Login Successful");

    window.location.href = "../index.html";

  }, 1200); // simulate loading
});