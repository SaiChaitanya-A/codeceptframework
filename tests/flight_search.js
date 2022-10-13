require("dotenv").config();

Feature("verify");

Scenario("flight booking", async ({ I, flightbookingpage, input }) => {

    I.amOnPage(process.env.GREEN_KART);
    let viewTitle = await I.grabTitle();
    console.log(viewTitle);
    viewTitle.should.eql("GreenKart - veg and fruits kart");

    I.cartHeaderNavlink("Flight Booking");
    I.dontSeeInTitle('GreenKart - veg and fruits kart');
    I.dontSeeCurrentUrlEquals(process.env.GREEN_KART);

    I.seeElement('//input[@id="autosuggest"]');

    // let check = await I.grabTextFromAll('//input[@placeholder="Type to Select"]/.');
    // console.log(check);

    
    input.inputByPlaceHolder("Type to Select", "India");
    I.seeElement('//div[@id="buttons"]');
    
    I.seeElement('//div[@id="travelOptions"]');
    let travelOptions = await I. grabTextFrom('//div[@id="travelOptions"]');
    console.log(travelOptions);
    flightbookingpage.selectCity("Multicity");
    //I.click('//label[contains(.,"Multicity")]');
    // I.click('//div/table/tbody/tr//td//label[contains(.,"Multicity")]');

    I.wait(3);






});