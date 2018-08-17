export const authorsArrToString = (authors = []) => {
    if (!authors || authors.length<1){
        return "Author not found";
    }
    else if(typeof authors === "string"){
        return authors
    }
    else if(authors.length===1){
        return `Written by ${authors[0]}`;
    }
    else {
        let authorsString = `Written by ${authors[0]}`;
        for(let i=1;i<authors.length; i++){
            if(i===authors.length-1){
                authorsString += ` and ${authors[i]}`
            }
            else {
                authorsString += `, ${authors[i]}`
            }
        }
        return authorsString;
    }
};

export const isEmpty = (obj) => {
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}


