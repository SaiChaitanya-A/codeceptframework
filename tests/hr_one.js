require("dotenv").config();
const should = require("chai").should();

Feature("Apply Leave");

Scenario("Verify URL Navigation", async ({ I }) => {
  // Navigate to Website

  I.amOnPage(process.env.HR_One);
  let viewTitle = await I.grabTitle();
  viewTitle.should.equals("HROne V5");
}).tag("H_sce1");

Scenario("Validate login to HROne", async ({ I }) => {
  I.amOnPage(process.env.HR_One);
  let viewTitle = await I.grabTitle();
  viewTitle.should.equals("HROne V5");
  await I.waitForElement("//div/h3", 30);
  I.see("Welcome!", "//div/h3");
  I.waitForElement('//h3[@class="ng-star-inserted"]');

  // Login to HR One

  I.loginInput("hrone-username", "9494818569");
  I.clickText(" NEXT ");
  I.waitForProcessing();
  I.loginInput("hrone-password", "Amma@1289");
  I.clickText(" LOG IN ");
  I.waitForProcessing();
  I.wait(5);
}).tag("H_sce2");


Scenario("Validate login to HROne", async ({ I ,hrone}) => {
    I.amOnPage(process.env.HR_One);
    let viewTitle = await I.grabTitle();
    viewTitle.should.equals("HROne V5");
    await I.waitForElement("//div/h3", 30);
    I.see("Welcome!", "//div/h3");
    I.waitForElement('//h3[@class="ng-star-inserted"]');
  
    I.loginInput("hrone-username", "9494818569");
    I.clickText(" NEXT ");
    I.waitForProcessing();
    I.loginInput("hrone-password", "Amma@1289");
    I.clickText(" LOG IN ");
    I.waitForProcessing();

    //Verifying Web Application and validate Popup

    I.click('May be Later');
    I.waitForElement('//div[@class="moodbotInner"]');

    let moodtext = await I.grabTextFrom('//h2[@class="m-0 text-center mb-4"]');
    console.log(moodtext.trim());

    (moodtext.trim()).should.eql("Hi Avanigadda R K Sai Chaitanya, How was your mood past week?");

    I.click('//small[contains(.,"Excellent")]/..//img[@class="mx-auto d-block cursor-pointer ng-star-inserted"]');
    I.seeElement('//div[@class="reasonChips mt-4 mb-3"]');
    I.click('//mat-chip[contains(.,"Work-life balance")]');
    I.fillField('//textarea[@data-placeholder="Comments"]', 'Thanks...');
    I.seeElement('//mat-checkbox/..//button[text()="SUBMIT"]');
    I.click('//mat-checkbox/..//button[text()="SUBMIT"]');




    //I.wait(5);

    

    let url = await I.grabCurrentUrl();
    url.should.not.eql(process.env.HR_One);
    url.should.eql(process.env.HR_OneApp);

    I.see('Hi Avanigadda !');
    I.seeElement('//ul[@class="mini-nav"]');
    hrone.selecectNavIcon("Home");
    hrone.selecectNavIcon("Inbox");
    hrone.selecectNavIcon("Request");


    //await I.waitForElement('Hi Avanigadda !');
   // I.see('MARK ATTENDANCE' , '//h6');

    I.wait(5);
  }).tag("H_sce3");

// I.amOnPage('https://app.hrone.cloud/login');
// await I.waitForElement('//div/h3', 30);
// I.see('Welcome!', '//div/h3');
// I.fillField('//input[@id="hrone-username"]', '9494818569');
// I.click('//span[contains(., " NEXT ")] ');
// await I.waitForInvisible('//span[contains(., "Processing")] ', 60);
// I.fillField('//input[@id="hrone-password"]', 'Amma@1289');
// await I.waitForElement('//button/span[contains(., " LOG IN ")]', 60);
// I.click('//button/span[text()=" LOG IN "]');
// await I.waitForInvisible('//span[contains(., "Processing")] ', 60);

// await I.waitForElement('Hi Avanigadda !');
// //I.see('MARK ATTENDANCE' , '//h6');
// I.wait(30);
// let PaidLeave = await I.grabTextFrom('(//div[@class="cls-lvlblance"])[1]');
// console.log(PaidLeave);
// let ReservedLeave = await I.grabTextFrom('(//div[@class="cls-lvlblance"])[2]');
// console.log(ReservedLeave);
// await I.seeElement('//h6[contains(., "Calendar")]');
// I.click('//div[@class="cls-drop ng-star-inserted"]');
// I.see('Raise request for');
// I.click('//button[contains(., " Apply leave ")]');
// await I.waitForElement('//h2[@class="header-title m-0 text-uppercase"]');
//I.doubleClick('//div[@class="cls-normal-text ng-star-inserted"]');
