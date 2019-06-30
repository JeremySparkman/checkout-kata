module.exports = {
  StoreItem : class {
    constructor(name, price, weight = 1, quantity = 1, markdown = 0){
      this.name = name;
      this.price = price;
      this.weight = weight;
      this.quantity = quantity;
      this.markdown = markdown;
    }
    addMarkdown(markdown){
      this.markdown = markdown;
    }
    pricePerPound(){
      return this.price * this.weight;
    }
  },
  Cart : {
    lineItem : [],
    addItem(storeItem){
      this.lineItem.push(storeItem);
    }
  }
}