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
      return (this.price - this.markdown) * this.weight;
    }
    getItemTotal(){
      return this.pricePerPound() * this.quantity;
    }
  },
  Cart : {
    lineItem : [],
    addItem(storeItem){
      this.lineItem.push(storeItem);
    },
    getCartTotal : function(){
      let total = 0;
      return this.lineItem.reduce((a,b) => {
        return a + b.getItemTotal();
      }, total);
    }
  }
}
