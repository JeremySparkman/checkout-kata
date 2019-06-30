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
});