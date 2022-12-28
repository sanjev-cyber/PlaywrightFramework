const { test, expect } = require('@playwright/test');

test.skip('TestCase1',async ({page}) => {

    const email = 'sanjeevkumar19@gmail.com'
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('sanjeevkumar19@gmail.com'); 
    await page.locator('#userPassword').fill('Team@123');
    await page.locator('[type="submit"]').click();

    // It will wait untill all the APIs or network gets completly loaded or network is stable 
    // await page.waitForLoadState('networkidle');
    // Gets all Titles, Select dynamically a value in the page 
    const productName = 'zara coat 3'
    // await page.pause();
    await page.locator('.card-body h5 b').first().waitFor();
    const titles =  await page.locator('.card-body h5 b').allTextContents();
    console.log(titles);
    const products = await page.locator('.card-body h5 b');
    const size = await products.count();
    console.log(size);
    for(let i=0 ; i<size ; ++i ){

       let text = await products.nth(i).textContent();
       console.log(text);
       
       if(await products.nth(i).textContent() === productName){
            await page.locator('text= Add To Cart').nth(i).click();
            break;        
       }

    }
    
    await page.locator("[routerlink*='cart']").click();
    // Same as selenium we have contains here, we have has-text, tagName:has-text('text');
    // .waitFor(); is used to make the PW to wait for the element in page 
    await page.locator('div li').first().waitFor();
    const flag = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(flag).toBeTruthy();

    const checkOutBtn = await page.locator("button[type$='button']").nth(1);
    checkOutBtn.click();


    // Own code 
    const  paymentPage = await page.locator('text= Payment Method ');
    paymentPage.waitFor();

    /*
    const dropDown1 = await page.locator('.input.ddl').first();
    const dropDown2 = await page.locator('.input.ddl').last();
    
    dropDown1.click();
    await page.locator('select').nth(0).waitFor();
    const dropDown1Count = await page.locator('select').nth(0).locator('option').count();
    for (let i =0 ; i< dropDown1Count ;++i){

        let text = await page.locator('select').nth(0).locator('option').nth(i).textContent();
        if(text === '03'){
            await page.locator('select').nth(0).locator('option').nth(i).waitFor();
            await page.locator('select').nth(0).locator('option').nth(i).click();
            break;
        }

    }
    
    dropDown2.click();
    await page.locator('select').nth(1).waitFor();
    const dropDown2Count = await page.locator('select').nth(1).locator('option').count();
    for (let i =0 ; i< dropDown2Count ;++i){

        let text = await page.locator('select').nth(1).locator('option').nth(i).textContent();
        if(text === '03'){
            await page.locator('select').nth(1).locator('option').nth(i).waitFor();
            await page.locator('select').nth(1).locator('option').nth(i).click();
            break;
        }

    }
    */

    await page.locator('.input.txt').nth(1).fill('123');
    await page.locator('.input.txt').nth(2).fill('Visa');
    await page.locator('.input.txt').nth(3).fill('rahulshettyacademy');
    await page.locator('text=Apply Coupon').nth(1).click();
    // await page.pause();
   
    await page.locator(".mt-1.ng-star-inserted").waitFor();
    const couponVal = await page.locator(".mt-1.ng-star-inserted").isVisible();
    expect(couponVal).toBeTruthy();
    
    await page.locator("[placeholder*='Country']").type('ind',{delay:100})
    const dropDown = page.locator('.ta-results');
    await dropDown.waitFor();
    const optionsCount =  await dropDown.locator('button').count();

    for (let i =0 ; i< optionsCount ;++i){

        let text = await dropDown.locator('button').nth(i).textContent();
        if(text === ' India'){
            await dropDown.locator('button').nth(i).click();
            break;
        }

    }

   // Assertion for checking the text on the page
   await expect(page.locator(".user__name [type='text']").nth(0)).toHaveText(email); 
   await page.locator('.action__submit').click();
   await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. '); 
   let orderID =  await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
   console.log(orderID);


   await page.locator("button[routerlink*='myorders']").click();
   await page.locator('tbody').waitFor();
   const row = page.locator("tbody tr");

   for (let i =0; i< await row.count(); ++i){
       const rowOrderID = await row.nth(i).locator('th').textContent();
    //    console.log(rowOrderID)
        if(orderID.includes(rowOrderID)){
            await row.nth(i).locator('button').first().click();
            break;
        }

   }
   const orderIdDetailsPage = await page.locator('.col-text').textContent();
   expect(orderID.includes(orderIdDetailsPage)).toBeTruthy();
    


  
});