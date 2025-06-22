const { expect } = require('@playwright/test');

exports.loginPage = class loginPage {
  constructor(page) {
    this.page = page;

    // Login page elements
    this.emailInput = 'login-email';
    this.passwordInput = 'login-password';
    this.submitButton = 'login-submit';
    this.error = 'login-error';
    this.passwordError = 'login-password-error';
    this.form = 'login-form';

    // Profile page elements (for after successful login)
    this.profileName = 'profile-full-name';
    this.profileDetails = 'profile-details';
    this.profileImage = 'profile-image';
  }

  // Function to login using email and password
  async login(email, password) {
    await this.page.getByTestId(this.emailInput).fill(email);
    await this.page.getByTestId(this.passwordInput).fill(password);
    await this.page.getByTestId(this.submitButton).click();
  }

  // Generic error message validation function (id and errorMessage)
  async validateErrorMessage(id, errorMessage) {
    const errorText = await this.page.getByTestId(id).textContent();
    expect(errorText.trim()).toBe(errorMessage);
  }

  // Function to validate the profile data from API response
  async validateProfileData(apiResponseBody) {
    // Extract profile data from the API response body
    const { name, email, phone } = apiResponseBody;

    // Check if profile page elements are populated with correct data
    const profileName = await this.page.getByTestId(this.profileName).textContent();
    const profileDetails = await this.page.getByTestId(this.profileDetails).textContent();

    expect(profileName).toBe(name);
    expect(profileDetails).toBe(`Email: ${email}, Phone: ${phone}`);
  }
};
