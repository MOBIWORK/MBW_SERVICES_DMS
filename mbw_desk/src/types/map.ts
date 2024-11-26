export type dataMark = {

}

export interface TypeRealtimeEmployee {
    latitude: number;
    longitude: number;
    objectId: string;
    projectId: string;
    timestamp: string;
  }

  export type employeeFeatureType = {
    _id: string
    name: string, // name Nhân viên
    status: string,
    coordinates: number[],
    address: string,
    timestamp: number | string,
  }