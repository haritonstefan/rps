/* tslint:disable */
/* eslint-disable */
import { TurnModel } from './turn-model';
export interface RoundModel {
  isTie?: boolean;
  number: number;
  turns: Array<TurnModel>;
  winnerId: string;
}
