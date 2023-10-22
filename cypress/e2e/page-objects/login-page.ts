class LoginPage {
  get signInBtn() {
    return cy.get('.signIn');
  }

  get signUpBtn() {
    return cy.get('.signUp');
  }

  get signInButton() {
    return cy.get('.sign-in-button');
  }

  get email() {
    return cy.get('#email');
  }

  get password() {
    return cy.get('#password');
  }

  open() {
    cy.visit('http://localhost:4200');
    cy.viewport(1440, 1080);
  }

  login() {
    this.open();
    this.signInBtn.click();
    this.email.type('wjezierski@gmail.com');
    this.password.type('wojtek123');
    this.signInButton.click();
  }
}

export default new LoginPage();
