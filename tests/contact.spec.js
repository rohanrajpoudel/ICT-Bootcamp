const { test, expect } = require("@playwright/test");
const { contactPage } = require("./pom/contact.po.js");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/contact.html");
});

test.describe("Contact Form Validations", () => {
  test("Name length should not be less than 5", async ({ page }) => {
    const contact = new contactPage(page);
    await contact.sendMessage("123", "abc@gmail.com", "some message");
    await contact.validateErrorMessage(
      contact.nameError,
      "Name must be 5-25 characters."
    );
  });

  test("Name length should not be more than 25", async ({ page }) => {
    const contact = new contactPage(page);
    await contact.sendMessage("a".repeat(26), "abc@gmail.com", "some message");
    await contact.validateErrorMessage(
      contact.nameError,
      "Name must be 5-25 characters."
    );
  });

  test("Email length should not be less than 5", async ({ page }) => {
    const contact = new contactPage(page);
    await contact.sendMessage("Valid Name", "a@b", "some message");
    await contact.validateErrorMessage(
      contact.emailError,
      "Invalid email format or length."
    );
  });

  test("Email length should not be more than 50", async ({ page }) => {
    const contact = new contactPage(page);
    const longEmail = "a".repeat(51) + "@mail.com"; // makes it > 50 chars
    await contact.sendMessage("Valid Name", longEmail, "some message");
    await contact.validateErrorMessage(
      contact.emailError,
      "Invalid email format or length."
    );
  });

  test("Email should be valid", async ({ page }) => {
    const contact = new contactPage(page);
    await contact.sendMessage("Valid Name", "longEmai@l", "some message");
    await contact.validateErrorMessage(
      contact.emailError,
      "Invalid email format or length."
    );
  });

  test("Message length should not be less than 3", async ({ page }) => {
    const contact = new contactPage(page);
    await contact.sendMessage("Valid Name", "abc@gmail.com", "Hi");
    await contact.validateErrorMessage(
      contact.messageError,
      "Message must be 3-200 characters."
    );
  });

  test("Message length should not be more than 200", async ({ page }) => {
    const contact = new contactPage(page);
    await contact.sendMessage("Valid Name", "abc@gmail.com", "a".repeat(201));
    await contact.validateErrorMessage(
      contact.messageError,
      "Message must be 3-200 characters."
    );
  });

  test("Successful form submission redirects to thank you page", async ({
    page,
  }) => {
    const contact = new contactPage(page);
    await contact.sendMessage(
      "Valid Name",
      "valid@email.com",
      "This is a valid message."
    );
    await page.waitForURL("**/thankyou.html");
    expect(page.url()).toContain("/thankyou.html");
  });
});
