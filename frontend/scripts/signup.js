// ===============================
// GET ELEMENTS
// ===============================
const signupBtn = document.querySelector('#signupBtn');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');

// ===============================
// SIGNUP FUNCTION
// ===============================
signupBtn.addEventListener("click", () => {

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  // VALIDATION
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("Enter valid email");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // ===============================
  // LOADING EFFECT
  // ===============================
  signupBtn.classList.add("loading");

  setTimeout(() => {

    const user = {
      name,
      email,
      password,
      phone: "8788180956"
    };

    // SAVE USER
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Account created successfully 🎉");

    // REDIRECT TO LOGIN
    window.location.href = "login.html";

  }, 1000);
});