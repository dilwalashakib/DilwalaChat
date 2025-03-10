import mongoose from "mongoose";

export default function dbConnect() {
    if(mongoose.connection.readyState >= 1) {
        console.log("Database Already Connected !");
        return;
    } else {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Database Connected Successfully"))
            .catch(() => console.log("Database not connected !"))
    
        mongoose.connection.on('disconnected', () => console.log('Database disonnected'));
    }       
}