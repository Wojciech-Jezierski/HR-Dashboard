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
}

export default new CandidatesPage();
