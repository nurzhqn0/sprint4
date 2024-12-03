"use strict";

const registerLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const profile = document.getElementById("profile");

const notLoggedInNav = document.getElementById("notLoggedIn");
const loggedInNav = document.getElementById("loggedInUser");
const usernameDisplay = document.getElementById("username");
const logoutLink = document.getElementById("logout");

console.log("registerForm:", registerForm);
console.log("loginForm:", loginForm);
console.log("profile:", profile);

// show register
function showRegisterForm() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  profile.style.display = "none";
}

// show login
function showLoginForm() {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  profile.style.display = "none";
}

// show profile
function showProfile(user) {
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  profile.style.display = "block";

  document.getElementById("profileEmail").textContent = user.email;
  document.getElementById("profileFullName").textContent = user.fullName;
  document.getElementById("headerFullName").textContent = user.fullName;
  document.getElementById("profileCountry").textContent = user.country;
  document.getElementById("profileBirthdate").textContent = user.birthdate;

  notLoggedInNav.classList.add("d-none");
  loggedInNav.classList.remove("d-none");
  usernameDisplay.textContent = user.fullName;
}

function saveLoggedInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}

document.addEventListener("DOMContentLoaded", () => {
  showLoginForm();
});

// links
registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  showRegisterForm();
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showLoginForm();
});

// logout
logoutLink.addEventListener("click", function () {
  notLoggedInNav.classList.remove("d-none");
  loggedInNav.classList.add("d-none");

  localStorage.removeItem("loggedInUser");
  profile.style.display = "none";
  showLoginForm();
});

// registerForm
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("fullName").value;
    const country = document.getElementById("country").value;
    const birthdate = document.getElementById("birthdate").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check duplicate
    if (users.some((user) => user.email === email)) {
      alert("Email is already registered!");
      return;
    }

    // addition
    const newUser = { email, password, fullName, country, birthdate };
    users.push(newUser);

    // save locally
    localStorage.setItem("users", JSON.stringify(users));

    // success
    document.getElementById("registerForm").reset();
    showLoginForm();

    alert("Registration successful!");
  });

// loginForm
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // finding user
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert(`Welcome back, ${user.fullName}!`);

      document.getElementById("loginForm").reset();

      saveLoggedInUser(user);
      showProfile(user);
    } else {
      alert("Invalid email or password!");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    showProfile(loggedInUser);
  } else {
    showLoginForm();
    notLoggedInNav.classList.remove("d-none");
    loggedInNav.classList.add("d-none");
  }
});
