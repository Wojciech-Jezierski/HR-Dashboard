import LoginPage from './page-objects/login-page';
import HomePage from './page-objects/home-page';
import AvatarPage from './page-objects/avatar-page';

describe('navigation', () => {
  it('passes', () => {
    LoginPage.login();
    HomePage.languageBtn.select('pl');
    HomePage.languageBtn.select('en');
    HomePage.jobsBtn.click();
    HomePage.canddiatesBtn.click();
    HomePage.blacklistBtn.click();
    HomePage.calendarBtn.click();
    HomePage.refreshBtn.click();
    AvatarPage.avatarBtn.click();
    AvatarPage.profileBtn.click();
    AvatarPage.avatarBtn.click();
    AvatarPage.logoutBtn.click();
  });
});
