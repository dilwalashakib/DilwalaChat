import Conversation from "@/Components/Conversation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import Sidebar from "@/Components/Sidebar";
import { ToastContainer } from "react-toastify";
import IconBar from "@/Components/IconBar";
import Link from "next/link";

const getUserInfo = async() => {
    const cookie = await cookies();
    const info = cookie.get("userInfo")?.value;
    const theme = cookie.get("theme")?.value;
    
    if(info) {
        const userInfo = jwtDecode(info);
        return { userInfo, theme }
    }
}

export default async function Message({ params }) {
    const { messages } = await params; 
    const slugName = messages?.[0];
    const id = messages?.[1];
    const info = await getUserInfo();

    return (
        info?.userInfo ? <div className={`flex dark:bg-gray-950 bg-white`}>
            <ToastContainer position="top-right" limit={1} />
            <IconBar slugName={slugName} theme={info?.theme} userImage={info?.userInfo?.image} />
            <Sidebar userInfo={info?.userInfo} id={id} />

            {id ? <Conversation userInfo={info?.userInfo} id={id} /> : (
                <div className="lg:w-[70vw] flex items-center justify-center text-2xl dark:bg-blue-950 max-lg:h-screen max-lg:w-full dark:text-white">Select Friend</div>
            )}
        </div> : <div className="flex flex-col justify-center items-center w-full h-screen">
            <h4 className="text-2xl dark:text-white">You Have No Access In this page !</h4>
            <Link href='/login' className="cursor-pointer text-blue-900 text-2xl">Login Here</Link>
        </div>
    )
}