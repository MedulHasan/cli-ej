export const dateCount = [];
for (let i = 1; i <= 31; i++) {
    dateCount.push(i);
}
export const monthCount = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const convertMonth = (value) => {
    return monthCount[parseInt(value - 1)];
};

export const yearCount = [];
for (let i = new Date().getFullYear(); i > 1900; i--) {
    yearCount.push(i);
}

export const editFormValidation = (updateData) => {
    let phoneReg = /^[+]?[0-9]{1,15}$/;
    const error = {};
    if (updateData.firstName === "") {
        error.name = true;
    }

    if (!updateData.gender) {
        error.gender = true;
    }

    if (updateData.phone && phoneReg.test(updateData.phone) === false) {
        error.phone = "Phone number max 15 char long";
    }

    return error;
};

export const confirmGender = (value, setGender) => {
    if (value === "Male") {
        setGender({
            male: value,
            female: "",
        });
    } else {
        setGender({
            male: "",
            female: value,
        });
    }
};

export const appendFormData = (updateData) => {
    let month =
        typeof updateData.month === "number"
            ? updateData.month
            : monthCount.indexOf(updateData.month);
    let formData = new FormData();
    let birthday =
        updateData.year && updateData.month && updateData.day
            ? `${updateData.year}/${month}/${updateData.day}`
            : "";
    formData.append("name", `${updateData.firstName} ${updateData.lastName}`);
    formData.append("email", updateData.email);
    formData.append("gender", updateData.gender);
    formData.append("phone", updateData.phone);
    formData.append("birthday", birthday);
    formData.append("address", updateData.address);
    formData.append("attachment", updateData.attachment);
    return formData;
};
