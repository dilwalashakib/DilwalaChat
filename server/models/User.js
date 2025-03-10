import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    image: {
        type: String,
        default: ""
    },
    friends: [{
        friendId: {
            type: String,
            required: true
        },
        senderId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: ''
        }, 
        status: {
            type: String,
            default: 'unfriend'
        }
    }]
}, {timestamps: true});

const User = model("User", userSchema);

export default User;