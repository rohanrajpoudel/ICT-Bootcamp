import { clearErrors, showError } from "./helperFunctions.js";

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    clearErrors("login-error");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showError("login-error", data.error || "Login failed.");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "profile.html";
      }
    } catch (err) {
      alert("Server connection error.");
    }
  });
}
