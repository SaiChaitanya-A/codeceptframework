const { helper } = require("codeceptjs");

class CommonFunctions extends helper {
    async loginInput(fieldName, value){
        
        let inputlocator = `//input[@id="${fieldName}"]` ;

    await this.helpers.Playwright.waitForElement(inputlocator, 30);
    await this.helpers.Playwright.click(inputlocator);
    await this.helpers.Playwright.fillField(inputlocator, value);

    }

    async clickText(text){
        

        let locator = `//span[contains(., "${text}")] `;

        await this.helpers.Playwright.waitForElement(locator, 15);
        await this.helpers.Playwright.click(locator);

    }

    async waitForProcessing(){
        

        let locator = `//span[contains(., "Processing")]`;

        await this.helpers.Playwright.waitForInvisible(locator, 60);



    }
}

module.exports = CommonFunctions;