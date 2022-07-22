import { bindable } from 'aurelia';
import { DiceType } from '../../../../../../contracts/models/dice';
import { IRollableResult } from './../../../../../../shared/random';
export class RollResult{
  @bindable rollResult: IRollableResult;
  success: boolean = false;
  binding(){
    if(!this.rollResult.rollable) return;
    this.success = this.rollResult.rollable.difficulty >= this.rollResult.totalResult;
  }
  getDieImage(die: DiceType): any {
    return require(`../../../../assets/img/dice/${die.toLowerCase()}.png`);
  }
}