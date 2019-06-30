const app = require('./app');

describe('setup objects', () => {
  test('expect StoreItem to be defined', () => {
    expect(app.StoreItem).toBeDefined();
  });
});