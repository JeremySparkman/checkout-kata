module.exports = {
  StoreItem : class {
    constructor(name, price, weight = 1, quantity = 1){
      this.name = name;
      this.price = price;
      this.weight = weight;
      this.quantity = quantity;
    }
  },
  Cart : class {

  }
}