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
    I.click(`//a[@class="ui-state-default ui-state-active" and text()="18"]`);

    I.wait(5);


});
