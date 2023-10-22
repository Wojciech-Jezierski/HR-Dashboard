class HomePage {
  get refreshBtn() {
    return cy.get('.refresh');
  }

  get languageBtn() {
    return cy.get('#language');
  }

  get homeBtn() {
    return cy.get('.home');
  }

  get jobsBtn() {
    return cy.get('.jobs');
  }

  get canddiatesBtn() {
    return cy.get('.candidates');
  }

  get blacklistBtn() {
    return cy.get('.blacklist');
  }

  get calendarBtn() {
    return cy.get('.calendar');
  }
}

export default new HomePage();
