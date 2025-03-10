import IconBar from "@/Components/IconBar";
import SendRequest from "@/Components/SendRequest";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

const getUserInfo = async() => {
    const info = cookies().get("userInfo");
    const theme = cookies().get("theme")?.value;
    
    if(info) {
        const userInfo = jwtDecode(info.value);
        return { userInfo, theme }
    }
}

export default async function SendFriendRequests() {
    const info = await getUserInfo();
    const userInfo = info?.userInfo;
    const theme = info?.theme;

    return (
        userInfo ? (<div className={`flex dark:bg-gray-950 bg-gray-200 md:h-screen dark:text-white`}>
            <ToastContainer position="top-right" limit={1} />
            <IconBar slugName="send-request" theme={theme} userImage={userInfo?.image} />

            <div className="w-[96vw] mt-2 ml-6">
                <h2 className="text-xl mb-2">Send Requests</h2>
                <SendRequest />
            </div>
        </div>) : (<div className="flex flex-col justify-center items-center w-full h-screen">
            <h4 className="text-2xl dark:text-white">You Have No Access In this page !</h4>
            <Link href='/login' className="cursor-pointer text-blue-900 text-2xl">Login Here</Link>
        </div>
        )
    )
}