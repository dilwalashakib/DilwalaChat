'use client';

import { useRouter } from "next/navigation";
import { logout } from "@/actions/logoutAction";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

export default function LogoutButton() {
    const router = useRouter();
    const logoutHandler = (e) => {
        logout();
        router.push("/login");
    }
    return (
        <button onClick={logoutHandler} className='bg-red-600 hover:bg-red-700 p-2 rounded-lg cursor-pointer' title='LogOut'>
            <ArrowRightStartOnRectangleIcon className='size-6 text-white' />
        </button>
    )
}