/* eslint-disable class-methods-use-this */

class BlacklistPage {
  get itemsPerPageBtn() {
    return cy.get('#itemsPerPage');
  }

  get typeOfSorting() {
    return cy.get('#typeOfSorting');
  }

  get order() {
    return cy.get('#order');
  }

  get rightArrow() {
    return cy.get('.blacklist-right-arrow');
  }

  get leftArrow() {
    return cy.get('.blacklist-left-arrow');
  }
}

export default new BlacklistPage();
