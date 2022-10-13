const { I } = inject();

async function inputByPlaceHolder(fieldName, value){
    let locator = `//input[@placeholder="${fieldName}"]`;

    
    I.waitForElement(locator, 30);
    I.seeElement(locator);
    I.click(locator);
    I.fillField(locator, value);
    I.wait(5);
    I.click(value);

    // I.seeElement('//div[@id="buttons"]');
    // I.seeElement('//input[@placeholder="Type to Select"]');
    // I.fillField('//input[@placeholder="Type to Select"]', 'Ind');
    // I.seeElement('//div[@id="travelOptions"]');
    // //I.click('//label[contains(.,"Multicity")]');
    // I.click('//div/table/tbody/tr//td//label[contains(.,"Multicity")]');





    
    
    
    


}

module.exports = {
    inputByPlaceHolder:inputByPlaceHolder
}