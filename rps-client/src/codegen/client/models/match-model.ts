/* tslint:disable */
/* eslint-disable */
import { RoundModel } from './round-model';
export interface MatchModel {
  '_id': string;
  createdById: string;
  gameTypeId: string;
  players: Array<string>;
  roundCount: number;
  rounds: Array<RoundModel>;
}
