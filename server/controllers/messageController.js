import Message from '../models/Message.js';
import User from "../models/User.js";

export const saveImageAndMsg = async(req, res) => {
    try {
        const senderId = req.user.id;
        const { senderName, receiverId, textMsg } = req.body;
        const filename = req?.file?.filename;

        if(textMsg && filename) {
            const doc = await Message.create({
                senderName,
                senderId,
                receiverId,
                message : {
                    text : textMsg,
                    image: filename
                }
            });
            await doc.save();
    
            res.send({
                success : "Send a message !",
                message : doc
            });
        } else {
            res.status(500).json({error: "Server Side Error !"});
        }        
    } catch(error) {
        res.status(500).json({error: error.messege});
    }
}
 
export const saveMessage = async(req, res) => {
    try {
        const { senderName, receiverId, textMsg } = req.body;
        const senderId = req.user.id;
        
        if(textMsg) {
            const message = await Message.create({
                senderName,
                senderId,
                receiverId,
                message: {
                    text: textMsg,
                    image: ""
                }
            });
            await message.save();
            res.send({
                success : "send a message",
                message
            });
        } else {
            res.status(404).json({message: "message not found"});
        }
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const saveImage = async(req, res) => {
    try {
        const senderId = req.user.id;
        const { senderName, receiverId } = req.body;
        const { filename } = req?.file;
        if(filename) {
            const doc = await Message.create({
                senderName,
                senderId,
                receiverId,
                message : {
                    text : "",
                    image: filename
                }
            });
            await doc.save();
            res.send({
                success : "Send a image !",
                message : doc
            });
        } else {
            res.status(500).json({error: "Server Side Error !"});
        } 
    } catch(error) {
        res.status(500).json({error: error.messege});
    }
}

export const getMessageById = async(req, res) => {
    try {
        const senderId = req.user.id;
        const receiverId = req.params.id;
        const receiver = await User.findOne({_id: receiverId});
        
        const message = await Message.find({
            $or: [
                { $and: [ {senderId: {$eq: senderId}}, {receiverId: {$eq: receiverId}} ] },
                { $and: [ {receiverId: {$eq: senderId}}, {senderId: {$eq: receiverId}} ] }
            ]
        });
        res.send({user: receiver, message});
    } catch(err) {
        res.status(500).json({error: err.messege});
    }
}
 
export const seenMessage = async(req, res) => {
    try {
        const messageId = req.body._id;     
        await Message.findByIdAndUpdate(messageId, {status: 'seen'}, {new: true});
        res.send({success: 'message seen'});
    } catch(err) {
        res.status(500).json({error: "Server Side Error"});
    }
}

export const deliveredMessage = async(req, res) => {
    try {
        const messageId = req.body._id;
        await Message.findByIdAndUpdate(messageId, {status: 'delivered'}, {new: true});
        res.send({success: 'message delivered'});
    } catch(err) {
        res.status(500).json({error: "Server Side Error"});
    }
}
