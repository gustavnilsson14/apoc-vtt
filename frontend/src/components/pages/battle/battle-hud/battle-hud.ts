import { TileUtilityTags } from './../../../../../../shared/grid';
import { Client } from './../../../../infrastructure/client';
import { IBattle, MovementType } from './../../../../../../contracts/models/battle';
import { bindable, inject } from 'aurelia';
import { creaturesList, ICreature } from '../../../../../../collections/creatures';
import { IBattleMessage } from '../../../../../../contracts/controllers/battle';

export interface IIcon{
    iconType: string;
    iconImage: string;
    iconColor?: string;
}
@inject(Client)
export class BattleHud{
    @bindable battle: IBattle;
    @bindable message: IBattleMessage;
    @bindable tileUtilityTags: TileUtilityTags[];
    private creaturesList: ICreature[];
    private movementTypes: MovementType[];
    constructor(private client: Client){
        this.creaturesList = creaturesList;
        this.movementTypes = Object.values(MovementType).filter(x => typeof x != "number")
        this.tileUtilityTags = Object.values(TileUtilityTags).filter(x=>typeof x != "number");
    }
    
}