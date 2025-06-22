const { test, expect } = require("@playwright/test");
const { signupPage } = require("./pom/signup.po.js");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/signup.html");
});

test.describe("Sign Up Form Validations", () => {
  test("First Name length should not be less than 2", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "A",
      "",
      "Last Name",
      "email@example.com",
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.firstNameError, "First name too short.");
  });

  test("First Name length should not be more than 10", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "A".repeat(11),
      "",
      "Last Name",
      "email@example.com",
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.firstNameError, "First name too long.");
  });

  test("Middle Name length should not be more than 10", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "A".repeat(11),
      "Last Name",
      "email@example.com",
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.middleNameError, "Middle name too long.");
  });

  test("Last Name length should not be less than 2", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "A",
      "email@example.com",
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.lastNameError, "Last name too short.");
  });

  test("Last Name length should not be more than 10", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "A".repeat(11),
      "email@example.com",
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.lastNameError, "Last name too long.");
  });

  test("Email should not be less than 5 characters", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "Last Name",
      "a@b",
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.emailError, "Invalid email.");
  });

  test("Email should not be more than 50 characters", async ({ page }) => {
    const signup = new signupPage(page);
    const longEmail = "a".repeat(51) + "@mail.com"; // makes it > 50 chars
    await signup.signup(
      "First Name",
      "",
      "Last Name",
      longEmail,
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.emailError, "Invalid email.");
  });

  test("Email format should be valid", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "Last Name",
      "invalid@Email",
      "9840000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(signup.emailError, "Invalid email.");
  });

  test("Phone number should be valid Nepali number", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "Last Name",
      "valid@email.com",
      "12345",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );
    await signup.validateError(
      signup.phoneError,
      "Invalid Nepali phone number."
    );
  });

  test("Password must meet strength requirements", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "Last Name",
      "email@example.com",
      "9840000000",
      "pass",
      "pass"
    );
    await signup.validateError(
      signup.passwordError,
      "Password must be 8-32 chars, with at least one uppercase letter, one number, and one special character."
    );
  });

  test("Password and Confirm Password must match", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "Last Name",
      "email@example.com",
      "9840000000",
      "P@$$W0Rd",
      "Password456"
    );
    await signup.validateError(
      signup.confirmPasswordError,
      "Passwords do not match."
    );
  });

  test("Successful sign up should redirect to login page", async ({ page }) => {
    const signup = new signupPage(page);
    await signup.signup(
      "First Name",
      "",
      "Last Name",
      "validemail"+Math.floor(1000 + Math.random() * 9000)+"@example.com",
      "9800000000",
      "P@$$W0Rd",
      "P@$$W0Rd"
    );

    // Wait for the redirect to the login page
    await page.waitForURL("**/login.html");
    expect(page.url()).toContain("/login.html");
  });
});
