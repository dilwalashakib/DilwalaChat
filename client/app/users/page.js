import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import IconBar from "@/Components/IconBar";
import { ToastContainer } from "react-toastify";
import AllUsers from "@/Components/AllUsers";
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

export default async function Users() {
    const info = await getUserInfo();  
    const userInfo = info?.userInfo;
    const theme = info?.theme;
    return (
        userInfo ? (<div className={`flex dark:bg-gray-950 bg-gray-200 min-h-screen dark:text-white`}>
            <ToastContainer position="top-right" limit={1} />
            <IconBar slugName="users" theme={theme} userImage={userInfo?.image} />

            <div className="w-[96vw] mt-2 ml-6">
                <div className="text-xl mb-2"><h2>All Users</h2></div>
                <AllUsers />
            </div>
        </div>) : ( <div className="flex flex-col justify-center items-center w-full h-screen">
            <h4 className="text-2xl dark:text-white">You Have No Access In this page !</h4>
            <Link href='/login' className="cursor-pointer text-blue-900 text-2xl">Login Here</Link>
        </div>)
    )
}