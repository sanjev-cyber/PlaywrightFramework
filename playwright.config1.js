// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  retries : 1, // retries after test failed 
  workers : 3,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects : [
    {
        name : 'Safari',
        use: {
          browserName : 'webkit',
          headless    :  false,
          screenshot  :   'off',
          trace       :   'on',    
          ignoreHTTPSErrors : true, // for SSL Certificates 
          permissions : ['geolocation'], // for permissions
          ...devices['iPhone 13 Pro Max'], // Size of an device
      },
    },
    {
      name : 'Chrome',
      use: {
        browserName : 'chromium',
        headless    :  false,
        screenshot  :   'on',
        trace       :   'on', // Logs
        video       : 'retain-on-failure',
        // viewport : {width:720,height:720}    //--> Size of the page
    },
  }
    
  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  

  
};

module.exports = config;
