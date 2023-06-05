export const sortById = (items: any[]) => {
    return items.sort((a, b) => a.id - b.id  ||  a.name.localeCompare(b.name))
}
