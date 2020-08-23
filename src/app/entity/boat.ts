import { BoatType } from './boat-type';
export class Boat {

  constructor(
    public id = 0,
    public name: string = '',
    public description: string = '',
    public type: BoatType){
  }
}
