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
  public shrines: string[];
  public enemies: string[];
  public encounters: string[];
  public magic: string[];
  public naturalLiquids: string[];
  public wierdLiquids: string[];
  public structuralState: string[];
  public saltFlatsLocations: string[];
  public people: string[];
  public magicalFeatures: string[];
  public volatilities: string[];
  public vegetationCluster: string[];
  public saltFlatsVegetation: string[];
  public food: string[];
  public valuableStructures: string[];
  public tribalCreatures: string[];
  constructor() {
    this.people = [
      "outsiders",
      "locals",
      "bandits",
      "survivors",
      "madmen",
      "rags",
      "[tribalCreatures]",
      "androids",
      "crazed androids",
      "mutants",
      "cultists",
      "conclave",
    ];
    this.encounters = ["[people] [engagements]"];
    this.engagements = [
      "burying [relationships]",
      "digging for [objectives]",
      "scavenging for [itemTypes]",
      "searching for [objectives]",
      "dying from [ailments]",
      "fighting [people,enemies]",
      "hiding from [people,enemies]",
      "harassing [people]",
      "sieging [people] in a [structuralState] [structures]",
      "fleeing from [people,enemies]",
      "looting a [structures]",
      "eating [food]",
      "travelling",
    ];
    this.food = [
      "rations",
      "grilled [enemies,people]",
      "a well rounded meal",
      "scraps and dirty water",
    ];
    this.relationships = [
      "an ally",
      "an enemy",
      "a stranger",
      "a friend",
      "a pet",
      "a sibling",
      "a parent",
      "a companion",
    ];
    this.objectives = [
      "an entrance to a [valuableStructures]",
      "a mechanical mcguffin",
      ...Array(2).fill("a [naturalLiquids] well"),
      "a [wierdLiquids] well",
      "a lost [items]",
      "a [magicalFeatures]",
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
    this.valuableStructures = [
      "police station",
      "army base",
      "hospital",
      "research lab",
      "power plant",
      "water treatment",
      "[liquid] tower",
      "chemical plant",
      "food processing plant",
      "parking garage",
      "bunker",
      ...Array(8).fill("[shrines]"),
    ];
    this.structures = [
      "[valuableStructures]",
      "apartments",
      "hotel",
      "villa",
      "mansion",
      "post office",
      "town hall",
      "prison",
      "university",
      "museum",
      "courthouse",
      "church",
      "radio tower",
      "reservoir",
      "oil and gas refinery",
      "explosives industry",
      "assembly plant",
      "consumer goods factory",
      "electronics production",
      "furniture factory",
      "offices",
      "stock exchange",
      "bank",
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
      "pawn shop",
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
    ];
    this.shrines = ["shrine of [magic]", "desecrated shrine of [magic]"];
    this.naturalLiquids = [
      ...Array(10).fill("water"),
      ...Array(10).fill("salt-water"),
      "oil",
      "acid",
    ];
    this.wierdLiquids = ["asphalt", "ooze", "molten salt", "blood"];
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
      "patchwork repaired",
      "nicely restored",
      "completely destroyed",
      "destroyed interior",
      "ruined",
      "sunk askew",
      "cracked foundation",
      "sinkholes",
      "run down",
      "unkept",
      "fortified",
      "permanently settled",
    ];
    this.enemies = [
      ...creaturesList.map((x) => x.name.toLocaleLowerCase()),
      "[encounters]",
    ];
    this.tribalCreatures = [
      "gators",
      "city-bears",
      "sluggan",
    ];
    this.magic = ["light", "volt", "neural", "ooze", "nuke"];
    this.items = [...itemList.map((x) => x.name.toLocaleLowerCase())];
    this.volatilities = [
      "stable",
      "unstable",
      "steady",
      "volatile",
      "erupting",
    ];
    this.magicalFeatures = [
      ...Array(10).fill("layline"),
      "comet-fragment of [magic]",
      "[volatilities] rift of [magic]",
      "spell vault",
    ];
    this.vegetationCluster = ["shaw of", "grove of", "forest of", "canop ofy"];
    this.saltFlatsVegetation = [
      "dryvine",
      "brown salt tuber",
      "stonegrass",
      "picklewood",
      "rubberthorn",
    ];
    this.saltFlatsLocations = [
      ...Array(3).fill("salt dunes"),
      ...Array(3).fill("salt flats"),
      ...Array(3).fill("hills"),
      "boneyard",
      "buried [structure]",
      "buried suburb",
      "cave containing a [shrines], guarded by [people,enemies]",
      "cave containing [commodities], guarded by [people,enemies]",
      ...Array(3).fill("oasis of [naturalLiquids]"),
      "oasis of [wierdLiquids]",
      "[magicalFeatures]",
      "[vegetationCluster] [saltFlatsVegetation]",
    ];
  }
  public getProperties(): string[] {
    return Object.keys(this);
  }
  public generateFrom(value: string, recurse: boolean = true): string {
    const matches = value.match(/\[(.*?)\]/g);
    if (!matches) return value;
    matches.forEach((raw) => {
      if (!recurse) {
        value = value.replace(raw, "");
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
    if (collection.indexOf("*") != -1) {
      amount = parseInt(collection.split("*")[1]);
      collection = collection.split("*")[0];
    }
    if (!this[collection]) {
      console.error(`Cant find collection ${collection}`);
      return;
    }
    const nestedValue = [];
    for (let i = 0; i < amount; i++) {
      nestedValue.push(this.generateFrom(getRandomFrom(this[collection])));
    }
    return value.replace(raw, nestedValue.join(", "));
  }
}
