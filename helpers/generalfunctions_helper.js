const Helper = require('@codeceptjs/helper');
const should = require("chai").should();

class GeneralFunctions extends Helper {

  async inputByPlaceHolder(fieldName, value) {
    let locator = `//input[@placeholder="${fieldName}"]`;
    await this.helpers.Playwright.waitForElement(locator, 30);
    await this.helpers.Playwright.fillField(locator, value);

    let itemCount = await this.helpers.Playwright.grabNumberOfVisibleElements('//div[@class="product"]');
    await this.helpers.Playwright.wait(2);

    let visibleItem = await this.helpers.Playwright.grabTextFromAll('//h4[@class="product-name"]');
    itemCount.should.eql(visibleItem.length);

    return visibleItem;
  }

  async addToCart(productName) {

    for (let i = 0; i < productName.length; i++) {

      let productLocator = `//h4[text()="${productName[i]}"]`;
      await this.helpers.Playwright.waitForElement(productLocator, 30);
      await this.helpers.Playwright.click(`${productLocator}/..//button[text()="ADD TO CART"]`);

    }

  }

  async retriveCartInfo(infoTagName) {
    await this.helpers.Playwright.seeElement(
      `//td[text()="${infoTagName}"]/..//strong`
    );
    return await this.helpers.Playwright.grabTextFrom(
      `//td[text()="${infoTagName}"]/..//strong`
    );
  }

  async totalPrice() {

    let total = await this.helpers.Playwright.grabTextFromAll('//div[@class="product"]/..//p[@class="product-price"]');

    let sum = 0;

    for (let i = 0; i < total.length; i++) {
      sum = sum + parseInt(total[i]);
    }
    return sum;
  }


  async clickButton(value) {
    let locator = `//button[contains(.,"${value}")]`;
    await this.helpers.Playwright.waitForElement(locator, 30);
    await this.helpers.Playwright.click(locator);
  }

  async proceedToCheckout() {

    await this.helpers.Playwright.seeElement('//a[@class="cart-icon"]');
    await this.helpers.Playwright.click('//a[@class="cart-icon"]');
    await this.helpers.Playwright.seeElement('//ul[@class="cart-items"]');
    await this.helpers.Playwright.see('PROCEED TO CHECKOUT');

  }

  async retriveDataFromGrid(cloumnname, rownum) {
    let locator = `//b[text()='${cloumnname}']/../ancestor::table//tbody/tr[${rownum}]`;

    let text;
    switch (cloumnname) {
      case "Product Name":
        locator = `${locator}/td[2]/p`;
        text = await this.helpers.Playwright.grabTextFrom(locator);
        break;

      case "Quantiry":
        locator = `${locator}/td[3]/p`;
        text = await this.helpers.Playwright.grabTextFrom(locator);
        break;
      case "Price":
        locator = `${locator}/td[4]/p`;
        text = await this.helpers.Playwright.grabTextFrom(locator);
        break;

      default:
        locator = `${locator}/td[5]/p`;
        text = await this.helpers.Playwright.grabTextFrom(locator);
        break;

    }
    return text;

  }

  async orderInfo(labelname) {
    let locator;
    let text;
    switch (labelname) {
      case "Total Amount":
        locator = `//span[@class='totAmt']`;
        text = await this.helpers.Playwright.grabTextFrom(locator);
        break;

      case "Discount":
        locator = `//span[@class='discountPerc']`;
        text = await this.helpers.Playwright.grabTextFrom(locator);
        break;
      case "Total After Discount":
        locator = `//span[@class='discountAmt']`;
        text = await this.helpers.Playwright.grabTextFrom(locator);
        break;

      default:
        text = console.log(no);
        break;
    }
    return text;

  }

  async waitForPromoButtonLoader() {
    await this.helpers.Playwright.waitForInvisible('//span[@class="promo-btn-loader"]', 40);
  }


  async selectDropDown(countryname) {

    let selector = `//select[@style="width: 200px;"]`;
    await this.helpers.Playwright.waitForElement(
      `${selector}`,
      15

    );
    await this.helpers.Playwright.click(`${selector}`
    );

    await this.helpers.Playwright.selectOption(selector, countryname);

  }

}

module.exports = GeneralFunctions;
