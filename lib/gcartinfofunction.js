const { I } = inject();


async function cartinfo(fieldname, value) {
    if (fieldname.includes(":")) {
        fieldname = fieldname.slice(":");

        I.waitForElement(`//div[@class="products-wrapper"]/div[@class="products"]//div`);
        let x = await I.grabTextFrom(fieldname, value);
        console.log(x);

    }
  }

module.exports = {
    cartinfo: cartinfo,

  };