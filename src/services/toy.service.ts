import axios from "axios";
import {ToyModel} from "../models/toy.model"

const client = axios.create({
    baseURL: 'https://toy.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'KVA_2026/dev'
    },
    validateStatus(status) {
        return status === 200
    }
})

export class ToyService {
   // GET: sve igracke
    static async getToys() {
        return await client.get<ToyModel[]>('/toy')
    }

    // GET: toy po ID
    static async getToyById(id: number) {
        return await client.get<ToyModel>(`/toy/${id}`)
    }

    // GET: toy po permalink-u
    static async getToyByPermalink(permalink: string) {
        return await client.get<ToyModel>(`/toy/permalink/${permalink}`)
    }

    // POST: lista po ID-jevima
    static async getToysByIds(ids: number[]) {
        return await client.post<ToyModel[]>('/toy/list', ids)
    }

    // GET: age groups
    static async getAgeGroups() {
        return await client.get('/age-group')
    }

    // GET: types
    static async getTypes() {
        return await client.get('/type')
    }
}
// nije zavresno
