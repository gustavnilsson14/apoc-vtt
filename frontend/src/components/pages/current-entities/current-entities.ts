import { ICustomListSettings } from './../../../../../contracts/list';
import { EntityFormSettings } from './../../../../../contracts/forms/entity';
import { IFormSettings } from './../../../../../contracts/form';
import { bindable } from 'aurelia';
import { creaturesList, ICreature } from './../../../../../collections/creatures';
import { ISelectInputSettings, InputFactory, InputType } from './../../../../../contracts/input';
import { BasePage } from './../../../infrastructure/view';
import { TooltipSourceType } from '../../../infrastructure/tooltip';

export class CurrentEntities extends BasePage {
    enemySelectSettings: ISelectInputSettings = InputFactory.createSelectInput({
        label: "Creature",
        labelIndex: "name",
        key: "creature",
        options: creaturesList,
        type: InputType.SELECT,
        group: "",
        isTemplate: true,
    });
    attackListSettings: ICustomListSettings = {
        indexes: [{
            label: "name",
            path: "name",
        }],
        ignoreLoadOnAttached: true,
        noProvision: true,
        tooltipSource: TooltipSourceType.PATH,
        tooltipPaths: ["damage","damageTypes"]
    };
    actionListSettings: ICustomListSettings = {
        indexes: [{
            label: "name",
            path: "name",
        }],
        ignoreLoadOnAttached: true,
        noProvision: true,
        tooltipSource: TooltipSourceType.PATH,
        tooltipPaths: ["effect"]
    };
    enemyFormSettings: IFormSettings = new EntityFormSettings();
    @bindable enemyResult: any = {};
    @bindable enemyData: any = {};
    entities: ICreature[] = [];

    addSelected(){
        this.entities = [...this.entities, {...this.enemyResult}];
    }
    removeEntity(index:number){
        this.entities.splice(index, 1);
    }
}
