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
    getTotal(){
      return (this.pricePerPound() * this.quantity);
    }
    calculateItemTotal(){
      if (this.special){
        return this.calculateSpecial();
      } else {
        return this.getTotal();
      }
    }
    addSpecial(special){
      this.special = special;
    }
    calculateSpecial(){
      let total = this.getTotal();
      let Special = this.special;
      let quantity = this.quantity;
      let price = this.pricePerPound();
      let minimumQuantityForDiscount = Special.qualifyingQuantity + Special.discountedQuantity;

      while (quantity >= minimumQuantityForDiscount){
        if (Special.isPercentOff){
          let discountTotal = (price * Special.discountedQuantity) * Special.discount;
          total -= discountTotal;
          quantity -= minimumQuantityForDiscount;
        }
      }

      return total;
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
        return a + b.calculateItemTotal();
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
