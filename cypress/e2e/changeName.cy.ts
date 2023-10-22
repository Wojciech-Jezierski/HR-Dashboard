import LoginPage from './page-objects/login-page';
import AvatarPage from './page-objects/avatar-page';

describe('change password', () => {
  it('passes', () => {
    LoginPage.login();
    AvatarPage.avatarBtn.click();
    AvatarPage.profileBtn.click();
    AvatarPage.newFirstName.type('Kamil');
    AvatarPage.newLastName.type('Kowalski');
    AvatarPage.submitNewName.click();
  });
});
