export class Booking {

    constructor(
        public id: string,
        public placedId: string,
        public userId: string,
        public placedTitle: string,
        public guestNumber: number
    ) { }
}
