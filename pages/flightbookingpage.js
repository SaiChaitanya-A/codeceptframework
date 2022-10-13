const { I } = inject();

module.exports = {

  selectCity(cityName){

    //let locator = `//div/table/tbody/tr//td//label[contains(.,"${cityName}")]`;

    let locator = `//div[@id='travelOptions']/..//label[text()='${cityName}']/..//input`

    I.waitForElement(locator, 15);
    I.click(locator);

  },

}
