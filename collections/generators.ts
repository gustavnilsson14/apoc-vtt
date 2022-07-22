import { creaturesList } from "./creatures";
import { getRandomFrom } from "../shared/random";
import { itemList } from "./items";

export class GeneratorsCollection {
  public engagements: string[];
  public relationships: string[];
  public objectives: string[];
  public itemTypes: string[];
  public items: string[];
  public commodities: string[];
  public ailments: string[];
  public structures: string[];
  public enemies: string[];
  public encounters: string[];
  public magic: string[];
  public naturalLiquids: string[];
  public wierdLiquids: string[];
  public structuralState: string[];
  constructor() {
    this.encounters = [
      "outsiders [engagements]",
      "locals [engagements]",
      "bandits [engagements]",
      "survivors [engagements]",
      "madmen [engagements]",
      "victims [engagements]",
    ];
    this.engagements = [
      "burying [relationships]",
      "digging for [objectives]",
      "scavenging for [itemTypes]",
      "searching for [objectives]",
      "dying from [ailments]",
      "fighting [enemies]",
      "hiding from [enemies]",
      "fleeing from from [enemies]",
      "looting a [structures]",
      "travelling"
    ];
    this.relationships = [
      "an ally",
      "an enemy",
      "a stranger",
      "a friend",
      "a pet",
      "a sibling",
      "a parent",
    ];
    this.objectives = [
      "finding entrance to a [structures]",
      "a mechanical mcguffin",
      "a [liquid] well",
      "a lost [items]"
    ];
    this.itemTypes = [
      "weapons",
      "food",
      "water",
      "artifacts",
      "scrap",
      "electronics",
      "magic",
    ];
    this.ailments = [
      "injuries",
      "poison",
      "radiation",
      "starvation",
      "dehydration",
      "heatstroke",
      "hypothermia",
      "ooze infection",
    ];
    this.structures = [
      "apartments",
      "hotel",
      "villa",
      "mansion",
      "post office",
      "town hall",
      "prison",
      "police station",
      "army base",
      "hospital",
      "university",
      "museum",
      "research",
      "courthouse",
      "church",
      "power plant",
      "water treatment",
      "water tower",
      "reservoir",
      "oil and gas refinery",
      "chemical plant",
      "explosives industry",
      "assembly plant",
      "consumer goods factory",
      "electronics production",
      "furniture factory",
      "food processing plant",
      "offices",
      "stock exchange",
      "bank",
      "parking garage",
      "gas station",
      "mechanics shop",
      "cinema",
      "lasertag arena",
      "sports arena",
      "bar",
      "restaurant",
      "brothel",
      "night club",
      "park",
      "pool house",
      "theater",
      "zoo",
      ...Array(5).fill("[commodities] store"),
      ...Array(5).fill("[commodities] warehouse"),
      ...Array(5).fill("[commodities] outlet"),
      ...Array(5).fill("[commodities] boutique"),
      ...Array(5).fill("[commodities] factory"),
      "gundam cafe",
      "noodle shop",
      "foodcourt",
      "cybercafe",
      "marina",
      "floating restaurant",
      "floating market",
      "greenhouse plantation",
      "dancehall",
      "bunker",
      "windmill",
      "bus station",
      "train station",
      "cat cafe",
      "plaza",
      "outdoor market",
      "dojo",
      "boxing gym",
      "gym",
      "pizzeria",
      "coffeeshop",
      ...Array(8).fill("shrine of [magic]"),
    ];
    this.naturalLiquids = [...Array(10).fill("water"), ...Array(10).fill("salt-water"), "oil", "acid"];
    this.wierdLiquids = ["asphalt", "ooze", "molten salt", "blood" ];
    this.commodities = [
      "food",
      "meat",
      "liqour",
      "fresh produce",
      "construction supplies",
      "furniture",
      "cosmetics",
      "perfume",
      "kitchen utensils",
      "toys",
      "electronics",
      "home appliances",
      "lamp",
      "interior design",
      "tools",
      "pawn",
      "jewelry",
      "camping",
      "clothes",
      "cars",
      "bike",
      "books",
      "mobile phone",
      "chocolate",
      "candy",
      "video game",
      "boardgame",
      "gun",
      "hobby supplies",
      "drugs",
      "chemicals",
      "pets",
      "office supplies",
    ];
    this.structuralState = [
      "pristine",
      "patchwork repairs",
      "completely destroyed",
      "destroyed interior",
      "ruined",
      "sunk askew",
      "cracked foundation",
      "sinkholes"
    ];
    this.enemies = [
      ...creaturesList.map((x) => x.name.toLocaleLowerCase()),
      "[encounters]",
    ];
    this.magic = ["light", "volt", "neural", "ooze", "nuke"];
    this.items = [...itemList.map((x) => x.name.toLocaleLowerCase())];
  }
  public getProperties(): string[] {
    return Object.keys(this);
  }
  public generateFrom(value: string, recurse: boolean = true): string {
    const matches = value.match(/\[(.*?)\]/g);
    if (!matches) return value;
    matches.forEach((raw) => {
      if(!recurse) {
        value = value.replace(raw,"");
        return;
      }
      value = this.processMatch(value, raw);
    });
    return value;
  }
  public processMatch(value: string, raw: string): string {
    const collections = raw.slice(1, -1);
    const collectionRaw = getRandomFrom(collections.split(","));
    let collection = collectionRaw;
    let amount = 1;
    if(collection.indexOf('*') != -1){
      amount = parseInt(collection.split('*')[1]);
      collection = collection.split('*')[0];
    }  
    if (!this[collection]) {
      console.error(`Cant find collection ${collection}`);
      return;
    }
    const nestedValue = [];
    for (let i = 0; i < amount; i++) {
      nestedValue.push(this.generateFrom(getRandomFrom(this[collection])));
    }
    return value.replace(raw, nestedValue.join(', '));
  }
}
