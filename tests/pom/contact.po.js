const requirement = require("playwright/test");
const { expect } = requirement;

exports.contactPage = class contactPage {
  constructor(page) {
    this.page = page;
    this.nameInput = `contact-name`;
    this.emailInput = `contact-email`;
    this.messageInput = `contact-message`;
    this.nameError = `name-error`;
    this.emailError = `email-error`;
    this.messageError = `message-error`;
    this.submitButton = `contact-submit`;
  }

  async sendMessage(name, email, message) {
    if (name != "") {
      await this.page.getByTestId(this.nameInput).click();
      await this.page.getByTestId(this.nameInput).type(name);
    }
    if (email != "") {
      await this.page.getByTestId(this.emailInput).click();
      await this.page.getByTestId(this.emailInput).type(email);
    }
    if (message != "") {
      await this.page.getByTestId(this.messageInput).click();
      await this.page.getByTestId(this.messageInput).type(message);
    }
    await this.page.getByTestId(this.submitButton).click();
  }

  async validateErrorMessage(id, errorMessage) {
    const errorElement = this.page.getByTestId(id);
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText(errorMessage);
  }
};
