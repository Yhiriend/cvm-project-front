import { Airconditioner } from "../../../airconditioner/domain/models/airconditioner.model";

export interface Cart {
    id: number;
    user_id:number;
    total: number;
    productList: Airconditioner[]
}