import LoginPage from './page-objects/login-page';
import AvatarPage from './page-objects/avatar-page';

describe('change password', () => {
  it('passes', () => {
    LoginPage.login();
    AvatarPage.avatarBtn.click();
    AvatarPage.profileBtn.click();
    AvatarPage.oldPassword.type('wojtek123');
    AvatarPage.newPassword.type('wojtek1234');
    AvatarPage.repeatPassword.type('wojtek1234');
    AvatarPage.submitNewPassword.click();
  });
});
