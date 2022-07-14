import { physicalItemTypes } from './items';
import { AssetType, IVehicle } from './../contracts/models/asset';
export const vehicleList: IVehicle[] = [
    {
        id: "",
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
]