let emailReg =
    /^$|^[A-Za-z0-9]+((\.[_A-Za-z0-9-]+)|(\_[.A-Za-z0-9-]+)|(\-[.A-Za-z0-9_]+))*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
let phoneReg = /^[+]?[0-9]{1,15}$/;
let zipReg = /^[0-9]*$/;

let error = {
    first_name: false,
    last_name: false,
    phone: false,
    address_1: false,
    city: false,
    country: false,
    type_of_place: false,
    email: "",
};
export const addressFormValidation = (name, text) => {
    if (name === "email" && emailReg.test(text) === false) {
        error[name] = "Required valid Email Address";
    } else {
        if (text === "") {
            error[name] = true;
        } else {
            error[name] = false;
        }
    }
};
