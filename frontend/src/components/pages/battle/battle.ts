import { Grid, ITile, Vector2, GridType } from './../../../../../shared/grid';
import { BattleController, IBattleMessage } from './../../../../../contracts/controllers/battle';
import { MessageFactory, MessageType, IMessage } from './../../../../../contracts/message';
import { bindable, EventAggregator, inject } from 'aurelia';
import { Client } from '../../../infrastructure/client';
import { BattleFactory, IBattle } from './../../../../../contracts/models/battle';
import { LoaderModuleType } from '../../../../../contracts/loader';
import { IRequestResponse } from '../../../../../contracts/base';

@inject(Client, EventAggregator)
export class Battle{
    @bindable currentBattle: IBattle;
    @bindable currentMessage: IBattleMessage;
    tileSize = 80;
    private isServerChange = false;
    constructor(private client: Client, private eventAggregator: EventAggregator){}
    attached() {
        this.eventAggregator.subscribeOnce(`${MessageType.RESPONSE}_${BattleController.name}`,(message: IMessage)=>{
            this.isServerChange = true;
            this.currentBattle = ((message.data as IRequestResponse).collection[0] as unknown as IBattle);
            this.isServerChange = false;
        })
        this.client.send(MessageFactory.request(BattleController.name, {id:null}));
        this.eventAggregator.subscribe(`${MessageType.PROVISION}_${BattleController.name}`,(message: IMessage)=>{
            this.isServerChange = true;
            this.currentBattle = (message.data as unknown as IBattle[])[0];
            this.isServerChange = false;
        })
        this.client.send(MessageFactory.subscribe(BattleController.name));
    }
    createBattle():void{
        this.client.send(MessageFactory.clientMessage(MessageType.ADD, LoaderModuleType.CONTROLLER, BattleController.name, BattleFactory.createDefaultBattle()));
    }
    getTilePosition(tile: ITile): string{
        const tileCenter: Vector2 = {
            x: this.currentBattle.grid.dimensions.x / 2,
            y: this.currentBattle.grid.dimensions.y / 2,
        };
        const topPos = (tile.pos.y - tileCenter.y) * this.tileSize;
        const leftPos = (tile.pos.x - tileCenter.x) * this.tileSize;
        const style = `top:${topPos}px;left:${leftPos}px;width:${this.tileSize}px;height:${this.tileSize}px;`;
        return style;
    }
    currentMessageChanged(){
        this.client.send(this.currentMessage);
    }
}