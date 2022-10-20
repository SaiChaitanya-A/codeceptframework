const { I } = inject();

module.exports = {
  async selecectNavIcon(text) {
    let navlocator = `//i[@class="${text}"]`;
    await I.seeElement(navlocator);
    await I.forceClick(navlocator);
  },
};
