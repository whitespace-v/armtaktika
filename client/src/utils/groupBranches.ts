export const groupBranches = (array: any[]) => {
    return Object.values(
        array.reduce((groups, obj) => {
            const { name, ...rest } = obj;
            groups[name] = groups[name] || { name, items: [] };
            groups[name].items.push(rest);
            return groups
        }, {})
    );
}