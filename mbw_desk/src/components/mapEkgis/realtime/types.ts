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

export type employeeType = {
  object_id?: string
  employee_name: string
  avatar?: string
  name: string
  user_id?: string
}

export type optionsType = {
  apiKey: string | null;
  projectId: string | null;
  objectId?: string,
  employees?: employeeType[]
}