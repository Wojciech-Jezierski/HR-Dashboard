import LoginPage from './page-objects/login-page';
import HomePage from './page-objects/home-page';
import CandidatesPage from './page-objects/candidates-page';

describe('change password', () => {
  it('passes', () => {
    LoginPage.login();
    HomePage.canddiatesBtn.click();
    CandidatesPage.addCandidate.click();
    CandidatesPage.candidateName.type('Kamil');
    CandidatesPage.candidatePosition.type('Senior software enginner');
    CandidatesPage.shortDescription.type(
      'senior software engineer in back-end technologies',
    );
    CandidatesPage.longDescription.type('');
    CandidatesPage.logo.type('https://picsum.com/2020.png');
    CandidatesPage.candidateCompanyName.type('Microsoft');
    CandidatesPage.addCandidateSubmit.click();
  });
});
