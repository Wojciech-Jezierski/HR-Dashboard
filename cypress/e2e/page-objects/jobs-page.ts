/* eslint-disable class-methods-use-this */

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

  get addJob() {
    return cy.get('.job-add-btn');
  }

  get jobTitle() {
    return cy.get('.job-title');
  }

  get shortDescription() {
    return cy.get('.job-short-description');
  }

  get companyName() {
    return cy.get('.job-company-name');
  }

  get longDescription() {
    return cy.get('.job-long-description');
  }

  get logo() {
    return cy.get('.job-logo');
  }

  get addJobSubmit() {
    return cy.get('.job-add-submit');
  }
}

export default new JobsPage();
