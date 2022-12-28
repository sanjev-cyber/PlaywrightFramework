const { test,expect } = require('@playwright/test');
class checkOutPage {
    
    
    constructor(page){

        this.page = page;
        this.emailEle = page.locator(".user__name [type='text']").nth(0);
        this.submitBtn = page.locator('.action__submit');
        this.valText = page.locator(".hero-primary");
        this.orderid = page.locator('.em-spacer-1 .ng-star-inserted');
        this.ordersBtn = page.locator("button[routerlink*='myorders']");
        this.valEle = page.locator('tbody');
        this.row = page.locator("tbody tr");
        this.orderIdDetailsPage = page.locator('.col-text');

    }

    async checkOutPageVal(orderID){

        await this.ordersBtn.click();
        await this.valEle.waitFor();
        const row = this.row;

        for (let i =0; i< await row.count(); ++i){
            const rowOrderID = await row.nth(i).locator('th').textContent();
                if(orderID.includes(rowOrderID)){
                    await row.nth(i).locator('button').first().click();
                    break;
                }

        }
        const orderIdDetailsPage = await this.orderIdDetailsPage.textContent();
        expect(orderID.includes(orderIdDetailsPage)).toBeTruthy();
            


    }
    async SubmitAndGetOrderId(email)
    {
        await expect(this.emailEle).toHaveText(email); 
        await this.submitBtn.click();
        await expect(this.valText).toHaveText(' Thankyou for the order. '); 
        const orderid = this.orderid;
        let orderID = orderid.textContent();
        return orderID;
    }


}
module.exports = {checkOutPage};