const contactForm = document.getElementById("contact-form");
// console.log("listened");
// console.log(contactForm);

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    if (isValid) {
      window.location.href = "thankyou.html";
    }
  });
}
