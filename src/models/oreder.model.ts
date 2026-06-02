import { ToyModel } from "./toy.model"

export interface OrderModel {
    toy: ToyModel
    count: number
    state: 'reserved' | 'arrived' | 'cancelled'
    createdAt: string
}