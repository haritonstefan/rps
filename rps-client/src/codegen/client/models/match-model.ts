/* tslint:disable */
/* eslint-disable */
import { RoundModel } from './round-model';
export interface MatchModel {
  createdById: string;
  gameTypeId: string;
  players: Array<string>;
  roundCount: number;
  rounds: Array<RoundModel>;
}
