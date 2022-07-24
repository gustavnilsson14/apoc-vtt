import { ItemType, physicalItemTypes } from './items';
import { IItemSlot } from './../contracts/input';
export enum BodySize{
    TINY = "TINY",
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    GIANT = "GIANT",
    GARGANTUAN = "GARGANTUAN",
}
export interface IBodyTemplate{
    bodyName: string,
    size: BodySize,
    itemSlots: IItemSlot[]
}

export const bodies: IBodyTemplate[] = [
    {
        bodyName: "Human",
        size: BodySize.MEDIUM,
        itemSlots: [
            {
                name: "Main hand",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped",
                rollable: true,
            },
            {
                name: "Off hand",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped",
                rollable: true,
            },
            {
                name: "Belt #1",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped"
            },
            {
                name: "Upper Body",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped"
            },
            {
                name: "Lower Body",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped"
            },
            {
                name: "Belt #2",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped"
            },
            {
                name: "Pack #1",
                allowedTypes: [...physicalItemTypes],
                group: "Carried"
            },
            {
                name: "Pack #2",
                allowedTypes: [...physicalItemTypes],
                group: "Carried"
            },
            {
                name: "Pack #3",
                allowedTypes: [...physicalItemTypes],
                group: "Carried"
            },
            {
                name: "Augment #1",
                allowedTypes: [ItemType.MAGIC, ItemType.CYBERNETICS, ItemType.AFFLICTION],
                group: "Augment",
                rollable: true,
            },
            {
                name: "Augment #2",
                allowedTypes: [ItemType.MAGIC, ItemType.CYBERNETICS, ItemType.AFFLICTION],
                group: "Augment",
                rollable: true,
            },
            {
                name: "Augment #3",
                allowedTypes: [ItemType.MAGIC, ItemType.CYBERNETICS, ItemType.AFFLICTION],
                group: "Augment",
                rollable: true,
            },
        ]
    },
    {
        bodyName: "HumanHenchman",
        size: BodySize.MEDIUM,
        itemSlots: [
            {
                name: "Main hand",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped",
                rollable: true,
            },
            {
                name: "Off hand",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped",
                rollable: true,
            },
            {
                name: "Upper Body",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped"
            },
            {
                name: "Lower Body",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped"
            },
            {
                name: "Belt",
                allowedTypes: [...physicalItemTypes],
                group: "Equipped"
            },
            {
                name: "Pack #1",
                allowedTypes: [...physicalItemTypes],
                group: "Carried"
            },
            {
                name: "Pack #2",
                allowedTypes: [...physicalItemTypes],
                group: "Carried"
            },
            {
                name: "Augment",
                allowedTypes: [ItemType.MAGIC, ItemType.CYBERNETICS, ItemType.AFFLICTION],
                group: "Augment",
                rollable: true,
            },
        ]
    }
];