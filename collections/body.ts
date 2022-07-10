import { ItemType } from './items';
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
                allowedTypes: [ItemType.ANY],
                group: "Equipped",
                rollable: true,
            },
            {
                name: "Off hand",
                allowedTypes: [ItemType.ANY],
                group: "Equipped",
                rollable: true,
            },
            {
                name: "Belt #1",
                allowedTypes: [ItemType.ANY],
                group: "Equipped"
            },
            {
                name: "Upper Body",
                allowedTypes: [ItemType.ANY],
                group: "Equipped"
            },
            {
                name: "Lower Body",
                allowedTypes: [ItemType.ANY],
                group: "Equipped"
            },
            {
                name: "Belt #2",
                allowedTypes: [ItemType.ANY],
                group: "Equipped"
            },
            {
                name: "Pack #1",
                allowedTypes: [ItemType.ANY],
                group: "Carried"
            },
            {
                name: "Pack #2",
                allowedTypes: [ItemType.ANY],
                group: "Carried"
            },
            {
                name: "Pack #3",
                allowedTypes: [ItemType.ANY],
                group: "Carried"
            },
            {
                name: "Augment #1",
                allowedTypes: [ItemType.MAGIC, ItemType.CYBERNETICS],
                group: "Augment",
                rollable: true,
            },
            {
                name: "Augment #2",
                allowedTypes: [ItemType.MAGIC, ItemType.CYBERNETICS],
                group: "Augment",
                rollable: true,
            },
            {
                name: "Augment #3",
                allowedTypes: [ItemType.MAGIC, ItemType.CYBERNETICS],
                group: "Augment",
                rollable: true,
            },
        ]
    }
];