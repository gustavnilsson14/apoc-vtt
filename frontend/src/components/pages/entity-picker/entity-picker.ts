import { GeneratorsCollection } from './../../../../../collections/generators';
import { EntityController } from './../../../../../contracts/controllers/entity';
import { MessageFactory } from './../../../../../contracts/message';
import { EventAggregator } from 'aurelia';
import { bindable, inject } from 'aurelia';
import { creaturesList, ICreature } from './../../../../../collections/creatures';
import { ISelectInputSettings, InputFactory, InputType } from './../../../../../contracts/input';
import { BasePage } from './../../../infrastructure/view';
import { RollableHandler } from '../../../../../shared/random';
import { Client } from '../../../infrastructure/client';

@inject(Client, EventAggregator, RollableHandler, GeneratorsCollection)
export class EntityPicker extends BasePage {
    @bindable generatorString: string = "";
    @bindable generatorAmount: number = 1;
    @bindable generatorRecurse: boolean = true;
    @bindable generated: string[] = [];
    constructor(public client: Client, private eventAggregator: EventAggregator, private rollableHandler: RollableHandler, private generatorsCollection: GeneratorsCollection){
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
    @bindable enemyResult: any = {};
    @bindable enemyData: any = {};
    entities: ICreature[] = [];
    addSelected(){
        this.client.send(MessageFactory.add(EntityController.name, this.enemyResult));
    }
    addTag(e){
        this.generatorString = `${this.generatorString}[${e.target.value}]`
        e.target.blur();
    }
    getGenerated(){
        this.generated = [];
        for (let i = 0; i < this.generatorAmount; i++) {
            this.generated.push(this.generatorsCollection.generateFrom(this.generatorString, this.generatorRecurse));
        }
    }
}