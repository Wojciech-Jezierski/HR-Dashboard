class CalendarPage {
  get meetingInfoBtn() {
    return cy.get('.meeting-info');
  }

  get closeInfoBtn() {
    return cy.get('.close-modal');
  }

  get rightArrow() {
    return cy.get('.meeting-right-arrow');
  }

  get leftArrow() {
    return cy.get('.meeting-left-arrow');
  }
}

export default new CalendarPage();
