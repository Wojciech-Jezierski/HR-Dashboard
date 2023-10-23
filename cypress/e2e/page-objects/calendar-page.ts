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

  get addMeeting() {
    return cy.get('.meeting-add-btn');
  }

  get pickDate() {
    return cy.get('.meeting-datepick');
  }

  get meetingType() {
    return cy.get('.meeting-type');
  }

  get meetingPlace() {
    return cy.get('.meeting-place');
  }

  get meetingCandidate() {
    return cy.get('#meetingCandidate');
  }

  get meetingJob() {
    return cy.get('#meetingJob');
  }

  get meetingSubmitBtn() {
    return cy.get('.meeting-submit-btn');
  }
}

export default new CalendarPage();
