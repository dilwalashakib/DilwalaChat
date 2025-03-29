import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
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

export default async function Home() {
    const info = await getUserInfo();
    const userInfo = info?.userInfo;
    const theme = info?.theme;

    return (
        <div className="flex flex-col justify-center items-center w-full bg-gray-900 h-[100vh] text-white">
            <h2 className="text-center text-3xl">Welcome To <span className="text-yellow-500">Dilwala</span> Messenger</h2>
            { userInfo ? (
                <p className="mt-2 w-full text-center text-lg">
                    <span>Already you Login your account. Your </span>
                    <Link href='/profile' className="text-blue-400 hover:text-blue-600">Profile</Link>
                    <span> here</span>
                </p>
            ) : (
                <div>
                    <p className="mt-2 w-full text-center text-lg">
                        <span>Already have an account? </span>
                        <Link href='/login' className="text-blue-400 hover:text-blue-600"> Login Here</Link>
                    </p>

                    <p className="mt-2 w-full text-center text-lg">
                        <span>You have no account? </span>
                        <Link href='/register' className="text-blue-400 hover:text-blue-600"> Register Here</Link>
                    </p>
                </div>
            )}
        </div>
    )
}