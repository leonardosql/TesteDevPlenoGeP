import { Match } from "./match";

export class Player {
    PlayerId: number;
    Name: string;
    Matches : Match[];

    MatchesCount : number;
    AverageScore : number;
    HighestScore : number;
    LowestScore : number;
    RecordTime : number;
    GameTime : number;
  }