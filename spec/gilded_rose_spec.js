const {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  const items = [
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 38),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 35),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
    new Item("Aged Brie", 2, 0),
    new Item("Aged Brie", 0, 10),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("+5 Dexterity Vest", 8, 0),
    new Item("Elixir of the Mongoose", 0, 7),
    new Item("Elixir of the Mongoose", -2, 1),
    new Item("Conjured Shoes of Death", 3, 6),
    new Item("Conjured Shoes of Death", 5, 3),
    new Item("Conjured Mana Cake", -3, 12),
    new Item("Conjured Mana Cake", 0, 6),
  ];
  
  const days = Number(process.argv[2]) || 2;
  const gildedRose = new Shop(items);
  
  console.log("OMGHAI!");
  for (let day = 0; day < days; day++) {
    console.log(`\n-------- day ${day} --------`);
    console.log("name, sellIn, quality");
    items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
    gildedRose.updateQuality();
  }

  it("La qualité du backstage passes augmente de 1 si il reste 11 jours ou plus, jusqu'à un maximum de 50", function() {
    expect(items[0].initialQuality + 1 + 1).toEqual(items[0].quality);
    expect(items[0].quality).toBeLessThanOrEqual(items[0].maxQuality);
    expect(items[1].quality).toEqual(items[1].maxQuality);

  });

  it("La qualité du backstage passes augmente de 2 si il reste entre 6 et 10 jours, jusqu'à un maximum de 50", function() {
    expect(items[2].initialQuality + 2 + 2).toEqual(items[2].quality);
    expect(items[2].quality).toBeLessThanOrEqual(items[2].maxQuality);
    expect(items[3].quality).toEqual(items[3].maxQuality);
  });

  it("La qualité du backstage passes augmente de 3 si il reste moins de 5 jours, jusqu'à un maximum de 50", function() {
    expect(items[4].initialQuality + 3 + 3).toEqual(items[4].quality);
    expect(items[4].quality).toBeLessThanOrEqual(items[4].maxQuality);
    expect(items[5].quality).toEqual(items[5].maxQuality);
  });

  it("La qualité du backstage passes tombe à 0 après le concert", function() {
    expect(items[6].quality).toEqual(0);
  });

  it("La qualité de Aged Brie augmente avant le concert", function() {
    expect(items[7].quality).toBeGreaterThan(items[7].initialQuality);
  });

  it("La qualité de Aged Brie tombe à 0 après le concert", function() {
    expect(items[8].quality).toEqual(0);
  });

  it("La qualité Sulfura ne change jamais et reste à 80", function() {
    expect(items[9].quality).toEqual(items[9].maxLegendaryQuality);
    expect(items[10].quality).toEqual(items[10].maxLegendaryQuality);
  });

  it("Un objet classique perd 1 de qualité chaque jour avant le concert puis deux par jour après le concert, jusqu'à un minimum de 0.", function() {
    expect(items[11].initialQuality - 1 - 1).toEqual(items[11].quality);
    expect(items[12].quality).toEqual(0);
    expect(items[13].initialQuality - 2 - 2).toEqual(items[13].quality);
    expect(items[14].quality).toEqual(0);
  });

  it("Un objet conjured perd 2 de qualité chaque jour avant le concert, puis quatre par jour après le concert, jusqu'à un minimum de 0.", function() {
    expect(items[15].initialQuality - 2 - 2).toEqual(items[15].quality);
    expect(items[16].quality).toEqual(0);
    expect(items[17].initialQuality - 4 - 4).toEqual(items[17].quality);
    expect(items[18].quality).toEqual(0);
  });
});