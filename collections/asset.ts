import { IHenchman } from './../contracts/models/asset';
import { AssetType, IVehicle } from '../contracts/models/asset';
import { GameEntityType } from '../contracts/models/entity';
import { bodies, IBodyTemplate } from './body';
import { getRandomWeaknesses } from '../contracts/models/character';
import { ItemType } from './items';
export const vehicleList: IVehicle[] = [
    {
        id: "",
        gameEntityType: GameEntityType.VEHICLE,
        name: "Sedan Car",
        type: AssetType.VEHICLE,
        hardpoints: [
            {
                name: "Trunk hardpoint",
                allowedTypes: [ItemType.PHYSICAL],
            },
        ],
        itemSlots: [
            {
                name: "Roof",
                allowedTypes: [ItemType.PHYSICAL],
            },
            {
                name: "Hood",
                allowedTypes: [ItemType.PHYSICAL],
            },
            {
                name: "Bumper",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #1",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #2",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #3",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #4",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Trunk #1",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Trunk #2",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Trunk #3",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Trunk #4",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Trunk #5",
                allowedTypes: [ItemType.PHYSICAL]
            }
        ],
        integrity: 7,
        maxFuel: 18,
        seats: 5,
    },
    {
        id: "",
        gameEntityType: GameEntityType.VEHICLE,
        name: "Buggy",
        type: AssetType.VEHICLE,
        itemSlots: [
            {
                name: "Hood",
                allowedTypes: [ItemType.PHYSICAL],
            },
            {
                name: "Bumper",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #1",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #2",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #3",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Backseat #4",
                allowedTypes: [ItemType.PHYSICAL]
            }
        ],
        integrity: 4,
        maxFuel: 10,
        seats: 4,
    },
    {
        id: "",
        gameEntityType: GameEntityType.VEHICLE,
        name: "Bike",
        type: AssetType.VEHICLE,
        itemSlots: [
            {
                name: "Back axle",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Saddlebag #1",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Saddlebag #2",
                allowedTypes: [ItemType.PHYSICAL]
            },
        ],
        integrity: 2,
        maxFuel: 6,
        seats: 2,
    },
    {
        id: "",
        gameEntityType: GameEntityType.VEHICLE,
        name: "Saltskiff",
        type: AssetType.VEHICLE,
        itemSlots: [
            {
                name: "Saddlebag #1",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Saddlebag #2",
                allowedTypes: [ItemType.PHYSICAL]
            },
        ],
        integrity: 3,
        maxFuel: 6,
        seats: 2,
    },
    {
        id: "",
        gameEntityType: GameEntityType.VEHICLE,
        name: "Salttrain",
        type: AssetType.VEHICLE,
        itemSlots: [
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
            {
                name: "Storage",
                allowedTypes: [ItemType.PHYSICAL]
            },
        ],
        integrity: 20,
        maxFuel: 20,
        seats: 10,
    },
]
export const henchmanList: IHenchman[] = [
    {
        id: "",
        name: "Bandit",
        type: AssetType.HENCHMAN,
        gameEntityType: GameEntityType.HENCHMAN,
        strength: 7,
        dexterity: 7,
        will: 7,
        level: 1,
        experience: 0,
        endurance: 50,
        maxEndurance: 50,
        weaknesses: getRandomWeaknesses(),
        ...(bodies.find((x) => x.bodyName == "HumanHenchman") as IBodyTemplate)
    }
];