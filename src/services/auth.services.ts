import { OrderModel } from "../models/oreder.model"
import { ToyModel } from "../models/toy.model"
import { UserModel } from "../models/user.models"


const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
    static getUsers(): UserModel[] {
        const baseUser: UserModel = {
            email: 'user@example.com',
            password: 'user123',
            favorite_toy: 'LEGO',
            firstName: 'Example',
            lastName: 'User',
            phone: '0653093267',
            address: 'Danijelova 32',
            orders: []
        }

        if (localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
        }

        return JSON.parse(localStorage.getItem(USERS)!)
    }

    static login(email: string, password: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === email && u.password === password) {
                localStorage.setItem(ACTIVE, email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u
            }
        }

        return null
    }

    static updateActiveUser(newUserData: UserModel) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.firstName = newUserData.firstName
                u.lastName = newUserData.lastName
                u.address = newUserData.address
                u.phone = newUserData.phone
                u.favorite_toy = newUserData.favorite_toy
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static updateActiveUserPassword(newPassword: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.password = newPassword
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static logout() {
        localStorage.removeItem(ACTIVE)
    }

    static createOrder(order: Partial<OrderModel>, toy: ToyModel) {
        const newOrder: OrderModel = {
            ...order,
            toyId: toy.id,
            state: 'reserved',
            createdAt: new Date().toISOString()
        } as OrderModel

        const users = this.getUsers()

        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.orders.push(newOrder)
            }
        }

        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static getOrdersByState(state: 'reserved' | 'arrived' | 'cancelled') {
        const users = this.getUsers()

        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u.orders.filter(o => o.state === state)
            }
        }

        return []
    }
    static cancelOrder(createdAt: string) {
        const users = this.getUsers()

        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state === 'reserved' && o.createdAt === createdAt) {
                        o.state = 'cancelled'
                    }
                }
            }
        }

        localStorage.setItem(USERS, JSON.stringify(users))
    }
    static markOrdersArrived() {
        const users = this.getUsers()

        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state === 'reserved') {
                        o.state = 'arrived'
                    }
                }
            }
        }

        localStorage.setItem(USERS, JSON.stringify(users))
    }
    static createUser(user: Partial<UserModel>) {
        const users = this.getUsers()
        user.orders = []
        users.push(user as UserModel)
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static existsByEmail(email: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === email) return true
        }

        return false
    }

}