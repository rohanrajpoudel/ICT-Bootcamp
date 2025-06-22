const { test, expect } = require("@playwright/test");
const { loginPage } = require("./pom/login.po.js");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/login.html");
});

test.describe("Login Validations", () => {
  test("Email not in Database", async ({ page }) => {
    const login = new loginPage(page);
    await login.login("abc@gmail.com", "Password");
    await login.validateErrorMessage(
      login.error,
      "Invalid email or password"
    );
  });

  test("Password error", async ({ page }) => {
    const login = new loginPage(page);
    await login.login("poudelrohan58@gmail.com", "Password");
    await login.validateErrorMessage(
      login.error,
      "Invalid email or password"
    );
  });

  test("Successful Login", async ({ page }) => {
    const login = new loginPage(page);
    await login.login(
      "poudelrohan58@gmail.com",
      "P@$$W0Rd"
    );
    await page.waitForURL("**/profile.html");
    expect(page.url()).toContain("/profile.html");
  });
});
