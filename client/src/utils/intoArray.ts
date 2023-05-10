export const intoArray = (array: any[], item: any) => {
    for (let i in array){
        if (array[i].name === item.name){
            return true
        }
    }
}