'use client';

import { loginValidator } from "@/utils/validator";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginButton() {
    const router = useRouter();
    const loginHandler = async(formData) => {
        try {
            const { isValid, value, error } = loginValidator(formData);
            if(isValid) {
                const data = await fetch(`${process.env.server}/api/user/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(value)
                })
                const res = await data.json();
                if(data.ok) {
                    toast.success(res?.success);
                    router.push('/profile');
                    router.refresh();
                } else {
                    toast.error(res?.error);
                }                
            } else {
                toast.error(error?.name || error?.email || error?.password || error?.confirmPassword)
            }
        } catch(error) {
            toast.error(error.message);
        } 
    }

    return (
        <button formAction={loginHandler} className="w-full py-2 rounded-lg bg-blue-600 text-xl hover:bg-blue-800 mt-1 cursor-pointer">Login</button>
    )
}