class CandidatesPage {
  get searchCandidate() {
    return cy.get('.search-candidate');
  }

  get candidateDetails() {
    return cy.get('.candidate-details');
  }

  get candidateEdit() {
    return cy.get('.candidate-edit');
  }

  get candidateDelete() {
    return cy.get('.candidate-delete');
  }

  get addCandidate() {
    return cy.get('.candidate-add-btn');
  }

  get candidateName() {
    return cy.get('.candidate-name');
  }

  get candidatePosition() {
    return cy.get('.candidate-position');
  }

  get shortDescription() {
    return cy.get('.candidate-short-description');
  }

  get longDescription() {
    return cy.get('.candidate-long-description');
  }

  get logo() {
    return cy.get('.candidate-logo');
  }

  get candidateCompanyName() {
    return cy.get('.candidate-company-name');
  }

  get addCandidateSubmit() {
    return cy.get('.candidate-submit-btn');
  }
}

export default new CandidatesPage();
