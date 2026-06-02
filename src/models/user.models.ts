import { OrderModel } from "./oreder.model"

export interface UserModel {
    firstName: string
    lastName: string
    email: string
    password: string
    favorite_toy: string,
    address: string
    phone: string 
    orders: OrderModel[]
}