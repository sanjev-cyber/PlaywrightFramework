const { test } = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager.js');
const {Customtest} = require('../utils/test-base.js')

// Json --> String --> Js Object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json'))); 
// Using diffrent types of datasets 
for(const data of dataSet){
    test(`@Web Client App ${data.productName}`,async ({page}) => {
        
        /*  
            Objects for the loginPage.js, dashboardPage.js, cartPage.js, checkOutPage.js are declaered in 
            POManager.js (as a general Obj file).
            
            POManager.js will return all the objcets of the Page Files, it can be accessed using POManager's object in
            test file.

            Getting all Const from the Json file

        */
    
        const POmanager = new POManager(page);
       
        const loginpage = POmanager.getloginPage();
        const dashboardpage = POmanager.getdashboardPage();
        const cartpage = POmanager.getcartPage();
        const checkoutpage = POmanager.getcheckOutPage();

        await loginpage.goto();
        await loginpage.validLogin(data.UserName,data.Password);
        
        await dashboardpage.searchProduct(data.productName);
        await dashboardpage.navigateToCart();
        
        await cartpage.VerifyProductIsDisplayed(data.productName);
        await cartpage.checkOut(data.countryName);
        
        const orderID = await checkoutpage.SubmitAndGetOrderId(data.email);
        console.log(orderID);
        await checkoutpage.checkOutPageVal(orderID);
        
    });
}
Customtest('Client App fixtureData',async ({page,testData}) => {
   
    /*  
        test using the data set as a fixture

    */
    const POmanager = new POManager(page);
   
    const loginpage = POmanager.getloginPage();
    const dashboardpage = POmanager.getdashboardPage();
    const cartpage = POmanager.getcartPage();
    const checkoutpage = POmanager.getcheckOutPage();

    await loginpage.goto();
    await loginpage.validLogin(testData.UserName,testData.Password);
    
    await dashboardpage.searchProduct(testData.productName);
    await dashboardpage.navigateToCart();
    
    await cartpage.VerifyProductIsDisplayed(testData.productName);
    await cartpage.checkOut(testData.countryName);
    
    const orderID = await checkoutpage.SubmitAndGetOrderId(testData.email);
    console.log(orderID);
    await checkoutpage.checkOutPageVal(orderID);
    
});
