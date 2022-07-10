import { ItemType } from './items';
import { AssetType, IVehicle } from './../contracts/models/asset';
export const vehicleList: IVehicle[] = [
    {
        id: "",
        name: "Buggy",
        type: AssetType.VEHICLE,
        itemSlots: [
            {
                name: "Roof",
                allowedTypes: [ItemType.ANY],
            },
            {
                name: "Bumper",
                allowedTypes: [ItemType.ANY]
            }
        ],
        integrity: 5,
        maxFuel: 10,
    },
    {
        id: "",
        name: "Bike",
        type: AssetType.VEHICLE,
        itemSlots: [
            {
                name: "Back axle",
                allowedTypes: [ItemType.ANY]
            },
        ],
        integrity: 5,
        maxFuel: 10,
    },
]