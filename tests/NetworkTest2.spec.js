const { test, expect, request } = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');


// Payload --> Input to the request
const loginPayLoad = {userEmail: "sanjeevkumar18@gmail.com", userPassword: "Team@123"} 
const OrderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]} //Country has been changed
let response;
let FakePayLoad = {data: [], message: "No Orders"};

test.beforeAll(async ()=>{

    const apiContext = await request.newContext(); // Create a new API page
    const apiUtils = new ApiUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(OrderPayLoad);
    
})


test('@API Network Test',async ({page}) => {

    /*
        JS code to inster the token in the browser (line 39)
        the addInitScript gets two args they are,
        1. value =>{window.localStorage.setItem('token',value);} (func)
        2. loginResponseToken (parameters to the func)
    
        It will wait untill all the APIs or network gets completly loaded or network is stable 
        await page.waitForLoadState('networkidle');
        Gets all Titles, Select dynamically a value in the page 

        get the Apis from the utlis/ApiUtils   

        Here, we are testing using the Network Intercepting by intercepting the actual flow of the test case

    */

    page.addInitScript(value =>{window.localStorage.setItem('token',value);},response.loginResponseToken);
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink*='myorders']").click();
     /*
        Intercepting the reponse and inserting the fake response 
        Inercepting response --> API reponse -> browser -> Render the data on the frontEnd (actual Flow)
        Inercepting response --> API reponse -> (Fake response) -> browser -> Render the data on the frontEnd
        The current response is stored in 'reponse', FakePayLoad is passed to the current request

        In this test we are using two acconts, one making the order and check the response with another user, 
        just be changing the response with another on (Url) 
        its security testing --> Using to check with an unautorized user
     */ 
    
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63579f08c4d0c51f4f464057',
    async route => route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6357983cc4d0c51f4f463819'
        })

    )
    await page.locator('button:has-text("View")').first().click();
    // await page.pause();
    
        

});