const { expect } = require('@playwright/test');

exports.signupPage = class signupPage {
  constructor(page) {
    this.page = page;

    // Signup form elements
    this.firstNameInput = 'signup-first-name';
    this.middleNameInput = 'signup-middle-name';
    this.lastNameInput = 'signup-last-name';
    this.emailInput = 'signup-email';
    this.phoneInput = 'signup-phone';
    this.passwordInput = 'signup-password';
    this.confirmPasswordInput = 'signup-confirm-password';
    this.submitButton = 'signup-submit';

    // Error elements
    this.firstNameError = 'signup-first-name-error';
    this.middleNameError = 'signup-middle-name-error';
    this.lastNameError = 'signup-last-name-error';
    this.emailError = 'signup-email-error';
    this.phoneError = 'signup-phone-error';
    this.passwordError = 'signup-password-error';
    this.confirmPasswordError = 'signup-confirm-password-error';
  }

  // Function to sign up with the provided details
  async signup(firstName, middleName, lastName, email, phone, password, confirmPassword) {
    // Fill the form fields
    if (firstName) {
      await this.page.getByTestId(this.firstNameInput).fill(firstName);
    }
    if (middleName) {
      await this.page.getByTestId(this.middleNameInput).fill(middleName);
    }
    if (lastName) {
      await this.page.getByTestId(this.lastNameInput).fill(lastName);
    }
    if (email) {
      await this.page.getByTestId(this.emailInput).fill(email);
    }
    if (phone) {
      await this.page.getByTestId(this.phoneInput).fill(phone);
    }
    if (password) {
      await this.page.getByTestId(this.passwordInput).fill(password);
    }
    if (confirmPassword) {
      await this.page.getByTestId(this.confirmPasswordInput).fill(confirmPassword);
    }

    // Submit the form
    await this.page.getByTestId(this.submitButton).click();
  }

  // Function to validate error message for any field (id and expected error message)
  async validateError(id, errorMessage) {
    const errorText = await this.page.getByTestId(id).textContent();
    expect(errorText.trim()).toBe(errorMessage);
  }
};
