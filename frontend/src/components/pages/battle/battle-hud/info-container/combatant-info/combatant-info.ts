import { bindable } from 'aurelia';
import { IBattle } from '../../../../../../../../contracts/models/battle';
import { ITile } from '../../../../../../../../shared/grid';

export class CombatantInfo {
    @bindable tile: ITile;
    @bindable battle: IBattle;
}