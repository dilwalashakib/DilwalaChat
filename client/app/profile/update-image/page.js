'use client';

import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ProfileImageUpdate({ userInfo }) {
    const router = useRouter();
    const [file, setFile] = useState(null);

    const profileHandler = async(e) => {
        e.preventDefault();
        // Send Data backend Server
        const formData = new FormData();
        formData.append('file', file);

        const data = await fetch(`${process.env.server}/api/user/profile-image`, {
            method: "PUT",
            credentials: "include",
            body: formData
        });
        const res = await data?.json();
        if(data?.ok) {
            setFile(null);
            toast.success(res?.success);
            router.push('/profile');
            router.refresh();
        } else {
            toast.error(res?.error);
        }
    }
    const cancelHandler = (e) => {
        setFile(null);
        router.push("/profile")
    }

    return (
        <div className="flex justify-center items-center w-full h-screen dark:bg-gray-900">
            <ToastContainer position="top-right" limit={1} />
            { !file ? (
                <div>
                    <label htmlFor="file" className="w-80 h-20 bg-green-600 flex justify-center items-center cursor-pointer hover:bg-blue-700 duration-500 ease-in rounded-md" title="upload profile pic">
                        <ArrowUpTrayIcon className="size-12 text-white" />
                    </label>
                    <input 
                        id="file" 
                        type="file" 
                        accept=".jpg, .jpeg, .png" 
                        onChange={(e) => setFile(e.target.files[0])} 
                        hidden 
                    />
                </div> ) : (
                <div className="mt-2">
                    <img 
                        src={URL.createObjectURL(file)}
                        className="rounded-xl w-80 h-auto object-cover" 
                        alt="Profile"
                    />

                    <div className="flex justify-center">
                        <button onClick={profileHandler} className="py-2 px-4 bg-green-500 rounded-lg mt-2 hover:bg-green-800 text-white">Update Image</button>

                        <button onClick={cancelHandler} className="px-4 py-2 bg-red-500 rounded-lg mt-2 ml-2 hover:bg-red-800 text-white">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}