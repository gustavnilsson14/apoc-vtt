import { IBattle } from './../../../../../../../contracts/models/battle';
import { ITile } from '../../../../../../../shared/grid';
import { EventAggregator } from 'aurelia';
import { bindable, inject } from 'aurelia';
import { ISelectable } from '../../../../../infrastructure/selection';
import { Client } from '../../../../../infrastructure/client';
import { Tile } from '../../tile/tile';

@inject(Client, EventAggregator)
export class InfoContainer {
    @bindable battle: IBattle;
    @bindable tile: ITile;
    constructor(private client: Client, private eventAggregator: EventAggregator){}
    attached() {
        this.eventAggregator.subscribe("SELECTION_CHANGED", (newSelection: ISelectable) => {
            this.tile = null;
            if(!newSelection) return;
            if(newSelection.selectionGroup != "TILE") return;
            this.tile = (newSelection as Tile).tile;
        });
    }
}