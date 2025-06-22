import {
  showError,
  clearErrors,
  validateEmail,
  validatePassword,
  validateNepaliPhone,
} from "./helperFunctions.js";

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const middleName = document.getElementById("middle-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    clearErrors(
      "first-name-error",
      "last-name-error",
      "signup-email-error",
      "phone-error",
      "signup-password-error",
      "confirm-password-error"
    );

    let valid = true;

    if (firstName.length < 2) {
      showError("first-name-error", "First name too short.");
      valid = false;
    }
    if (firstName.length > 10) {
      showError("first-name-error", "First name too long.");
      valid = false;
    }
    if (middleName.length > 10) {
      showError("middle-name-error", "Middle name too long.");
      valid = false;
    }
    if (lastName.length < 2) {
      showError("last-name-error", "Last name too short.");
      valid = false;
    }
    if (lastName.length > 10) {
      showError("last-name-error", "Last name too long.");
      valid = false;
    }
    if (!validateEmail(email)) {
      showError("signup-email-error", "Invalid email.");
      valid = false;
    }
    if (!validateNepaliPhone(phone)) {
      showError("phone-error", "Invalid Nepali phone number.");
      valid = false;
    }
    if (!validatePassword(password)) {
      showError(
        "signup-password-error",
        "Password must be 8-32 chars, with at least one uppercase letter, one number, and one special character."
      );
      valid = false;
    }
    if (password !== confirmPassword) {
      showError("confirm-password-error", "Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    const fullName = `${firstName} ${middleName} ${lastName}`.trim();

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: fullName, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        showError("signup-email-error", data.error || "Signup failed.");
      } else {
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
      }
    } catch (err) {
      alert("Server connection error.");
    }
  });
}
