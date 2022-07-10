import { bindable, inject } from 'aurelia';
import { IIcon } from '../../../../../../../contracts/base';
import { ISelectable, SelectionHandler } from '../../../../../infrastructure/selection';

@inject(SelectionHandler)
export class ControlIcon implements ISelectable, IIcon{
    isSelected: boolean;
    selectionGroup: string = "ControlIcon";
    @bindable iconImage: string;
    @bindable iconType: string;
    @bindable data: unknown;
    constructor(private selectionHandler: SelectionHandler){}
    onClick():void{
        this.selectionHandler.select(this);
    }
}