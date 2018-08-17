//date types:
export const checkIfValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
};

