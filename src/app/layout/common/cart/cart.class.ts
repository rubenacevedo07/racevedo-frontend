
class Cart {
    userID: number
    items: Item[] 

    constructor(userID: number, items: Item[] ) {
            this.userID = userID;
            this.items = items;
    }
}