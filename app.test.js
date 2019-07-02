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

describe('Cart', () => {
  beforeEach(() => {
    app.Cart.lineItem = [];
  });
  test('Add a StoreItem to the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let Cart = app.Cart;
    Cart.addItem(bananas);
    expect(Cart.lineItem[0]).toBe(bananas);
  });
  test('calculate total after adding item to the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let Cart = app.Cart;
    Cart.addItem(bananas);
    expect(Cart.getCartTotal()).toBe(2.38);
  });
  test('calculate total after adding multiple items to the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38, .5);
    let soup = new app.StoreItem('soup', 1.89);
    let chips = new app.StoreItem('chips', 4, 1, 2);
    let Cart = app.Cart;
    Cart.addItem(bananas);
    Cart.addItem(soup);
    Cart.addItem(chips);
    expect(Cart.getCartTotal()).toBe(11.08);
  });
  test('remove an item from the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let beer = new app.StoreItem('beer', 12);
    let Cart = app.Cart;
    Cart.addItem(bananas);
    Cart.addItem(beer);
    expect(Cart.lineItem.length).toBe(2);
    Cart.removeLineItem();
    expect(Cart.lineItem.length).toBe(1);
    expect(Cart.lineItem[0].name).toBe('bananas');
  });
  test('remove an item from the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let kombucha = new app.StoreItem('kombucha', 5);
    let beer = new app.StoreItem('beer', 12);
    let Cart = app.Cart;
    Cart.addItem(bananas);
    Cart.addItem(kombucha);
    Cart.addItem(beer);
    expect(Cart.lineItem.length).toBe(3);
    Cart.removeLineItem('kombucha');
    expect(Cart.lineItem.length).toBe(2);
    expect(Cart.lineItem[1].name).toBe('beer');
  });
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
  test('Calculate total after adding markdown to an item', () => {
    let beer = new app.StoreItem('beer', 10, 1, 2, 2);
    expect(beer.getItemTotal()).toEqual(16);
  });
  test('Calculate total after adding markdown to a weighted item', () => {
    let beer = new app.StoreItem('bananas', 2.50, 3, 1, .25);
    expect(beer.getItemTotal()).toEqual(6.75);
  });
});