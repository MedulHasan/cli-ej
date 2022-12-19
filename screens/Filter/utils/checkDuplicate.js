export const unique = (value, index, self) => {
    return self.indexOf(value) === index;
};
export const uniqueCheck = (value, index) => {
    return {
        name: value,
        id: index,
        isChecked: false,
    };
};
