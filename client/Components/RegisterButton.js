'use client';

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { registerValidator } from "@/utils/validator";

export default function RegisterButton() {
    const router = useRouter();
    // Register Handler
    const register = async(formData) => {
        try {
            const { isValid, value, error } = registerValidator(formData);
            if(isValid) {
                const data = await fetch(`${process.env.server}/api/user/register`, {
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
        <button formAction={register} className="w-full py-2 rounded-lg bg-blue-600 text-xl hover:bg-blue-800 mt-1">Register</button>
    )
}