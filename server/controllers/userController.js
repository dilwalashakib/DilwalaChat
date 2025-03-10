import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Friend from "../models/Friend.js";
import { registerValidator, loginValidator } from "../validation/validator.js";
// Register
export const registerController = async(req, res) => {
    try {
        const { name, email, password } = req.body
        const {isValid, error} = registerValidator({ name, email, password });

        if(isValid) {
            const isEmailExists = await User.findOne({ email });           
                 
            if(!isEmailExists) {
                const hashPassword = await bcrypt.hash(password, 10);
                
                if(hashPassword) {
                    const doc = await User.create({
                        name,
                        email,
                        password: hashPassword
                    });
                    await doc.save();

                    const { _id, image, createdAt } = doc;
                    const token = jwt.sign({
                        id: _id,
                        name,
                        email,
                        image,
                        createdAt
                    }, process.env.SECRET, {expiresIn: '30d'});

                    // Cookie Set
                    res.cookie('userInfo', token, {
                        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
                    });

                    res.send({ token, success: "user created successfully"});
                } else {
                    res.status(500).send({error: "Server Side Error !"});
                }
                
            } else {
                res.status(403).send({error: "User Already Exists !"});
            }
        } else {
            res.status(500).send(error);
        }
    } catch(err) {
        res.status(500).json({ error: "Server Side Error !" });
    }
}

// Log In
export const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;
        // Validate
        const {isValid, error} = loginValidator({email, password});
        if(isValid) {
            const isEmailExists = await User.findOne({email});
            
            if(isEmailExists) {
                // HashPassword
                const isPasswordValid = await bcrypt.compare(password, isEmailExists.password);
                if(isPasswordValid) {
                    const token = jwt.sign({
                        id: isEmailExists?._id,
                        name: isEmailExists?.name,
                        email: isEmailExists?.email,
                        image: isEmailExists?.image,
                        createdAt: isEmailExists?.createdAt
                    }, process.env.SECRET, {expiresIn: "30d"});
                    // Cookie Set
                    res.cookie('userInfo', token, {
                        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
                    });

                    res.send({success: "Login Successfully Completed !", token});
                } else {
                    res.status(403).json({error: "UnAuthorize!"});
                }
            } else {
                res.status(404).json({error: 'User Not Found'});
            }
        } else {
            res.status(500).json(error);
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

// All Users
export const allUsers = async(req, res) => {
    try {
        const id = req.user.id;
        const friends = await Friend.find({$or: [{senderId: id}, {receiverId: id}]});

        const friendQuery = [];
        for(let i = 0; i < friends.length; i++) {
            friendQuery.push(friends[i].senderId.toString());
            friendQuery.push(friends[i].receiverId.toString());
        }
        if(friendQuery.length === 0) {
            friendQuery.push(id);
        }
        
        const users = await User.find({_id: {$nin: friendQuery}}).select("-password -__v");
        
        res.send(users);
    } catch (err) {
        res.status(500).json({error: "Server Side Error !"});
    }
}

// LogOut
export const logoutController = async(req, res) => {
    res.cookie("userInfo", null).send({success: true});
}

// Profile Pic Update
export const profilePicUpdate = async(req, res) => {
    try {
        const myId = req.user.id;
        const { filename } = req?.file;
        if(filename && myId) {
            const update = await User.findByIdAndUpdate(myId, {
                image: filename
            }, {new: true});

            const { _id, name, email, image, createdAt } = update;

            const token = jwt.sign({
                id: _id,
                name,
                email,
                image,
                createdAt
            }, process.env.SECRET, {expiresIn: '30d'});

            // Cookie Set
            res.cookie('userInfo', token, {
                expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
            });

            res.send({ token, success: "Profile updated successfully"});
        } else {
            res.status(500).json({error: "Server Side Error !"});
        } 
    } catch(error) {
        res.status(500).json({error: "There was a server side error"});
    }
}

// Get All User
// export const allUserRemove = async(req, res) => {
//     try {
//         const data = await User.deleteMany({});
//         res.send({messege: "data Deleted"});
//     } catch (err) {
//         res.status(500).json({error: "Server Side Error !"});
//     }
// }
