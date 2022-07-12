export interface IOccupation {
  name: string;
  description: string;
}
export interface ITribe {
  name: string;
  description: string;
  occupations: IOccupation[];
}
export interface IBackground{
    tribe: string;
    tribeDescription: string;
    occupation: IOccupation;
}

export const tribes: ITribe[] = [
  {
    name: "Swamp People",
    description:
      "The sour swamps of the new world are brimming with life adapted to the new conditions. Swamp People live and in some manner thrive here, a generally spiritual yet rough group. The Swamp People’s primary trait is their relation to, and handling of the wildlife in the new world swamps, which also in many cases is their livelihood. To the outsider, the swamp is often a deathtrap. Many creatures here lay in ambush, and a failure to read the signs will cause a wanderer to be either consumed by swamp kelp, captured by the gators, eaten by ticks, crayfish, or leeches, or to just drown in a whirlpool.",
    occupations: [
      { name: "Turtleman", description: "Rides turtle, ferries people" },
      {
        name: "Kelp Harvester",
        description: "Harvests kelp in the dead of night, while it sleeps",
      },
      {
        name: "Gator spokesperson",
        description: "Upholds the peace between man and gator. Bilingual",
      },
      {
        name: "Cajun",
        description: "Hunts crayfish, cooks crayfish, eats crayfish",
      },
      {
        name: "Gibbon bagger",
        description:
          "Captures gibbons, extracts their waterbags into gibbonwater",
      },
    ],
  },
  {
    name: "Wastelander",
    description:
      "Life is difficult across the desert wastes of the new world, yet finds a way. The few resources here are under constant threat from brigands and bandits, due to their difficulty to protect, but also their value. Apart from raids, denizens of the wastes also have to deal with feral cacti, great antlions, and shellslugs, all dangerous wildlife. Old, heavily custom built motorized vehicles are the common way of transportation here.They are sturdy and can take the sand without a problem.",
    occupations: [
      {
        name: "Raider",
        description: "Raids stockpiles, plunders settlements",
      },
      {
        name: "Brigand",
        description: "Ambushes caravans, roams trade routes",
      },
      {
        name: "Purifier",
        description: "Cleans food and water, treats wounds",
      },
      {
        name: "Dreamer",
        description: "Sees the future when asleep behind the wheel",
      },
      {
        name: "Gearhead",
        description: "Builds vehicles out of junkyard scrap",
      },
      {
        name: "Worm Wrangler",
        description: "Finds and wrangles worms to milk them",
      },
      {
        name: "Oil Hog",
        description: "Refines oil from meat",
      },
      {
        name: "Caravaneer",
        description: "Travels, sells oil, bullets, or wormstuffs",
      },
      {
        name: "Bullet Farmer",
        description: "Crafts bullets, bathes in casings",
      },
      {
        name: "Motor Nomad",
        description: "Travels far, on wheels, sigma mindset",
      },
      {
        name: "Desert Plum Farmer",
        description: "Tends to crops, fights of cacti, outcast badass",
      },
    ],
  },
  {
    name: "Scavenger",
    description:
      "The people living in the cities of the old world are commonly known as scavengers, or scavs for short. They are quite sceptical of outsiders of their small tribes, but form tight loyalties and friendships once they accept new blood. Scrap, doodads and trash is plenty in the ruins, so resources are plenty for crafting. Food, and drinking water is more scarce as the soil is bad for farming, and water usually floods then flows off. Stockpiled food also has a tendency to attract roidrats, jellies, or raids from Saurian tribes.",
    occupations: [
      { name: "Rollerthug", description: "Prays on the weak, on rollerblades" },
      { name: "Metro", description: "Lives in the tunnels, sees in the dark" },
      {
        name: "Broadcaster",
        description: "Worships the great FM, makes quality content",
      },
      {
        name: "Roach Rancher",
        description: "Raises roaches, sells chitin and meat",
      },
      {
        name: "Saurian Hunter",
        description: "Fights Saurians, has mysterious pasts",
      },
      {
        name: "Technomancer",
        description: "Spins prophecy in static, rents VHS tapes",
      },
      {
        name: "Scrapper",
        description: "Loots malls and markets, keeps trinkets",
      },
      {
        name: "DIY Artist",
        description: "Thinks alot, crafts surprising quality",
      },
      {
        name: "Bones",
        description: "Knits tissue, sets bones, has morbid humor",
      },
      {
        name: "Recycler",
        description: "Makes clean water, has a strong stomach",
      },
    ],
  },
  {
    name: "Conclave",
    description:
      "Where you find good soil, clean groundwater, and less contaminants, you will find that small authoritarian settlements form naturally, which are commonly called conclaves. These vary in alignment when it comes to ethics, but always strictly enforce their laws. Many conclaves are indifferent of outsiders, viewing them as lower caste, and of less value than the conclave citizens. While heavily onset by raiders, conclaves are usually equipped for the task, with quality defenses prepared for the inevitable invasions.",
    occupations: [
      { name: "Techie", description: "Automates things, does computers" },
      {
        name: "Fence builder",
        description: "Builds fences, sets traps, scouts the perimeter",
      },
      {
        name: "Taskmaster",
        description: "Directs the labor, punishes disobedience",
      },
      {
        name: "Peacekeeper",
        description: "Upholds law and order, shoots outsiders",
      },
      {
        name: "Diplomat",
        description: "Has a persuasive tounge, and occult ways",
      },
      {
        name: "True human",
        description: "Leads the conclave, born into wealth",
      },
    ],
  },
  {
    name: "Zone",
    description:
      "Traveling the radioactive, toxic, and barren zones of the new world is a dangerous life. Here you find the bravest explorers, most pious believers, and a lot of mentally deranged people, as well as mutants and dangerous artificial demigods of the old world. The zone has neither clean food or water, but the most valuable, and curious artifacts. Venture too deep and you will find the Deadlands, where you will die to heavy radiation, test dummies, or the feared Chrome pyramid.",
    occupations: [
      { name: "Sherpa", description: "Knows the way, leads the way" },
      {
        name: "Cultist",
        description: "Worships Pluton, god of extra appendages",
      },
      {
        name: "Ruins Explorer",
        description: "Has a fedora, whip, and an explorers mindset",
      },
      { name: "Eel Rider", description: "Rides a zone eel, delivers tidings" },
      {
        name: "Hag",
        description:
          "Explores the possibilities of magic, using radiation and toxins.",
      },
      {
        name: "Moneybags",
        description: "Parish and outlaw, criminal kingpin.",
      },
      {
        name: "Spongewood squeezer",
        description:
          "Extracts water from spongewood, without rousing the vines.",
      },
    ],
  },
  {
    name: "Android",
    description:
      "Sentient remnants of the old world, super quality at their time, but after centuries without repairs are a dying kind. Androids are self replicating given the conditions to do so, but after the collapse this has not been so. Severed from the network, the local auxiliary AI’s took over the individual android bodies, as the decades passed by they evolved into individuals. Usually, androids are met with courtesy, but restraint. Many humans either push them away, or try to exploit them. Few friendship bonds are formed with androids, even though it is certainly possible.",
    occupations: [
      { name: "Mr. Jones", description: "Serves people, has flawless manners" },
      { name: "AxCo Handroid", description: "Fixes things, handy with tools" },
      { name: "SciBot", description: "Has a creative AI, dressed in labcoat" },
      { name: "ElMarco", description: "Sold burgers, now peddles anything." },
    ],
  },
  {
    name: "Synthetic",
    description:
      "Designer made, ageless, and peerless. Synthetic humans are amazing creatures, yet they more than often suffer from a lack of direction. If this is a byproduct of their long lifespan, or if they were made this way anyone who could say is long since dead. Synthetics are normally shun as soulless and unpredictable, which is sometimes all too correct. Those who are not, may grow to lead groups or settlements to great futures, but these are few indeed. Prone to madness and depression, most synthetics wander alone.",
    occupations: [
      { name: "Companion", description: "Beautiful body, strong charisma" },
      { name: "Assasin", description: "Deadly and silent, strong and fast" },
    ],
  },
];
