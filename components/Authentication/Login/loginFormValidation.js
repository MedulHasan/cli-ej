let regEmail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const loginFormValidation = (value) => {
    let error = {};

    if (!value.email) {
        error.email = "Email is required";
    } else if (regEmail.test(value.email) === false) {
        error.email = "Enter a valid email address";
    }

    if (!value.password) {
        error.password = "Password is required";
    }

    return error;
};
