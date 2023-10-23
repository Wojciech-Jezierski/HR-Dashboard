import LoginPage from './page-objects/login-page';
import HomePage from './page-objects/home-page';
import AvatarPage from './page-objects/avatar-page';
import JobsPage from './page-objects/jobs-page';
import CandidatesPage from './page-objects/candidates-page';
import BlacklistPage from './page-objects/blacklist-page';
import CalendarPage from './page-objects/calendar-page';

describe('navigation', () => {
  it('passes', () => {
    LoginPage.login();
    HomePage.languageBtn.select('pl');
    HomePage.languageBtn.select('en');
    HomePage.jobsBtn.click();
    JobsPage.searchJob.type('regional');
    JobsPage.jobDetails.first().click();
    cy.go('back');
    HomePage.canddiatesBtn.click();
    CandidatesPage.searchCandidate.type('Ron');
    CandidatesPage.candidateDetails.first().click();
    cy.go('back');
    HomePage.blacklistBtn.click();
    BlacklistPage.itemsPerPageBtn.select('10');
    BlacklistPage.typeOfSorting.select('reason');
    BlacklistPage.order.select('desc');
    BlacklistPage.rightArrow.click();
    BlacklistPage.leftArrow.click();
    HomePage.calendarBtn.click();
    CalendarPage.meetingInfoBtn.first().click();
    CalendarPage.closeInfoBtn.click();
    CalendarPage.rightArrow.click();
    CalendarPage.leftArrow.click();
    HomePage.refreshBtn.click();
    AvatarPage.avatarBtn.click();
    AvatarPage.profileBtn.click();
    AvatarPage.avatarBtn.click();
    AvatarPage.logoutBtn.click();
  });
});
