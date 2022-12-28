const base = require('@playwright/test');

// Passing the test data as a fixture to the test(i.e, as like browser,page..etc)
exports.Customtest = base.test.extend(

    {
        testData :{
            UserName : "sanjeevkumar19@gmail.com",
            Password : "Team@123",
            email    : "sanjeevkumar19@gmail.com",
            productName : "zara coat 3",
            countryName  : "ind"
        }
    }

)