export type router =  {
    "name": string,
    "owner": string,
    "creation": number,
    "modified": number,
    "modified_by": string,
    "channel_code": string,
    "team_sale": string,
    "travel_date"?: number,
    "channel_name": string,
    "employee": string,
    "status": string,
    "is_deleted": number,
    "customers": customer[],
    [key:string]: any
}

export type customer =  {
    "customer": string,
    "customer_code": string,
    "customer_name": string,
    "display_address": string,
    "phone_number": string,
    "frequency": string,
    "longitude"?: number,
    "latitude"?: number,
    [key:string]: any
}