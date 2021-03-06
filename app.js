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
    addSpecial(special){
      this.special = special;
    }
    getTotal(){
      return (this.calculatePricePerPound() * this.quantity);
    }
    calculatePricePerPound(){
      return (this.price - this.markdown) * this.weight;
    }
    calculateItemTotal(){
      if (this.special){
        return Number((this.calculateSpecial()).toFixed(2));
      } else {
        return Number((this.getTotal()).toFixed(2));
      }
    }
    calculateSpecial(){
      let total = this.getTotal();
      let Special = this.special;
      let quantity = Special.isWeightedDiscount ? this.weight : this.quantity;
      let price = this.price - this.markdown;

      if (Special.isPercentOff){
        let minimumQuantityForDiscount = Special.qualifyingQuantity + Special.discountedQuantity;
        let discountedItemsCount = 0;

        while (quantity >= minimumQuantityForDiscount && discountedItemsCount !== Special.limit){
          let discountTotal = (price * Special.discountedQuantity) * Special.discount;
          total -= discountTotal;
          quantity -= minimumQuantityForDiscount;
          discountedItemsCount += Special.discountedQuantity;
        }

        return total;

      } else {
        let minimumQuantityForDiscount = Special.qualifyingQuantity;

        if (quantity >= minimumQuantityForDiscount){
          total = Special.discount + ((quantity - minimumQuantityForDiscount) * price);
        }

        return total;
      }
    }
  },
  Special : class {
    constructor(qualifyingQuantity, discountedQuantity, discount, isPercentOff, limit = false, isWeightedDiscount){
      this.qualifyingQuantity = qualifyingQuantity;
      this.discountedQuantity = discountedQuantity;
      this.discount = discount;
      this.isPercentOff = isPercentOff;
      this.limit = limit;
      this.isWeightedDiscount = isWeightedDiscount;
    }
  },
  Cart : {
    lineItems : [],
    addLineItem(storeItem){
      this.lineItems.push(storeItem);
      return this.calculateCartTotal();
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
      return this.calculateCartTotal();
    },
    updateQuantity(itemToUpdate, newQuantity){
      this.lineItems.forEach((storeItem, index) => {
        if (storeItem.name === itemToUpdate){
          if(newQuantity === 0){
            this.lineItems.splice(index, 1);
          } else {
            storeItem.quantity = newQuantity;
          }
        }
      });
      return this.calculateCartTotal();
    },
    calculateCartTotal(){
      let total = 0;
      total = this.lineItems.reduce((a,b) => {
        return a + b.calculateItemTotal();
      }, total);
      return Number(total.toFixed(2));
    }
  }
}
