const { selectCalendar } = require("../pages/flight");

require("dotenv").config();

Feature("verify");

Scenario("Verify GreenKart URL Navigation", async ({ I }) => {
  //Navigate to URL

  I.amOnPage(process.env.GREEN_KART);
  let viewTitle = await I.grabTitle();
  console.log(viewTitle);
  viewTitle.should.eql("GreenKart - veg and fruits kart");
}).tag("F_sce1");

Scenario(
  "Validate The Filght Booking Navlink On The Greenkart Application",
  async ({ I }) => {
    I.amOnPage(process.env.GREEN_KART);
    let viewTitle = await I.grabTitle();
    console.log(viewTitle);
    viewTitle.should.eql("GreenKart - veg and fruits kart");

    //Navigate to flight search tab

    I.cartHeaderNavlink("Flight Booking");
    I.dontSeeInTitle("GreenKart - veg and fruits kart");
    I.dontSeeCurrentUrlEquals(process.env.GREEN_KART);
  }
).tag("F_sce2");

Scenario(
  "Validate Country With One Way Traveloption",
  async ({ I, flightPage }) => {
    I.amOnPage(process.env.GREEN_KART);
    let viewTitle = await I.grabTitle();
    console.log(viewTitle);
    viewTitle.should.eql("GreenKart - veg and fruits kart");

    I.cartHeaderNavlink("Flight Booking");
    I.dontSeeInTitle("GreenKart - veg and fruits kart");
    I.dontSeeCurrentUrlEquals(process.env.GREEN_KART);

    //Flight search for One Way

    flightPage.selectCountry("India");
    flightPage.travelOption("One Way", "0");
    I.dontSeeElement('//span[@id="spclearDate"]');
    flightPage.travelDetails("Goa (GOI)", "Hyderabad (HYD)");
    flightPage.journyDates("9", "26");
    flightPage.selectCountryCurrency("INR");

    I.searchFlight();
    let endtext = await I.grabTextFrom('//p[@class="loading-text loader-image"]');
    console.log(endtext.trim());
    (endtext.trim()).should.eql("Please wait while we get you the best fares...");
    I.wait(2);
  }
).tag("F_sce3");

Scenario("Validate Round Trip Traveloption", async ({ I, flightPage }) => {
  I.amOnPage(process.env.GREEN_KART);
  let viewTitle = await I.grabTitle();
  console.log(viewTitle);
  viewTitle.should.eql("GreenKart - veg and fruits kart");

  I.cartHeaderNavlink("Flight Booking");
  I.dontSeeInTitle("GreenKart - veg and fruits kart");
  I.dontSeeCurrentUrlEquals(process.env.GREEN_KART);

  //Flight search for Round Trip

  flightPage.selectCountry("United Arab Emirates");
  flightPage.travelOption("Round Trip", "1");
  flightPage.travelDetails("Hyderabad (HYD)", "Dubai, All Airports(DWC) (DXB)");
 // I.click(`//label[contains(text(),'Depart date')]/../..//input[@name="ctl00$mainContent$view_date1"]`);
  flightPage.selectCalendar("Depart date", "1");
  flightPage.journyDates("9", "29");
  flightPage.selectCalendar("Return date", "2");
  flightPage.journyDates("10", "10");
  flightPage.selectCountryCurrency("AED");
  I.searchFlight();

  let endloader = await I.grabTextFrom('//p[@class="loading-text loader-image"]');
  console.log(endloader.trim());
  (endloader.trim()).should.eql("Please wait while we get you the best fares...");
  I.wait(3);
}).tag("F_sce4");

Scenario("Validate Multicity Traveloption", async ({ I, flightPage }) => {
  I.amOnPage(process.env.GREEN_KART);
  let viewTitle = await I.grabTitle();
  console.log(viewTitle);
  viewTitle.should.eql("GreenKart - veg and fruits kart");

  I.cartHeaderNavlink("Flight Booking");
  I.dontSeeInTitle("GreenKart - veg and fruits kart");
  I.dontSeeCurrentUrlEquals(process.env.GREEN_KART);

  //Flight search for Multicity

  flightPage.selectCountry("United States (USA)");
  flightPage.travelOption("Multicity", "2");
  I.click('//a[@id="MultiCityModelAlert"]');
  I.waitForElement('//div[@id="flightSearchContainer"]', 8);
  I.waitForElement(`//span[@id="spclearDate"]`);
  I.wait(5);

  flightPage.travelDetailsMulticity("1", "Hyderabad (HYD)", "Bengaluru (BLR)");
  flightPage.selectCalendar("Depart date", "1");
  flightPage.journyDates("9", "24");
  flightPage.travelDetailsMulticity("2", "Bengaluru (BLR)", "Mumbai (BOM)");
  //flightPage.selectCalendar("Depart date", "3");
  //flightPage.journyDates("9", "24");

  let depart2 = await I.grabValueFrom(
    "//label[contains(text(),'Depart date')]/../..//input[@name='ctl00$mainContent$view_date3']"
  );
  console.log(depart2);
  depart2.should.eql("28/10");
  flightPage.travelDetailsMulticity("3", "Mumbai (BOM)", "Hyderabad (HYD)");
  // flightPage.selectCalendar("Depart date", "4");
  // flightPage.journyDates("9", "31");

  let depart3 = await I.grabValueFrom(
    "//label[contains(text(),'Depart date')]/../..//input[@name='ctl00$mainContent$view_date4']"
  );
  console.log(depart3);
  depart3.should.eql("04/11");
  


  //Validating one more option

  I.addMoreOptionToMulticity();
  I.click('//input[@id="btnRemove2"]');

  //Selecting Currency

  flightPage.selectCountryCurrency("USD");

  //Validating search functionality

  I.searchFlight();

  let endobserve= await I.grabTextFrom('//p[@class="loading-text loader-image"]');
  console.log(endobserve.trim());
  (endobserve.trim()).should.eql("Please wait while we get you the best fares...");
  I.wait(5);
}).tag("F_sce5");
