const { I } = inject();

module.exports = {
  async selectCountry(Country) {
    let selectlocator = '//input[@id="autosuggest"]';

    I.click(selectlocator);
    I.fillField(selectlocator, Country);
  },

  async travelOption(option, value) {
    let locator = `//label[text()='${option}']/../..//input[@id="ctl00_mainContent_rbtnl_Trip_${value}"]`;

    I.checkOption(
      //`//label[text()='Round Trip']/../..//input[@id="ctl00_mainContent_rbtnl_Trip_1"]`
      locator
    );
  },

  async travelDetails(fromcity, tocity) {
    let originlocator = `//input[@id="ctl00_mainContent_ddl_originStation1_CTXT"]`;
    let destinationlocator = `//input[@id="ctl00_mainContent_ddl_destinationStation1_CTXT"]`;

    I.click(originlocator);
    I.fillField(originlocator, fromcity);
    I.fillField(destinationlocator, tocity);
    I.wait(2);
  },

  async travelDetailsMulticity(value, fromcity, tocity) {
    let originlocator = `//input[@id="ctl00_mainContent_ddl_originStation${value}_CTXT"]`;
    let destinationlocator = `//input[@id="ctl00_mainContent_ddl_destinationStation${value}_CTXT"]`;

    I.click(originlocator);
    I.fillField(originlocator, fromcity);
    I.fillField(destinationlocator, tocity);
    I.wait(2);
  },

  async journyDates(month, date) {
     I.waitForElement('//div[@id="ui-datepicker-div"]');
     I.click(`//td[@data-month="${month}"]//a[text()="${date}"]`);
    I.see("1 Adult");
  },

  async selectCalendar(text, value) {
    let datelocator = `//label[contains(text(),'${text}')]/../..//input[@name='ctl00$mainContent$view_date${value}']`;

    //label[contains(text(),'Return date')]/../..//input[@name="ctl00$mainContent$view_date2"]

    I.waitForElement(`//label[contains(text(),'${text}')]/../..//input[@name='ctl00$mainContent$view_date${value}']`);
    I.click(datelocator);
    // I.click(`//td[@data-month="9"]//a[text()="27"]`);
  },

  async selectCountryCurrency(value) {
    I.waitForElement('//label[contains(.,"Currency")]/../..//select');
    I.selectOption('//label[contains(.,"Currency")]/../..//select', value);
    // I.wait(2);
  },
};
