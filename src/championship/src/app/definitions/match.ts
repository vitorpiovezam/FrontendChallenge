import { ITeam } from "./team";

export interface IMatch {
  teams: ITeam[],
  score: string[],
  winner?: ITeam
}
