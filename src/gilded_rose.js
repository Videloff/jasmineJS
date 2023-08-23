class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.maxLegendaryQuality = 80;
    this.maxQuality = 50;
    this.initialQuality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].sellIn -= 1;
      if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
        this.items[i].quality = this.items[i].maxLegendaryQuality;
      } else if(this.items[i].name == 'Aged Brie') {
        if(this.items[i].sellIn >= 0 && this.items[i].quality < this.items[i].maxQuality) {
          this.items[i].quality += 1;
        } else {
          this.items[i].quality = 0;
        }
      } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'){ 
        if(this.items[i].sellIn > 10) {
          this.items[i].quality < this.items[i].maxQuality ? this.items[i].quality += 1 : this.items[i].quality ;
        } else if(this.items[i].sellIn <= 10 && this.items[i].sellIn > 5) {
          this.items[i].quality + 2 > this.items[i].maxQuality ? this.items[i].quality = this.items[i].maxQuality : this.items[i].quality += 2;
        } else if(this.items[i].sellIn >=0 && this.items[i].sellIn < 5) {
          this.items[i].quality + 3 > this.items[i].maxQuality ? this.items[i].quality = this.items[i].maxQuality : this.items[i].quality += 3;
        } else {
          this.items[i].quality = 0;
        }
      } else if(this.items[i].name.startsWith("Conjured")) {
        if(this.items[i].sellIn >= 0) {
          this.items[i].quality - 2 < 0 ? this.items[i].quality = 0 : this.items[i].quality -= 2;
        } else if(this.items[i].sellIn < 0) {
          this.items[i].quality - 4 < 0 ? this.items[i].quality = 0 : this.items[i].quality -= 4;
        }
      } else {
        if(this.items[i].sellIn >= 0 && this.items[i].quality > 0) {
          this.items[i].quality -= 1;
        } else if(this.items[i].sellIn < 0 ) {
          this.items[i].quality - 2 < 0 ? this.items[i].quality = 0 : this.items[i].quality -= 2;
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}