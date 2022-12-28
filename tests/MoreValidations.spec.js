const { test, expect } = require('@playwright/test');

//test.describe.configure({mode:'parallel'}); // To run the testcases in a file parallely

test('@Web PopupValidation',async ({page}) =>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    // await page.goForward(); --> to go forward 
    // await page.goBack(); --> to go back 

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    // await page.pause();
    // Javascript alter handle heren, its dialog box
    page.on('dialog',dialog => dialog.accept()); //It will listen to all the events on the page 
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover(); // It will hover on the element

    //iframe 

    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const text = await framePage.locator('.text h2 span').textContent();
    console.log(text);
})

test('@Web ScreenShot',async({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'ScreenShotle.png'})
    await page.locator('#hide-textbox').click();
    await page.screenshot({path:'ScreenShotPage.png'})
    await expect(page.locator('#displayed-text')).toBeHidden();
    
});

test.skip('Visual Comparison',async({page})=>{

    await page.goto('https://flightaware.com/');
    await page.waitForLoadState('networkidle');
    expect (await page.screenshot()).toMatchSnapshot('ScreenShotHomePage.png');


});