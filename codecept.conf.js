const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      show: true,
      browser: 'chromium'
    },
    GeneralFunctions: {
      require: './helpers/generalfunctions_helper.js',
      
    },

    FlightBooking: {
      require: './helpers/flightbooking_helpers.js',
    },

    HROne: {
      require: './helpers/HROne_helpers.js',
    },

    
  },
  include: {
    I: './steps_file.js',
    flightPage: './pages/flight.js',
    hrone: './pages/hronepage.js',
    
  },
  name: 'My_Codecept',
  
  plugins:{
    allure: {

      enabled: true,

      outputDir: "./output/allure/allure-results",

    },
  }
}