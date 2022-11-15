/* tslint:disable */
/* eslint-disable */
import { Element } from './element';
export interface GameModel {
  '_id': string;
  elements: Array<Element>;
  maxPlayers: number;
  name: string;
}
