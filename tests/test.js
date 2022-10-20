Feature("Dropdowns");

Scenario("flight search", async ({ I }) => {
    I.amOnPage('https://rahulshettyacademy.com/dropdownsPractise/');
    I.click('//input[@id="autosuggest"]');
    I.fillField('//input[@id="autosuggest"]', 'India');
    I.click('//input[@id="ctl00_mainContent_ddl_originStation1_CTXT"]');
    I.fillField('//input[@id="ctl00_mainContent_ddl_originStation1_CTXT"]', 'Goa (GOI)');
    //I.click('//input[@id="ctl00_mainContent_ddl_destinationStation1_CTXT"]');
    I.fillField('//input[@id="ctl00_mainContent_ddl_destinationStation1_CTXT"]', 'Hyderabad (HYD)');
    I.seeElement('//div[@id="ui-datepicker-div"]');
    I.click(`//td[@data-month="9"]//a[text()="18"]`);
    //I.click("//input[@name='ctl00$mainContent$view_date2']");
    I.click("//label[contains(text(),'Return date')]/../..//input[@name='ctl00$mainContent$view_date2']");
    I.click(`//td[@data-month="9"]//a[text()="27"]`);
    I.see('1 Adult');
    I.selectOption('//label[contains(.,"Currency")]/../..//select', 'AED');
    console.log("hi");
   




    ///multicity


    //div[@id="MultiCityModelPopup"]
    //a[text()="Ok"]



    I.wait(5);


});
