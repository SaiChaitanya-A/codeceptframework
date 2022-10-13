const Helper = require('@codeceptjs/helper');
const should = require("chai").should();


class FlightBooking extends Helper{

    async cartHeaderNavlink(text){

        let navlink = `//div/a[contains(.,"${text}")]`;

    await this.helpers.Playwright.seeElement(navlink);
    await this.helpers.Playwright.click(navlink);

    await this.helpers.Playwright.amOnPage('https://rahulshettyacademy.com/dropdownsPractise/');

    let viewNewTitle = await this.helpers.Playwright.grabTitle();
    console.log(viewNewTitle);
    viewNewTitle.should.eql("QAClickJet - Flight Booking for Domestic and International, Cheap Air Tickets");



    }
}


module.exports = FlightBooking;