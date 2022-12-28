const { test, expect, request } = require('@playwright/test');

test('@Web TestCase1', async ({browser}) => {
    // First Test case the whole block --> Playwright code 
    // Javascript is async language so it won't wait for completion of a step and move to second step,
    // Thus we need to add await keyword to all steps with async as a function type 

    // new.Context() --> will create a new instance of the browser with fixed properties as per the req
    // new.Page()    --> will create a new page 
    // page.goto()   --> will navigate to that URL

    //npx playwright codegen https://rahulshettyacademy.com/loginpagePractise/ --> to record and generate code
    
    const context =  await browser.newContext();
    const page    =  await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

});

test('@Web TestCase2', async ({page}) => {

    // The context and page properties are not if theres no desired capabilities for the browser thus we can use Page 
    //test.only --> will run only that test skips others
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    /*
        A part of network testing we are disabling the .css file in the login page
    */ 
    // await page.route('**/*.{jpg,png,jpeg}',route =>  route.abort()); // Regexp for any URL
    //get title 
    console.log(await page.title());
    //Assertion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    //css selector, xpath always use Css selector
    /*
        If Id is present 
        css --> tagname#id (or) #id 

        css --> tagname.class (or) .class

        Write css based on any attribute
        css --> [attribute = 'value']

        Write css with traversing from parent to child
        css --> parenttagname >> childtagname 

        If needs to write the locator based on the text
        text = ''

    */

    const userName  =  page.locator('input#username');  //WebElement
    const password  =  page.locator('[type="password"]');
    const signInBtn =  page.locator('[id="signInBtn"]');

    await userName.type('SanjeevKumar') ;// To type or sendKeys 
    await password.type('Password');
    await signInBtn.click(); //To click 

    await page.on('request', request => console.log(request.url()));
    await page.on('response', reponse =>console.log(reponse.url(),reponse.status()));
    
    // Automatic wait in build function
    console.log(await page.locator('[style*="block"]').textContent());
    //Assertion 
    await expect(await page.locator('[style*="block"]')).toContainText('Incorrect');

    //Type or Fill -- clear the text box 
    await userName.fill(''); // to clear the text box
    await userName.fill('rahulshettyacademy');

    await password.fill('');
    await password.fill('learning');

    // wait for page to get Navigate to next page so we use .waitForNavigate() 
    // To combine two steps we can use Promise.all() or race condition 
    await Promise.all([

        page.waitForNavigation(),
        signInBtn.click()
    ])

    //Return the value using the nth value 
    const cardTitle = page.locator('.card-title a');
    // console.log(await cardTitle.nth(1).textContent()); 
    // console.log(await cardTitle.first().textContent()); 
    // console.log(await cardTitle.last().textContent());
    //Return all the titles 
    const cardTitles = await cardTitle.allTextContents();
    console.log(cardTitles);

}); 


test('@Web Testcase3', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    //get title 
    console.log(await page.title());
    //Assertion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const userName  =  page.locator('input#username');  //WebElement
    const password  =  page.locator('[type="password"]');
    const signInBtn =  page.locator('[id="signInBtn"]');
    const doclink   =  page.locator("[href*='documents-request']");

    await userName.fill('rahulshettyacademy');
    await password.fill('learning');

    const dropDown = page.locator('select.form-control');
    await dropDown.selectOption('consult');
    
    // Radio Buttons 
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    
    // assertion for check the radio button is selected or not
    await expect (page.locator('.radiotextsty').last()).toBeChecked();
    
    // use to return the state of the radio button
    console.log(await page.locator('.radiotextsty').last().isChecked());
    
    // To select the Checkbox
    await page.locator('#terms').click();
    await expect (page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    // Assertion only pass if the checked value is 'False' , Always put await ver the action is     
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    // To Check the attribute is present or not 
    await expect(doclink).toHaveAttribute('class','blinkingText');

    // await page.pause();

    // await Promise.all([
    //     page.waitForNavigation(),
    //     signInBtn.click()
    // ])

});

test('@Web TestCase4 -- Child Win Handle', async ({browser}) => {

    const context =  await browser.newContext();
    const page    =  await context.newPage();


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const doclink   =  page.locator("[href*='documents-request']");

    // Wait for the new page in the same Browser, the method will return the control of the newPage as an ARRAY
    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        doclink.click()

    ])
    const text = await newPage.locator('.red').textContent();

    const arrayText = text.split('@')
    const domain = arrayText[1].split(' ')[0]
    console.log(domain);
    await page.locator('input#username').fill(domain);
    // await page.pause();



});


