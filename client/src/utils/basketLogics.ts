import {IBasketItem, IGSize, IItem} from "./models";

export const itemInBasket = (basket: IBasketItem[], basketItem: IBasketItem) => {
    for (let i in basket) {
        if (basket[i].item.id === basketItem.item.id && basket[i].size.name === basketItem.size.name){
            return true
        }
    }
    return false
}

export const indexOfItemInBasket = (basket: IBasketItem[], basketItem: IBasketItem) => {
    for (let i:number=0;i<basket.length;i++) {
        if (basket[i].item.id === basketItem.item.id && basket[i].size.name === basketItem.size.name){
            return i
        }
    }
    return 0
}

export const basketSum = (basket: IBasketItem[]) => {
    let sum = 0;
    for (let i:number=0;i<basket.length;i++) {
        sum += Number(basket[i].item.price) * basket[i].quantity
    }
    return sum
}

export const quantityInAllBranches = (size: IGSize) => {
    let sum: number = 0;
    for (let i in size.items ) {
        sum += Number(size.items[i].quantity)
    }
    return sum
}