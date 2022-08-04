import { BodySize } from "./body";
import { creaturesList } from "./creatures";
import { getRandomFrom } from "../shared/random";
import { itemList, ItemType } from "./items";
import { BiomeType } from "./biomes";
import { getItemValue, matchItemType } from "../contracts/models/item";

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
  public urbanResidences: string[];
  public ruralResidences: string[];
  public otherResidences: string[];
  public rawCommodities: string[];
  public refinedCommodities: string[];
  public gyms: string[];
  public habitats: string[];
  public emotions: string[];
  public entrances: string[];
  public constructionMaterials: string[];
  public sizes: string[];
  public saltFlatsEnemies: string[];
  public saltFlatsEncounters: string[];
  public valuableItems: string[];
  public visibilities: string[];
  public traps: string[];
  public rangedWeapons: string[];
  public mechanicalTriggers: string[];
  public magicDevices: string[];
  public causeTypes: string[];
  public sins: string[];
  public weathers: string[];
  constructor() {
    this.setScriptedProperties();
    this.sizes = Object.values(BodySize).map((x) => x.toLowerCase());
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
      "protecting [objectives] from incoming [people,enemies]",
      "dying from [ailments]",
      "fighting [people,enemies]",
      "hiding from [people,enemies]",
      "harassing [people]",
      "sieging [people] in a [structuralState] [structures]",
      "fleeing from [people,enemies]",
      "looting a [structures]",
      "eating [food]",
      "travelling",
      "upholding [causeTypes] tradition",
      "holding trial for [people] on the account of [sins]"
    ];
    this.sins = [
      "lust",
      "gluttony",
      "greed",
      "sloth",
      "wrath",
      "envy",
      "pride",
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
      "a [entrances] entrance to a [valuableStructures]",
      "a [sizes] mechanical mcguffin",
      "a [magic] magic mcguffin",
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
      ...Array(10).fill("[valuableStructures]"),
      ...Array(5).fill("[urbanResidences]"),
      ...Array(5).fill("[otherResidences]"),
      ...Array(5).fill("[gyms]"),
      "hotel",
      "post office",
      "town hall",
      "prison",
      "university",
      "museum",
      "courthouse",
      "church",
      "radio tower",
      "[naturalLiquids] reservoir",
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
      ...Array(2).fill("[rawCommodities, refinedCommodities] transport hub"),
      ...Array(5).fill("[rawCommodities, refinedCommodities] store"),
      ...Array(5).fill("[rawCommodities] warehouse"),
      ...Array(3).fill("[refinedCommodities] outlet"),
      ...Array(5).fill("[rawCommodities, refinedCommodities] boutique"),
      ...Array(2).fill("[refinedCommodities] assembly plant"),
      ...Array(2).fill("[rawCommodities] packaging plant"),
      "gundam cafe",
      "noodle shop",
      "foodcourt",
      "cybercafe",
      "marina",
      "floating restaurant",
      "floating market",
      "greenhouse plantation",
      "windmill",
      "bus station",
      "train station",
      "cat cafe",
      "plaza",
      "outdoor market",
      "pizzeria",
      "coffeeshop",
    ];
    this.habitats = [
      "[people] living in a [structures]",
      "[enemies]s who made a lair in [structures]",
    ];
    this.gyms = [
      "boxing gym",
      "gymnastics hall",
      "ice rink",
      "fitness gym",
      "crossfit gym",
      "powerlifting gym",
      "rock climbing gym",
      "dojo",
      "dancehall",
    ];
    this.shrines = ["shrine of [magic]", "desecrated shrine of [magic]"];
    this.naturalLiquids = [
      ...Array(3).fill("fresh-water"),
      ...Array(5).fill("dirty-water"),
      ...Array(5).fill("salt-water"),
      "oil",
      "acid",
    ];
    this.wierdLiquids = ["asphalt", "ooze", "molten salt", "blood"];
    this.constructionMaterials = [
      "wood",
      "clay",
      "brick",
      "concrete",
      "stone",
      "common metals",
      "rare metals",
      "plastic",
      "glas",
    ];
    this.rawCommodities = [
      ...Array(9).fill("[constructionMaterials]"),
      "spice",
      "meat",
      "food",
      "liqour",
      "fresh produce",
      "cosmetics",
      "perfume",
      "paper",
      "chocolate",
      "candy",
      "chemicals",
    ];
    this.refinedCommodities = [
      "construction supplies",
      "furniture",
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
      "video game",
      "boardgame",
      "guns",
      "hobby supplies",
      "pets",
      "office supplies",
      "drugs",
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
    this.urbanResidences = ["house", "apartment building", "villa", "mansion"];
    this.ruralResidences = ["cabin", "burrow", "treehouse", "grotto", "camp"];
    this.otherResidences = ["house trailer", "caravan home"];
    this.enemies = [...creaturesList.map((x) => x.name.toLocaleLowerCase())];
    this.saltFlatsEnemies = [
      ...creaturesList
        .filter((x) => x.habitats.indexOf(BiomeType.SALT_FLATS) != -1)
        .map((x) => x.name.toLocaleLowerCase()),
    ];
    this.tribalCreatures = ["gators", "city-bears", "sluggan"];
    this.magic = ["light", "volt", "neural", "ooze", "nuke"];
    this.items = [...itemList.map((x) => x.name.toLocaleLowerCase())];
    this.valuableItems = [
      ...itemList
        .filter((x) => getItemValue(x) > 20)
        .map((x) => x.name.toLocaleLowerCase()),
    ];
    this.rangedWeapons = [
      ...itemList
        .filter((x) => x.type == ItemType.RANGED)
        .map((x) => x.name.toLocaleLowerCase()),
    ];
    this.volatilities = [
      "stable",
      "unstable",
      "steady",
      "volatile",
      "erupting",
    ];
    this.emotions = ["joyful", "sad", "anger", "repugnant", "horror", "guilt"];
    this.entrances = [
      "door",
      "arch",
      "stairway",
      "ladder",
      "pit",
      "tunnel",
      "coridoor",
    ];
    this.magicalFeatures = [
      ...Array(10).fill("layline"),
      "comet-fragment of [magic]",
      "[volatilities] rift of [magic]",
      ...Array(3).fill("spell vault, containing [magicDevices*3]"),
      "[constructionMaterials] [entrances] to a [volatilities] [emotions] dimension",
    ];
    this.magicDevices = [
      "a scroll hard to decipher",
      "a book requiring diligent study",
      "a brand requiring [causeTypes]",
      "a dagger thirsting for blood",
      "a frail skeleton key searching for a worthy lock",
      "a sick critter in need of care",
      "a lost letter to deliver",
      "a holy symbol wishing for ritual a shrine",
      "a pile of bones in need of proper burial",
      "a seed which would grow into a fruit tree",
      "a discharged energy cell thirsting for energy",
      "a broken handheld device needing repairs",
      "an ember which cannot burn unless handled by a master",
      "a tiny robot with corrupt data in need of debugging",
      "a capsule of uranium-235 in need of a reactor",
      "a cybernetic extremity craving to be installed",
      "a talking bullet with a name on it",
    ];
    this.causeTypes = [
      "charity",
      "cruelty",
      "forgiveness",
      "vengeance",
      "sacrifice",
      "acquisition",
      "reformation",
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
      "buried [structures]",
      "buried suburb",
      "cave containing a [shrines], guarded by [people,saltFlatsEnemies]",
      "cave containing [refinedCommodities], guarded by [people,saltFlatsEnemies]",
      ...Array(3).fill("oasis of [naturalLiquids]"),
      "oasis of [wierdLiquids]",
      "[magicalFeatures]",
      "[vegetationCluster] [saltFlatsVegetation]",
      "a lone [urbanResidences]",
      "a lone [otherResidences]",
    ];
    this.visibilities = ["obvious", "visible", "covered", "hidden"];
    this.saltFlatsEncounters = [
      "[saltFlatsLocations] infested by [visibilities] [saltFlatsEnemies]",
      "[saltFlatsLocations] with a [visibilities] [valuableItems]",
      "empty [saltFlatsLocations]",
      "desolate [saltFlatsLocations]",
      "unoccupied [saltFlatsLocations]",
    ];
    this.mechanicalTriggers = [
      "tripwire",
      "button",
      "lever",
      "pressure plate",
      "chest",
      "door",
      "hatch",
    ];
    this.traps = [
      "snare connected to [mechanicalTriggers]",
      "trapper net connected to [mechanicalTriggers]",
      "[rangedWeapons] connected to [mechanicalTriggers]",
      "suspended boulder connected to [mechanicalTriggers]",
      "trapdoor to a pit filled with [naturalLiquids,wierdLiquids,enemies] connected to [mechanicalTriggers]",
      "trapping grate connected to [mechanicalTriggers]",
    ];
    this.weathers = [
      "clear",
    ];
  }
  setScriptedProperties() {
    const itemTypes = Object.values(ItemType).filter((x) => x != ItemType.NONE);
    itemTypes.forEach((type) => {
      this[`${type.toLowerCase()}Items`] = itemList
        .filter((item) => matchItemType(item, type))
        .map((item) => item.name.toLowerCase());
    });
  }
  public getProperties(): string[] {
    return [...Object.keys(this)];
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
    let collection = collectionRaw.trim();
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
