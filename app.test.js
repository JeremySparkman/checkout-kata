const app = require('./app');

describe('setup objects', () => {
  test('expect StoreItem to be defined', () => {
    expect(app.StoreItem).toBeDefined();
  });
  test('expect Cart to be defined', () => {
    expect(app.Cart).toBeDefined();
  });
});

describe('StoreItem', () => {
  test('Create a StoreItem with a name', () => {
    expect(new app.StoreItem('bananas')).toEqual(
      expect.objectContaining({
        name : expect.any(String)
      })
    );
  });
  test('Create a StoreItem with a price', () => {
    expect(new app.StoreItem('bananas', 2.38)).toEqual(
      expect.objectContaining({
        name : expect.any(String),
        price : expect.any(Number)
      })
    );
  });
  test('Create a StoreItem with a weight', () => {
    expect(new app.StoreItem('bananas', 2.38, 2)).toEqual(
      expect.objectContaining({
        name : expect.any(String),
        price : expect.any(Number),
        weight : expect.any(Number)
      })
    );
  });
  test('Create a StoreItem with a quantity', () => {
    expect(new app.StoreItem('bananas', 2.38, 2, 2)).toEqual(
      expect.objectContaining({
        name : expect.any(String),
        price : expect.any(Number),
        weight : expect.any(Number),
        quantity : expect.any(Number)
      })
    );
  });
  test('Create a StoreItem with a markdown', () => {
    expect(new app.StoreItem('bananas', 2.38, 2, 1, 3)).toEqual(
      expect.objectContaining({
        name : expect.any(String),
        price : expect.any(Number),
        weight : expect.any(Number),
        quantity : expect.any(Number),
        markdown : expect.any(Number)
      })
    );
  });
  describe('Calculate', () => {
    test('Price per pound', () => {
      let bananas = new app.StoreItem('bananas', 2.38, 2);
      expect(bananas.pricePerPound()).toBe(4.76);
    });
  })
});

describe('Markdowns', () => {
  test('Add markdown after StoreItem has been created', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    bananas.addMarkdown(3);
    expect(bananas).toEqual(
      expect.objectContaining({
        markdown : 3.00
      })
    );
  });
});