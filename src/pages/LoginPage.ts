import BasePage from './BasePage';
import { Page ,Locator} from '@playwright/test';

export default class LoginPage extends BasePage {
  readonly page:Page;
  readonly signinButton = '#nav-link-accountList';
  readonly emailInput :Locator;
  readonly continueButton :Locator;
  readonly passwordInput :Locator;
  readonly submitButton :Locator;
  //readonly submitButton = 'input#signInSubmit';
  readonly inValidEmail:Locator;

  constructor(page: Page) {

    super(page);
    this.page=page;
    this.emailInput= page.getByRole('textbox', { name: 'Enter your mobile number or' });
    this.continueButton= page.getByRole('button', { name: 'Continue' });
    this.passwordInput=page.getByRole('textbox', { name: 'Password' });
    this.submitButton=page.getByRole('button', { name: 'Sign in' });
   this.inValidEmail= page.getByText('Invalid email address.');

    
  }

  async gotoLogin() {
    await this.page.click(this.signinButton);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);

    
    await this.continueButton.click();
    if(await this.inValidEmail.isVisible())

      {
        console.log("InValid Email");

      }

      else{
    await this.passwordInput.fill(password);
    await this.submitButton.click();
      }
    




   // await this.page.fill(this.emailInput, email);   
    //await this.page.click(this.continueButton);
    //await this.page.fill(this.passwordInput, password);
    //await this.page.click(this.submitButton);
  }



  
}
