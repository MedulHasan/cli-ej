let regEmail =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const formValidation = ({ value, passwordPreferences }) => {
    let error = {};
    if (!value.name) {
        error.name = "Your name is required";
    } else if (value.name > 192) {
        error.name = "Name is too large";
    } else if (value.name.length < 3) {
        error.name = "Name should be at least 3 characters.";
    }

    if (!value.email) {
        error.email = "Email is required";
    } else if (regEmail.test(value.email) === false) {
        error.email = "Enter a valid email address";
    }

    const err = passwordValidation(value, passwordPreferences);

    return { ...error, ...err };
};

export function passwordValidation(value, passwordPreferences) {
    const checkRegex = (v) => {
        const r = new RegExp(v);
        return r.test(value.password);
    };
    let regPassword = "^";
    let passwordError = "";
    for (let preference in passwordPreferences) {
        if (preference == "uppercase" && passwordPreferences[preference]) {
            regPassword = regPassword + `(?=.*[a-z])`;
            passwordError = passwordError + ` uppercase,`;
        }
        if (preference == "lowercase" && passwordPreferences[preference]) {
            regPassword = regPassword + `(?=.*[A-Z])`;
            passwordError = passwordError + ` lowercase,`;
        }
        if (preference == "number" && passwordPreferences[preference]) {
            regPassword = regPassword + `(?=.*[0-9])`;
            passwordError = passwordError + ` numbers,`;
        }
        if (preference == "symbol" && passwordPreferences[preference]) {
            regPassword = regPassword + `(?=.*[!@#$%^&*()_+=-?<>{}~])`;
            passwordError = passwordError + ` symbols`;
        }
    }
    const error = {};
    if (!value.password) {
        error.password = "Password is required";
    } else if (
        checkRegex(regPassword + `\\S{${passwordPreferences.length},}$`) ===
        false
    ) {
        error.password = `Password must contain${passwordError} ${
            passwordError && "and "
        }${passwordPreferences.length} characters long.`;
        `Password must contain uppercase, lowercase, symbols and 6 characters long.`;
    }
    return error;
}
