import { EventAggregator } from 'aurelia';
import { getRandomFrom, IRollableResult } from './../../../../../shared/random';
import { ICustomListSettings } from './../../../../../contracts/list';
import { EntityFormSettings } from './../../../../../contracts/forms/entity';
import { IFormSettings } from './../../../../../contracts/form';
import { bindable, inject } from 'aurelia';
import { creaturesList, ICreature } from './../../../../../collections/creatures';
import { ISelectInputSettings, InputFactory, InputType } from './../../../../../contracts/input';
import { BasePage } from './../../../infrastructure/view';
import { TooltipSourceType } from '../../../infrastructure/tooltip';
import { RollableHandler } from '../../../../../shared/random';
import { Client } from '../../../infrastructure/client';
import { DiceType } from '../../../../../contracts/models/dice';

@inject(Client, EventAggregator, RollableHandler)
export class CurrentEntities extends BasePage {
    constructor(public client: Client, private eventAggregator: EventAggregator, private rollableHandler: RollableHandler){
        super(client);
    }
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
        tooltipPaths: ["damage","damageTypes"],
        onContext: (creature: ICreature, attackIndex: number)=>{
            this.onAttackContext(creature, attackIndex);
        }
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
    onAttackContext(item: any, attackIndex: number) {
        const result: IRollableResult = this.rollableHandler.rollDefault({
            name: `${getRandomFrom(attackPrefixes)} from:  ${item.name}`,
            getBaseDice: (): DiceType[] => {
                return [...item.damage];
            }
        });
        this.eventAggregator.publish("DIE_ROLL", result);
    }
}
const attackPrefixes: string[] = [
    "Peril",
    "Doom",
    "Pain",
    "Death",
    "Agony",
    "Hurt",
    "Trauma",
    "Torment",
    "Woe",
    "Suffer",
];
