const app = require('./app');

describe('setup objects', () => {
  test('expect StoreItem to be defined', () => {
    expect(app.StoreItem).toBeDefined();
  });
  test('expect Cart to be defined', () => {
    expect(app.Cart).toBeDefined();
  });
  test('expect Special to be defined', () => {
    expect(app.Special).toBeDefined();
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
      expect(bananas.calculatePricePerPound()).toBe(4.76);
    });
  })
});

describe('Cart', () => {
  beforeEach(() => {
    app.Cart.lineItems = [];
  });
  test('Add a StoreItem to the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let Cart = app.Cart;
    Cart.addLineItem(bananas);
    expect(Cart.lineItems[0]).toBe(bananas);
  });
  test('remove an item from the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let beer = new app.StoreItem('beer', 12);
    let Cart = app.Cart;
    Cart.addLineItem(bananas);
    Cart.addLineItem(beer);
    expect(Cart.lineItems.length).toBe(2);
    Cart.removeLineItem();
    expect(Cart.lineItems.length).toBe(1);
    expect(Cart.lineItems[0].name).toBe('bananas');
  });
  test('remove an item from the cart by name', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let kombucha = new app.StoreItem('kombucha', 5);
    let beer = new app.StoreItem('beer', 12);
    let Cart = app.Cart;
    Cart.addLineItem(bananas);
    Cart.addLineItem(kombucha);
    Cart.addLineItem(beer);
    expect(Cart.lineItems.length).toBe(3);
    Cart.removeLineItem('kombucha');
    expect(Cart.lineItems.length).toBe(2);
    expect(Cart.lineItems[1].name).toBe('beer');
  });
  test('update quantity of an item within the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38, 1, 2);
    let kombucha = new app.StoreItem('kombucha', 5, 1, 3);
    let beer = new app.StoreItem('beer', 12, 1, 4);
    let Cart = app.Cart;
    Cart.addLineItem(bananas);
    Cart.addLineItem(kombucha);
    Cart.addLineItem(beer);
    expect(Cart.lineItems.length).toBe(3);
    Cart.updateQuantity('bananas', 1);
    expect(Cart.lineItems[0].quantity).toBe(1);
    Cart.updateQuantity('kombucha', 2);
    expect(Cart.lineItems[1].quantity).toBe(2);
    Cart.updateQuantity('beer', 3);
    expect(Cart.lineItems[2].quantity).toBe(3);
  });
  test('when updating the quantity of an item, if set to zero, remove the item from the cart', () => {
    let bananas = new app.StoreItem('bananas', 2.38);
    let kombucha = new app.StoreItem('kombucha', 5);
    let beer = new app.StoreItem('beer', 12);
    let Cart = app.Cart;
    Cart.addLineItem(bananas);
    Cart.addLineItem(kombucha);
    Cart.addLineItem(beer);
    expect(Cart.lineItems.length).toBe(3);
    Cart.updateQuantity('kombucha', 0);
    expect(Cart.lineItems.length).toBe(2);
    expect(Cart.lineItems[1].name).toBe('beer');
  });

  describe('Calculate', () => {
    test('calculate total after adding item to the cart', () => {
      let bananas = new app.StoreItem('bananas', 2.38);
      let Cart = app.Cart;
      Cart.addLineItem(bananas);
      expect(Cart.calculateCartTotal()).toBe(2.38);
    });
    test('calculate total after adding multiple items to the cart', () => {
      let bananas = new app.StoreItem('bananas', 2.38, .5);
      let soup = new app.StoreItem('soup', 1.89);
      let chips = new app.StoreItem('chips', 4, 1, 2);
      let Cart = app.Cart;
      Cart.addLineItem(bananas);
      Cart.addLineItem(soup);
      Cart.addLineItem(chips);
      expect(Cart.calculateCartTotal()).toBe(11.08);
    });
    test('calculate total after adding/updating/removing an item from the cart', () => {
      //add
      let bananas = new app.StoreItem('bananas', 2.38);
      expect(app.Cart.addLineItem(bananas)).toBe(2.38);
      let beer = new app.StoreItem('beer', 12);
      expect(app.Cart.addLineItem(beer)).toBe(14.38);
      
      //update
      expect(app.Cart.updateQuantity('beer', 3)).toBe(38.38);
  
      //remove
      expect(app.Cart.removeLineItem('beer')).toBe(2.38);
      expect(app.Cart.updateQuantity('bananas', 0)).toBe(0);
    });
    test('when calculating the cart, total should be in money format, no extra decimals', () => {
      let bananas = new app.StoreItem('bananas', 2.38);
      let kombucha = new app.StoreItem('kombucha', 5.76);
      let beer = new app.StoreItem('beer', 9.99);
      let Cart = app.Cart;
      Cart.addLineItem(bananas);
      Cart.addLineItem(kombucha);
      Cart.addLineItem(beer);
      expect(Cart.calculateCartTotal()).toBe(18.13);
    });
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
  describe('Calculate', () => {
    test('Calculate total after adding markdown to an item', () => {
      let beer = new app.StoreItem('beer', 10, 1, 2, 2);
      expect(beer.calculateItemTotal()).toEqual(16);
    });
    test('Calculate total after adding markdown to a weighted item', () => {
      let beer = new app.StoreItem('bananas', 2.50, 3, 1, .25);
      expect(beer.calculateItemTotal()).toEqual(6.75);
    });
  });
});

describe('Specials', () => {
  test('Create specials in the form, Buy N items get M at %X off.', () => {
    let buy1get1free = new app.Special(2, 1, 1, true);
    expect(buy1get1free).toEqual(
      expect.objectContaining({
        qualifyingQuantity : 2,
        discountedQuantity : 1,
        discount : 1
      })
    );
  });
  test('Add a Special to a StoreItem', () => {
    let buy1get1free = new app.Special(2, 1, 1, true);
    let beer = new app.StoreItem('beer', 10, 1, 2);
    beer.addSpecial(buy1get1free);
    expect(beer.special).toBe(buy1get1free);
  });
  test('Calculate a buy 1 get 1 100% off / free special', () => {
    let buy1get1free = new app.Special(1, 1, 1, true);
    let beer = new app.StoreItem('beer', 10, 1, 4);
    beer.addSpecial(buy1get1free);
    expect(beer.calculateItemTotal()).toBe(20);
  });
  test('Calculate a buy 1 get 1 25% off special', () => {
    let buy1get1free = new app.Special(1, 1, .25, true);
    let beer = new app.StoreItem('beer', 10, 1, 2);
    beer.addSpecial(buy1get1free);
    expect(beer.calculateItemTotal()).toBe(17.5);
  });
  test('Calculate buy X for $Y off', () => {
    let buyXforY = new app.Special(3, 3, 5, false);
    let popcorn = new app.StoreItem('popcorn', 5, 1, 4); 
    popcorn.addSpecial(buyXforY);
    expect(popcorn.calculateItemTotal()).toBe(10);
  });
  test('Support limit on specials for Buy X get Y for %Z off', () => {
    let buyXforYLimit3 = new app.Special(1, 1, 1, true, 3);
    let popcorn = new app.StoreItem('popcorn', 3, 1, 8);
    popcorn.addSpecial(buyXforYLimit3);
    expect(popcorn.calculateItemTotal()).toBe(15);
  });
  test('invalidate a special when the items quantity no longer qualifies for it', () => {
    app.Cart.lineItems = [];
    let buy3get1free = new app.Special(3, 1, 1, true);
    let accentureRobot = new app.StoreItem('Squishy Accenture Robot', 2, 1, 4);
    let popcorn = new app.StoreItem('popcorn', 2, 1, 2);
    accentureRobot.addSpecial(buy3get1free);
    app.Cart.addLineItem(accentureRobot);
    app.Cart.addLineItem(popcorn);
    expect(app.Cart.calculateCartTotal()).toBe(10);
    app.Cart.updateQuantity('Squishy Accenture Robot', 2);
    expect(app.Cart.calculateCartTotal()).toBe(8);
  });
  test('Support buy N, get M, of equal or lesser value for %X off on weighted items', () => {
    let buyNgetMforX = new app.Special(3, 1, .5, true, false, true);
    let beef = new app.StoreItem('beef', 1, 4);
    beef.addSpecial(buyNgetMforX);
    expect(beef.calculateItemTotal()).toBe(3.50)
  });
  test('Calculate Buy X Get Y weighted Special with a markdown', () =>{
    let buyNgetMforX = new app.Special(3, 1, .5, true, false, true);
    let beef = new app.StoreItem('beef', 1, 4);
    beef.addMarkdown(.25);
    beef.addSpecial(buyNgetMforX);
    expect(beef.calculateItemTotal()).toBe(2.63)
  });
  test('Calculate Buy X for $Y special with a markdown', () => {
    let buyXforY = new app.Special(3, 3, 5, false);
    let popcorn = new app.StoreItem('popcorn', 5, 1, 4, 1); 
    popcorn.addSpecial(buyXforY);
    expect(popcorn.calculateItemTotal()).toBe(9);
  });
});