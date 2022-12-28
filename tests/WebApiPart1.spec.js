const { test, expect, request } = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');


// Payload --> Input to the request
const loginPayLoad = {userEmail: "sanjeevkumar19@gmail.com", userPassword: "Team@123"} 
const OrderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]} //Country has been changed
let reponse;

test.beforeAll(async ()=>{

    const apiContext = await request.newContext(); // Create a new API page
    const apiUtils = new ApiUtils(apiContext,loginPayLoad);
    reponse = await apiUtils.createOrder(OrderPayLoad);
    
})


test('TestCase1',async ({page}) => {

    /*
        JS code to inster the token in the browser (line 39)
        the addInitScript gets two args they are,
        1. value =>{window.localStorage.setItem('token',value);} (func)
        2. loginResponseToken (parameters to the func)
    
        It will wait untill all the APIs or network gets completly loaded or network is stable 
        await page.waitForLoadState('networkidle');
        Gets all Titles, Select dynamically a value in the page 

        get the Apis from the utlis/ApiUtils   
    */

    page.addInitScript(value =>{window.localStorage.setItem('token',value);},reponse.loginResponseToken);
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();
    const row = page.locator("tbody tr");

    for (let i =0; i< await row.count(); ++i){
        const rowOrderID = await row.nth(i).locator('th').textContent();
            if(reponse.OrderReponseOrderID.includes(rowOrderID)){
                await row.nth(i).locator('button').first().click();
                break;
            }

    }
    const orderIdDetailsPage = await page.locator('.col-text').textContent();
    expect(reponse.OrderReponseOrderID.includes(orderIdDetailsPage)).toBeTruthy();
        

});