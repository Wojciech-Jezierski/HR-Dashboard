import LoginPage from './page-objects/login-page';
import HomePage from './page-objects/home-page';
import JobsPage from './page-objects/jobs-page';

describe('change password', () => {
  it('passes', () => {
    LoginPage.login();
    HomePage.jobsBtn.click();
    JobsPage.addJob.click();
    JobsPage.jobTitle.type('Senior software engineer');
    JobsPage.shortDescription.type('senior dev');
    JobsPage.companyName.type('Microsoft');
    JobsPage.longDescription.type('lorem ipsum lfdskfjldsfjkdlsfdsdfs');
    JobsPage.logo.type('https://picsum.com/logo2020.png');
    JobsPage.addJobSubmit.click();
  });
});
