class AvatarPage {
  get avatarBtn() {
    return cy.get('.avatar');
  }

  get profileBtn() {
    return cy.get('.profile');
  }

  get logoutBtn() {
    return cy.get('.logout');
  }

  get oldPassword() {
    return cy.get('#oldPassword');
  }

  get newPassword() {
    return cy.get('#newPassword');
  }

  get repeatPassword() {
    return cy.get('#repeatPassword');
  }

  get newFirstName() {
    return cy.get('#newFirstName');
  }

  get newLastName() {
    return cy.get('#newLastName');
  }

  get submitNewPassword() {
    return cy.get('.submitNewPassword');
  }

  get submitNewName() {
    return cy.get('.submitNewName');
  }
}

export default new AvatarPage();
