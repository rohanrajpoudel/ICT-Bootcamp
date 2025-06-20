import { showError, clearErrors, validateEmail } from "./helperFunctions.js";

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    clearErrors("name-error", "email-error", "message-error");

    let isValid = true;

    if (name.length < 5 || name.length > 25) {
      showError("name-error", "Name must be 5-25 characters.");
      isValid = false;
    }

    if (!validateEmail(email)) {
      showError("email-error", "Invalid email format or length.");
      isValid = false;
    }

    if (message.length < 3 || message.length > 200) {
      showError("message-error", "Message must be 3–200 characters.");
      isValid = false;
    }

    if (isValid) {
      fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            contactForm.reset();
            window.location.href = "thankyou.html";
          } else {
            alert(data.error || "Something went wrong!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Server error. Please try again later.");
        });
    }
  });
}
