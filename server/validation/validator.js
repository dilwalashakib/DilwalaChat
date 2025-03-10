import validator from "validator";

validator.default;

const registerValidator = (user) => {
    const error = {};
    // Name
    if(!user.name) {
        error.name = "Please Provide Your Name !";
    }
    // Email
    if(!user.email) {
        error.email = "Please Provide Your Email !";
    } else if(!validator.isEmail(user.email)) {
        error.email = "Please Provide a Valid Email !";
    }
    // Password
    if(!user.password) {
        error.password = "Please Provide Your Password !";
    } else if(user.password.length < 6) {
        error.password = "Password Must be 6 Length"
    }

    return {
        isValid : Object.keys(error).length === 0,
        error
    }
}

const loginValidator = (user) => {
    const error = {};
    // Email
    if(!user.email) {
        error.email = "Please Provide Your Email !";
    } else if(!validator.isEmail(user.email)) {
        error.email = "Please Provide a valid Email !";
    }
    // Password
    if(!user.password) {
        error.password = "Please Provide a Password !";
    } else if(user.password.length < 6) {
        error.password = "Password Length must be 6 charecter";
    }

    return {
        isValid : Object.keys(error).length === 0,
        error
    }
}



export {
    registerValidator,
    loginValidator
}