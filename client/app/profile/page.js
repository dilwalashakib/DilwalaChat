import IconBar from "@/Components/IconBar";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { cookies } from "next/headers";
import Link from "next/link";

const getUserInfo = async() => {
    const info = cookies().get("userInfo");
    const theme = cookies().get("theme")?.value;
    
    if(info) {
        const userInfo = jwtDecode(info.value);
        return { userInfo, theme }
    }
}

export default async function Profile() {
    const { userInfo, theme } = await getUserInfo();
    
    return (
        <div className={`flex dark:bg-gray-950 bg-gray-100 h-screen dark:text-white`}>
            <IconBar slugName="profile" theme={theme} userImage={userInfo?.image} />
            <div className="sm:flex gap-4 w-[96vw] mt-2 ml-6">

                <div className="flex flex-col">
                    <img 
                        src={`./profile/${userInfo?.image ? userInfo.image : 'default.png'}`}
                        className="rounded-xl w-80 h-auto" 
                        alt="Profile"
                    />
                    <Link href={'./profile/update-image'} className="py-2 px-4 text-lg bg-green-600 rounded-lg mt-2 text-center hover:bg-green-800 text-white">Edit Image</Link>
                </div>

                <div className="text-xl mt-1">
                    <p className="pt-2">Name: {userInfo?.name}</p>
                    <p className="pt-1">Email: {userInfo?.email}</p>
                    <p className="pt-1">Profile Created: {moment(userInfo.createdAt).startOf("millisecond").fromNow()}</p>
                </div>
            </div>
        </div>
    )
}