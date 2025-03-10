import {Schema, model} from "mongoose";

const messageSchema = new Schema({
    senderName: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    message: {
        text: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        }
    },
    status: {
        type: String,
        default: 'unseen'
    }
}, { timestamps: true });

const Message = model("Message", messageSchema);

export default Message;