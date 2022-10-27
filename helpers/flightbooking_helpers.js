const Helper = require('@codeceptjs/helper');
const should = require("chai").should();


class FlightBooking extends Helper{

    async cartHeaderNavlink(text){

        let navlink = `//div/a[contains(.,"${text}")]`;

    await this.helpers.Playwright.waitForElement(navlink);
    await this.helpers.Playwright.click(navlink);
    await this.helpers.Playwright.wait(10);
    await this.helpers.Playwright.switchToNextTab();
   // await this.helpers.Playwright.openNewTab();
    //await this.helpers.Playwright.amOnPage('https://rahulshettyacademy.com/dropdownsPractise/');
    let viewNewTitle = await this.helpers.Playwright.grabTitle();
    console.log(viewNewTitle);
    viewNewTitle.should.eql("QAClickJet - Flight Booking for Domestic and International, Cheap Air Tickets");

    }

    async addMoreOptionToMulticity(){

        let locator = `//input[@id="btnAddMore1"]`;
        let depart5 = `//label[contains(text(),'Depart date')]/../..//input[@name='ctl00$mainContent$view_date5']`;

        await this.helpers.Playwright.waitForElement(locator);
        await this.helpers.Playwright.click(locator);
        await this.helpers.Playwright.waitForElement(depart5);
        await this.helpers.Playwright.seeElement(depart5);
        let date = await this.helpers.Playwright.grabValueFrom(depart5);
        console.log(date);
        date.should.eql("11/11");
    }

    async searchFlight(){

        let searchloactor = `//input[@id="ctl00_mainContent_btn_FindFlights"]`;

        await this.helpers.Playwright.waitForElement(searchloactor);
        await this.helpers.Playwright.click(searchloactor);
        //await this.helpers.Playwright.wait(5);
    }

}


module.exports = FlightBooking;