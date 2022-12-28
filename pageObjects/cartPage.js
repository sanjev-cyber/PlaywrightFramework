const { expect } = require('@playwright/test');
class cartPage{



    constructor(page){
        
        this.page = page;
        this.list = page.locator('div li').first();
        this.checkOutBtn = page.locator("button[type$='button']").nth(1);
        this.paymentPage = page.locator('text= Payment Method ');
        this.cvvText = page.locator('.input.txt').nth(1);
        this.cardText = page.locator('.input.txt').nth(2);
        this.couponText = page.locator('.input.txt').nth(3);
        this.couponVal = page.locator(".mt-1.ng-star-inserted");
        this.couponBtn = page.locator('text=Apply Coupon').nth(1);
        this.countryText = page.locator("[placeholder*='Country']");
        this.dropDown =  page.locator('.ta-results');

    }

    async checkOut(countryName){

        const checkOutBtn = this.checkOutBtn;
        checkOutBtn.click();
    
        const  paymentPage = this.paymentPage;
        paymentPage.waitFor();
    
        await this.cvvText.fill('123');
        await this.cardText.fill('Visa');
        await this.couponText.fill('rahulshettyacademy');
        await this.couponBtn.click();
       
        await this.couponVal.waitFor();
        const couponVal = await this.couponVal.isVisible();
        expect(couponVal).toBeTruthy();
        
        await this.countryText.type(countryName,{delay:100})
        const dropDown = this.dropDown;
        await dropDown.waitFor();
        const optionsCount =  await dropDown.locator('button').count();
    
        for (let i =0 ; i< optionsCount ;++i){
    
            let text = await dropDown.locator('button').nth(i).textContent();
            if(text === ' India'){
                await dropDown.locator('button').nth(i).click();
                break;
            }
    
        }


    }
    
    async VerifyProductIsDisplayed(productName){
    
        await this.list.waitFor();
        const bool =await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }
  
    getProductLocator(productName){
        return  this.page.locator("h3:has-text('"+productName+"')");
    }
}

module.exports = {cartPage};