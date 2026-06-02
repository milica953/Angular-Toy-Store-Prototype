export class DataService {
    static getFullTargetGroup(group: 'girl' | 'boy' | 'all') {
        switch (group) {
            case 'girl':
                return 'Devojčica'

            case 'boy':
                return 'Dečak'

            default:
                return 'Svi'
        }
    }

    static getFullStatus(status: 'reserved' | 'arrived' | 'cancelled') {

        switch (status) {

            case 'reserved':
                return 'Rezervisano'

            case 'arrived':
                return 'Pristiglo'

            default:
                return 'Otkazano'
        }
    }

}