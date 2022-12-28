class loginPage{


    // This constructor has all the css for the elements 
    constructor(page){

            this.page = page;
            this.signInBtn = page.locator('[type="submit"]');
            this.userNameInput = page.locator('#userEmail');
            this.passwordInput = page.locator('#userPassword');
    }

    async goto(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(userName,password){
 
        await this.userNameInput.fill(userName); 
        await this.passwordInput.fill(password);
        await this.signInBtn.click();
        // await this.page.waitForLoadState('networkidle');

    }
}
module.exports = {loginPage};