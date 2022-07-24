import { IHenchman } from './../contracts/models/asset';
import { physicalItemTypes } from './items';
import { AssetType, IVehicle } from '../contracts/models/asset';
import { GameEntityType } from '../contracts/models/entity';
import { bodies, BodySize, IBodyTemplate } from './body';
export const vehicleList: IVehicle[] = [
    {
        id: "",
        gameEntityType: GameEntityType.VEHICLE,
        name: "Sedan Car",
        type: AssetType.VEHICLE,
        itemSlots: [
            {
                name: "Roof",
                allowedTypes: physicalItemTypes,
            },
            {
                name: "Hood",
                allowedTypes: physicalItemTypes,
            },
            {
                name: "Bumper",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #1",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #2",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #3",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #4",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Trunk #1",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Trunk #2",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Trunk #3",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Trunk #4",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Trunk #5",
                allowedTypes: physicalItemTypes
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
                allowedTypes: physicalItemTypes,
            },
            {
                name: "Bumper",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #1",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #2",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #3",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Backseat #4",
                allowedTypes: physicalItemTypes
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
                allowedTypes: physicalItemTypes
            },
            {
                name: "Saddlebag #1",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Saddlebag #2",
                allowedTypes: physicalItemTypes
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
                allowedTypes: physicalItemTypes
            },
            {
                name: "Saddlebag #2",
                allowedTypes: physicalItemTypes
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
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
            },
            {
                name: "Storage",
                allowedTypes: physicalItemTypes
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
        weaknesses: [],
        ...(bodies.find((x) => x.bodyName == "HumanHenchman") as IBodyTemplate)
    }
];