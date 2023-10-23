import LoginPage from './page-objects/login-page';

describe('create account', () => {
  it('passes', () => {
    LoginPage.open();
    LoginPage.signUpBtn.click();
    LoginPage.signUpFirstName.type('Kamil');
    LoginPage.signUpLastName.type('Kowalski');
    LoginPage.signUpEmail.type('kowalski@gmail.com');
    LoginPage.signUpPassword.type('kowal123');
    LoginPage.signUpRepeatPassword.type('kowal123');
    LoginPage.signUpSubmitBtn.click();
  });
});
