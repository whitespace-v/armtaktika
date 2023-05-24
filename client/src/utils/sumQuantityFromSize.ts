import {IGSize} from "./models";

export const sumQuantityFromSize = (obj: IGSize) => {
    let acc = 0
    for (let i in obj.items){
        acc += Number(obj.items[i].quantity)
    }
    return acc
}