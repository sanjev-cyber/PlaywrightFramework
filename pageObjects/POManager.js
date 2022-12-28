const {loginPage} = require('../pageObjects/loginPage.js');
const {dashboardPage} = require('../pageObjects/dashboardPage.js');
const {cartPage} = require('../pageObjects/cartPage.js');
const {checkOutPage} = require('../pageObjects/checkoutPage');


class POManager {

    constructor(page){

         this.page = page;
         this.loginpage = new loginPage(this.page);
         this.dashboardpage = new dashboardPage(this.page);
         this.cartpage = new cartPage(this.page);
         this.checkoutpage = new checkOutPage(this.page);

    }


    getloginPage(){
        return this.loginpage;
    }

    getdashboardPage(){
        return this.dashboardpage;
    }

    getcartPage(){
        return this.cartpage;
    }

    getcheckOutPage(){
        return this.checkoutpage;
    }

}
module.exports = {POManager};