export const registerValidator = (formData) => {
    const error = {};

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // name
    if(!name) {
        error.name = "Please Provided Your Name"
    }
    // email
    if(!email) {
        error.email = "Please Provided Your Email"
    }
    // password
    if(!password) {
        error.password = "Please Provided Your Password"
    } else if(password.length < 6) {
        error.password = "Password Length Must be 6 charecter";
    }

    if(password !== confirmPassword) {
        error.confirmPassword = "Confirm Password Not Match!"
    }

    return {
        isValid: Object.keys(error).length === 0,
        value: { name, email, password },
        error
    }
}

export const loginValidator = (formData) => {
    const error = {};

    const email = formData.get("email");
    const password = formData.get("password");
    
    // email
    if(!email) {
        error.email = "Please Provide Your Email"
    }
    // password
    if(!password) {
        error.password = "Please Provide Your Password"
    } else if(password.length < 6) {
        error.password = "Password Length Must be 6 charecter";
    }

    return {
        isValid: Object.keys(error).length === 0,
        value: { email, password },
        error
    }
}
