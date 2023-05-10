import {IBasketItem, IItem} from "./models";

export const itemInBasket = (basket: IBasketItem[], basketItem: IBasketItem) => {
    for (let i in basket) {
        if (basket[i].item.id === basketItem.item.id && basket[i].size.id === basketItem.size.id){
            return true
        }
    }
    return false
}

export const indexOfItemInBasket = (basket: IBasketItem[], basketItem: IBasketItem) => {
    for (let i:number=0;i<basket.length;i++) {
        if (basket[i].item.id === basketItem.item.id && basket[i].size.id === basketItem.size.id){
            return i
        }
    }
    return 0
}

export const basketSum = (basket: IBasketItem[]) => {
    let sum = 0;
    for (let i:number=0;i<basket.length;i++) {
        sum += Number(basket[i].item.price) * basket[i].count
    }
    return sum
}
export const stringifyBasket = (basket: IBasketItem[]) => {
    let data = '';
    for (let i:number=0;i<basket.length;i++) {
        data += `${basket[i].item.name} - ${basket[i].item.price}₽ ${basket[i].count}шт. ${basket[i].size.name ? 'Размер: ' + basket[i].size.name : ''}\n`
    }
    return data
}