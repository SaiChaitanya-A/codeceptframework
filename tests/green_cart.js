require("dotenv").config();

const { assert, expect } = require("chai");
const { locator } = require("codeceptjs");
const should = require("chai").should();
//const chance = require("chance").Chance();

Feature("Buy Vegetables");

Scenario("Verify URL Navigation", async ({ I }) => {

    //Navigate to portal

    I.amOnPage(process.env.GREEN_KART);
    let viewTitle = await I.grabTitle();
    console.log(viewTitle);
    viewTitle.should.eql("GreenKart - veg and fruits kart");
}).tag('sce1');

Scenario("Verify Search Functionality And Add Vegetables To Cart", async ({ I }) => {

    //Search for vegetables with key (Intial letters)

    I.amOnPage(process.env.GREEN_KART);
    let searchItem = await I.inputByPlaceHolder("Search for Vegetables and Fruits", "br");
    console.log(searchItem);
    console.log(searchItem.length);
    I.addToCart(["Brocolli - 1 Kg", "Brinjal - 1 Kg"]);
    I.wait(6);
}).tag('sce2');

Scenario("Verify Cart Info", async ({ I }) => {

    //Navigate to portal and search vegetables with key letter

    I.amOnPage(process.env.GREEN_KART);
    let searchItem = await I.inputByPlaceHolder("Search for Vegetables and Fruits", "br");

    //Validating cartinfo before adding products

    let inCart = await I.retriveCartInfo("Items");
    parseInt(inCart).should.eql(0);
    inCart = await I.retriveCartInfo("Price");
    parseInt(inCart).should.eql(0);

}).tag('sce3');


let searchkeyword = new DataTable(['searchletters']); //
   // searchkeyword.add(["cu"]); // searching with letters
   // searchkeyword.add(["ap"]);
    searchkeyword.add(["br"]);

Data(searchkeyword).Scenario("Verify Cart Info And To Proceed Checkout", async ({ I, current }) => {


    //Navigate to portal and search vegetables with key letter

    I.amOnPage(process.env.GREEN_KART);
   // let searchItem = await I.inputByPlaceHolder("Search for Vegetables and Fruits", "br");

    let searchItem = await I.inputByPlaceHolder("Search for Vegetables and Fruits", current.searchletters);

    //Validating cartinfo before adding products

    let inCart = await I.retriveCartInfo("Items");
    parseInt(inCart).should.eql(0);
    inCart = await I.retriveCartInfo("Price");
    parseInt(inCart).should.eql(0);

    //Validating Cartinfo after adding products

    I.addToCart(searchItem);
    inCart = await I.retriveCartInfo("Items");
    searchItem.length.should.eql(parseInt(inCart));
    inCart = await I.retriveCartInfo("Price");
    let total = await I.totalPrice();
    parseInt(inCart).should.eql(total);

    //Tap on cart-icon for proceed to checkout

    I.proceedToCheckout();
    I.clickButton('PROCEED TO CHECKOUT');

    //Verifying cart & place order info with grid data without applying PROMOCODE

    I.waitForElement('//div[@class="brand greenLogo"]');
    I.waitForVisible('//div[@class="products"]');
    (await I.retriveDataFromGrid('Product Name', 1)).should.eql("Brocolli - 1 Kg");
    (await I.retriveDataFromGrid('Product Name', 2)).should.eql("Brinjal - 1 Kg");
    (await I.retriveDataFromGrid('Quantiry', 1)).should.eql("1");
    (await I.retriveDataFromGrid('Quantiry', 2)).should.eql("1");
    (await I.retriveDataFromGrid('Price', 1)).should.eql("120");
    (await I.retriveDataFromGrid('Price', 2)).should.eql("35");
    (await I.retriveDataFromGrid('Total', 1)).should.eql("120");
    (await I.retriveDataFromGrid('Total', 2)).should.eql("35");


    
    let productsWrapper = await I.grabTextFrom('//div[@class="products-wrapper"]/div[@class="products"]//div');
    console.log(productsWrapper);
    let productsWrapperX=productsWrapper.trim();

    console.log(productsWrapperX);
    return;

    if (productsWrapper.includes(":")) {
        productsWrapper1 = productsWrapper.split(":");
        console.log(productsWrapper1);
       let x = await productsWrapper1[1].split(" ");
       console.log(x[1]);
       await productsWrapper1[2].split(" ");
       console.log(x[2]);
       await productsWrapper1[3].split(" ");
       console.log(x[3]);




    }

    const placeOrderInfo = {
        NoofItems: 2,
        TotalAmount: 155,
        Discount: "0%",
        TotalAfterDiscount: 155
    }


    



    parseInt(await I.orderInfo("Total Amount")).should.eql(placeOrderInfo.TotalAmount);
    (await I.orderInfo("Discount")).should.eql(placeOrderInfo.Discount);
    parseInt(await I.orderInfo("Total After Discount")).should.eql(placeOrderInfo.TotalAfterDiscount);

    //To proceed order

    I.see('Place Order');
    I.clickButton("Place Order");
    I.waitForElement('//div[@class="products"]');
    I.see('Choose Country');
    I.selectDropDown("India");
    let checkbox = `//input[@type="checkbox"]`;
    I.seeElement(checkbox);
    I.dontSeeCheckboxIsChecked(checkbox);
    I.checkOption(checkbox);
    I.see("Proceed");
    I.clickButton('Proceed');

    //Validating url's with end greet

    let endgreet = `//div[@class="wrapperTwo"]`;
    I.waitForElement(endgreet);
    (await I.grabTextFrom(endgreet)).should.eql("Thank you, your order has been placed successfully  You'll be redirected to Home page shortly!!");
    (await I.grabCurrentUrl(endgreet)).should.not.eql(process.env.GREEN_KART);
    I.wait(2);

}).tag('sce4');



Scenario("Verify Cart Info And To Proceed Checkout Using Promocode", async ({ I }) => {

    //Navigate to portal and search vegetables with key letter

    I.amOnPage(process.env.GREEN_KART);
    let searchItem = await I.inputByPlaceHolder("Search for Vegetables and Fruits", "br");

    //Validating cartinfo before adding products

    let inCart = await I.retriveCartInfo("Items");
    parseInt(inCart).should.eql(0);
    inCart = await I.retriveCartInfo("Price");
    parseInt(inCart).should.eql(0);

    //Validating cartinfo after adding products

    I.addToCart(searchItem);
    inCart = await I.retriveCartInfo("Items");
    searchItem.length.should.eql(parseInt(inCart));
    inCart = await I.retriveCartInfo("Price");
    let total = await I.totalPrice();
    parseInt(inCart).should.eql(total);

    //Tap on cart-icon for proceed to checkout

    I.proceedToCheckout();
    I.clickButton('PROCEED TO CHECKOUT');


    //Verifying cart & place order info with grid data after applying PROMOCODE

    await I.inputByPlaceHolder("Enter promo code", process.env.PROMO_CODE);
    I.see("Apply");
    I.clickButton("Apply");
    I.see('Applying ...');
    await I.waitForPromoButtonLoader();
    I.see('Code applied ..!');
    I.wait(10);

    const afterApplyingPromoCodePlaceOrderInfo = {
        NoofItems: 2,
        TotalAmount: 155,
        Discount: "10%",
        TotalAfterDiscount: 139.5
    }


    parseInt(await I.orderInfo("Total Amount")).should.eql(afterApplyingPromoCodePlaceOrderInfo.TotalAmount);
    (await I.orderInfo("Discount")).should.eql(afterApplyingPromoCodePlaceOrderInfo.Discount);
    parseFloat(await I.orderInfo("Total After Discount")).should.eql(afterApplyingPromoCodePlaceOrderInfo.TotalAfterDiscount);

    I.see('Place Order');
    I.clickButton("Place Order");

    // To proceed order

    I.waitForElement('//div[@class="products"]');
    I.see('Choose Country');
    I.selectDropDown("India");
    let checkbox = `//input[@type="checkbox"]`;
    I.seeElement(checkbox);
    I.dontSeeCheckboxIsChecked(checkbox);
    I.checkOption(checkbox);
    I.see("Proceed");
    I.clickButton('Proceed');

    //Validating url's with endgreet.

    let endgreet = `//div[@class="wrapperTwo"]`;
    I.waitForElement(endgreet);
    (await I.grabTextFrom(endgreet)).should.eql("Thank you, your order has been placed successfully  You'll be redirected to Home page shortly!!");
    (await I.grabCurrentUrl(endgreet)).should.not.eql(process.env.GREEN_KART);
    I.wait(2);




}).tag('sce5');


Scenario("To Buy Products", async ({ I }) => {


    //Navigate to portal and search vegetables with key letter

    I.amOnPage(process.env.GREEN_KART);
    let searchItem = await I.inputByPlaceHolder("Search for Vegetables and Fruits", "br");

    //Validating cartinfo before adding products

    let inCart = await I.retriveCartInfo("Items");
    parseInt(inCart).should.eql(0);
    inCart = await I.retriveCartInfo("Price");
    parseInt(inCart).should.eql(0);

    //Validating cartinfo after adding products

    I.addToCart(searchItem);
    inCart = await I.retriveCartInfo("Items");
    searchItem.length.should.eql(parseInt(inCart));
    inCart = await I.retriveCartInfo("Price");
    let total = await I.totalPrice();
    parseInt(inCart).should.eql(total);

    //Tap on cart-icon for proceed to checkout

    I.proceedToCheckout();
    I.clickButton('PROCEED TO CHECKOUT');

    //Verifying cart & place order info with grid data WITHOUT applying PROMOCODE

    I.waitForElement('//div[@class="brand greenLogo"]');
    I.waitForVisible('//div[@class="products"]');
    (await I.retriveDataFromGrid('Product Name', 1)).should.eql("Brocolli - 1 Kg");
    (await I.retriveDataFromGrid('Product Name', 2)).should.eql("Brinjal - 1 Kg");
    (await I.retriveDataFromGrid('Quantiry', 1)).should.eql("1");
    (await I.retriveDataFromGrid('Quantiry', 2)).should.eql("1");
    (await I.retriveDataFromGrid('Price', 1)).should.eql("120");
    (await I.retriveDataFromGrid('Price', 2)).should.eql("35");
    (await I.retriveDataFromGrid('Total', 1)).should.eql("120");
    (await I.retriveDataFromGrid('Total', 2)).should.eql("35");

    const placeOrderInfo = {
        NoofItems: 2,
        TotalAmount: 155,
        Discount: "0%",
        TotalAfterDiscount: 155
    }


    let productsWrapper = await I.grabTextFrom('//div[@class="products-wrapper"]/div[@class="products"]//div');
    console.log(productsWrapper);



    parseInt(await I.orderInfo("Total Amount")).should.eql(placeOrderInfo.TotalAmount);
    (await I.orderInfo("Discount")).should.eql(placeOrderInfo.Discount);
    parseInt(await I.orderInfo("Total After Discount")).should.eql(placeOrderInfo.TotalAfterDiscount);

    //Verifying cart & place order info with grid data WITH applying PROMOCODE

    await I.inputByPlaceHolder("Enter promo code", process.env.PROMO_CODE);
    I.see("Apply");
    I.clickButton("Apply");
    I.see('Applying ...');
    await I.waitForPromoButtonLoader();
    I.see('Code applied ..!');
    I.wait(10);

    const afterApplyingPromoCodePlaceOrderInfo = {
        NoofItems: 2,
        TotalAmount: 155,
        Discount: "10%",
        TotalAfterDiscount: 139.5
    }


    parseInt(await I.orderInfo("Total Amount")).should.eql(afterApplyingPromoCodePlaceOrderInfo.TotalAmount);
    (await I.orderInfo("Discount")).should.eql(afterApplyingPromoCodePlaceOrderInfo.Discount);
    parseFloat(await I.orderInfo("Total After Discount")).should.eql(afterApplyingPromoCodePlaceOrderInfo.TotalAfterDiscount);

    //To proceed order

    I.see('Place Order');
    I.clickButton("Place Order");
    I.waitForElement('//div[@class="products"]');
    I.see('Choose Country');
    I.selectDropDown("India");
    let checkbox = `//input[@type="checkbox"]`;
    I.seeElement(checkbox);
    I.dontSeeCheckboxIsChecked(checkbox);
    I.checkOption(checkbox);
    I.see("Proceed");
    I.clickButton('Proceed');

    //Validating url's with end greet

    let endgreet = `//div[@class="wrapperTwo"]`;
    I.waitForElement(endgreet);
    (await I.grabTextFrom(endgreet)).should.eql("Thank you, your order has been placed successfully  You'll be redirected to Home page shortly!!");
    (await I.grabCurrentUrl(endgreet)).should.not.eql(process.env.GREEN_KART);
    I.wait(2);

}).tag('sce6');


