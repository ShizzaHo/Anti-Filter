const generateDifferenceArray = (original: string, changed: string): [string, "original" | "change"][] => {
    const diffArray: [string, "original" | "change"][] = [];
    let i = 0;
    
    while (i < original.length && i < changed.length) {
        if (original[i] === changed[i]) {
            diffArray.push([original[i], "original"]);
        } else {
            diffArray.push([changed[i], "change"]);
        }
        i++;
    }
    
    while (i < original.length) {
        diffArray.push([original[i], "original"]);
        i++;
    }
    
    while (i < changed.length) {
        diffArray.push([changed[i], "change"]);
        i++;
    }
    
    return diffArray;
}

export default generateDifferenceArray;