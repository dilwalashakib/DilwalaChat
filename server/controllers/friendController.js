import Friend from "../models/Friend.js";
import Message from "../models/Message.js";

// All Friends
export const friends = async(req, res) => {
    try {
        const userInfo = [];
        const id = req.user.id;

        const friends = await Friend.find({
            $and: [ 
                { $or: [ { senderId: { $eq: id } }, { receiverId: { $eq: id } } ] }, 
                { status: "friend"}
            ]}).populate("senderId receiverId", "-password -__v").sort({updatedAt: -1});

        for(let i = 0; i < friends.length; i++) {
            const receiverId = friends[i]?.receiverId?._id.toString() === id ? friends[i]?.senderId?._id.toString() : friends[i]?.receiverId?._id.toString();

            const lastMessage = await Message.findOne({
                $or: [
                    { $and: [{senderId: {$eq: id}}, { receiverId: {$eq: receiverId} }] },
                    { $and: [{senderId: {$eq: receiverId}}, { receiverId: {$eq: id} }] }
                ]
            }).sort({updatedAt: -1});

            const friend = friends[i]?.senderId?._id.toString() === id ? friends[i].receiverId : friends[i].senderId;

            userInfo[i] = { lastMessage, user: friend };
        }
        
        res.send(userInfo);
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    } 
}

// Send Friend Request
export const sendFriendReq = async(req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user.id;

        const isFriend = await Friend.findOne({
            $or: [
                { $and: [ {senderId: {$eq: senderId}}, {receiverId: {$eq: receiverId}} ] },
                { $and: [ {receiverId: {$eq: senderId}}, {senderId: {$eq: receiverId}} ] }
            ]
        });

        if(!isFriend) {
            const doc = await Friend.create({
                senderId,
                receiverId,
                status: 'request-send'
            });
            await doc.save();
            res.send({
                success : "Send a Friend Request !",
                friends : doc
            });
        } else {
            res.status(409).json({error: "Already Request sent"});
        }
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    } 
}

// get all friend requests
export const FriendReq = async(req, res) => {
    try {
        const id = req.user.id;
        const friends = await Friend.find({$and : [{receiverId: {$eq: id}}, {status: 'request-send'}]}).populate("senderId", '-__v');        
        
        res.send(friends);   
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    } 
}

// get all Send friend requests
export const getSendRequest = async(req, res) => {
    try {
        const id = req.user.id;
        const friends = await Friend.find({$and : [{senderId: {$eq: id}}, {status: 'request-send'}]}).populate("receiverId", '-__v');
        
        res.send(friends);   
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    } 
}
// Friend Request Confim
export const friendRequestConfirm = async(req, res) => {
    try {
        const id = req.params.id;
        await Friend.findByIdAndUpdate(id, {status: 'friend'}, {new: true});
        
        res.send({success : "Confirm Friend Request"});  
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    } 
}

// All Friend
export const allFriends = async(req, res) => {
    try {
        const id = req.user.id;
        const friends = await Friend.find({
            $and: [ 
                { $or: [ { senderId: { $eq: id } }, { receiverId: { $eq: id } } ] }, 
                { status: "friend"}
            ]}).populate("senderId receiverId", "-password -__v");
        
        res.send(friends);  
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    } 
}

// Delete or Remove Friend Request
export const removeFriend = async(req, res) => {
    try {
        const id = req.params.id;
        const removeFriend = await Friend.findByIdAndDelete(id).populate("senderId receiverId", "-password -__v");

        const senderId = removeFriend?.senderId?._id.toString();
        const receiverId = removeFriend?.receiverId?._id.toString();

        await Message.deleteMany({
            $or: [
                { $and: [{senderId: {$eq: senderId}}, { receiverId: {$eq: receiverId} }] },
                { $and: [{senderId: {$eq: receiverId}}, { receiverId: {$eq: senderId} }] }
            ]
        });        
        res.send(removeFriend);
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    }
}