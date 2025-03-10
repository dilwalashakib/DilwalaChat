import VideoCall from "@/Components/VideoCall";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const getUserInfo = async() => {
    const info = cookies().get("userInfo");
    
    if(info) {
        const userInfo = jwtDecode(info.value);
        return userInfo
    }
}

export default async function VideoCallSystem({ searchParams }) {
    const { senderId, receiverId } = searchParams;    
    const userInfo = await getUserInfo();
    
    return (
        <div className="dark:bg-gray-950 w-full">
            <VideoCall 
                senderId={senderId}
                receiverId={receiverId}
                userInfo={userInfo} 
            />
        </div>
    )
}