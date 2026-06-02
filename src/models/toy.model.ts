export interface ToyModel {
    id: string
    name: string
    permalink: string
    description: string
    targetGroup: 'girl' | 'boy' | 'all'
    productionDate: string
    price: number
    imageUrl: string

    ageGroup: {
        Ageid: number
        name: string
        description: string
    }

    type: {
        Typeid: number
        name: string
        description: string
    }
}