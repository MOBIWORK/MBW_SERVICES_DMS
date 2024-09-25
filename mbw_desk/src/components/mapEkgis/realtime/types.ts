export type summaryMoveType = RootObject[]

export interface RootObject {
    object: Object;
    summary: Summary;
  }
  interface Summary {
    move: Move;
    stop: Stop;
    checkin: Stop;
  }
  interface Stop {
    count: number;
    totalTime: number;
  }
  interface Move {
    count: number;
    totalTime: number;
    distance: number;
  }
  interface Object {
    _id: string;
    name: string;
  }

export type employeeMoveType = {
    [key:string]: any
}