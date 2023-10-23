import LoginPage from './page-objects/login-page';
import HomePage from './page-objects/home-page';
import CalendarPage from './page-objects/calendar-page';

describe('add meeting', () => {
  it('passes', () => {
    LoginPage.login();
    HomePage.calendarBtn.click();
    CalendarPage.addMeeting.click();
    CalendarPage.pickDate.type('2023-10-14').type('{enter}');
    CalendarPage.meetingType.select('Offline');
    CalendarPage.meetingPlace.type('ul. Aleja grunwaldzka 83A');
    CalendarPage.meetingCandidate.select('Mr. Anne Kuvalis');
    CalendarPage.meetingJob.select('Direct Program Producer');
    CalendarPage.meetingSubmitBtn.click();
  });
});
