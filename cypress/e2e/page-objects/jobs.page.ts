class JobsPage {
  get searchJob() {
    return cy.get('.search-job');
  }

  get jobDetails() {
    return cy.get('.job-details');
  }

  get jobEdit() {
    return cy.get('.job-edit');
  }

  get jobDelete() {
    return cy.get('.job-delete');
  }
}

export default new JobsPage();
