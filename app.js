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
    addSpecial(special){
      this.special = special;
    }
  },
  Special : class {
    constructor(qualifyingQuantity, discountedQuantity, discount, isPercentOff){
      this.qualifyingQuantity = qualifyingQuantity;
      this.discountedQuantity = discountedQuantity;
      this.discount = discount;
      this.isPercentOff = isPercentOff;
    }
  },
  Cart : {
    lineItems : [],
    addItem(storeItem){
      this.lineItems.push(storeItem);
    },
    getCartTotal : function(){
      let total = 0;
      return this.lineItems.reduce((a,b) => {
        return a + b.getItemTotal();
      }, total);
    },
    removeLineItem(itemToRemove){
      if (itemToRemove){
        this.lineItems.forEach((storeItem, index) => {
          if (storeItem.name === itemToRemove){
            this.lineItems.splice(index, 1);
          }
        });
      } else {
        this.lineItems.pop();
      }
    }
  }
}
