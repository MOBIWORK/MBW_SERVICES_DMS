export type summaryMoveType = RootObject[]

export interface RootObject {
    object: {
      _id: string
    };
    summary: SummaryType;
  }
// export type employeeMoveType = {
//     [key:string]: any,
    
// }

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
  employees?: employeeType[] |[]
}

// type emp move
export interface employeeMoveType {
  object_id: any
  employee_name: string
  avatar: any
  name: string
  user_id: any
  summary?: SummaryType
}

export interface SummaryType {
  moves: Moves
  stops: Stops
  checkins: Checkins
}

export interface Moves {
  count: number
  geo_distance: number
  distance: number
  totalTime: number
  avgSpeed: number
  maxSpeed: number
}

export interface Stops {
  count: number
  totalTime: number
}

export interface Checkins {
  count: number
  totalTime: number
}