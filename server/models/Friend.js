import { Schema, model } from 'mongoose';

const friendSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "unfriend"
    }
}, {timestamps: true});

const Friend = model("Friend", friendSchema);

export default Friend;