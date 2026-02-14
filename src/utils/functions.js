export const multiplication = (value1 = 0, value2 = 0) => {
    return Number(value1) * Number(value2);
};

export const capitalizeWords = (str = '', joinBy) => {
    const formatStringToLowerCase = str.toLowerCase();

    const formatedStringList = formatStringToLowerCase
        .split(' ')
        .map(
            (word) => word[0].toUpperCase() + word.slice(1)
    );

    const updatedString = formatedStringList.join(joinBy);

    return updatedString;
};