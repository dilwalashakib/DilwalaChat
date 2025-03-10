import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    try {
        const cookie = req.cookies.userInfo;      
        if(cookie) {
            const info = jwt.verify(cookie, process.env.SECRET);
            
            if(info?.id) {
                req.user = info;
                next();
            } else {
                next("Unauthorize")
            }
        } else {
            next("User Not Authenticate");
        }
    } catch(err) {
        next(err);
    }
}

export default authenticate;