'use client'

import Input from "@/Components/Input";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import LoginButton from "@/Components/LoginButton";

export default function Login() {
    return (
        <form className='flex justify-center items-center h-screen dark:text-white dark:bg-gray-900'>
            <div className='w-96 dark:bg-blue-950 bg-gray-200 p-6 rounded-lg'>
                <h2 className="text-center text-3xl mb-4">Login Here</h2>
                <Input 
                    name="email"
                    type="text" 
                    placeholder="Your Email" 
                    label="Email"
                />

                <Input
                    name="password"
                    type="password" 
                    placeholder="Your Password" 
                    label="Password"
                />

                <LoginButton />

                <p className="mt-2 w-full text-center text-lg">
                    <span>You have no account? </span>
                    <Link href='/register' className="text-blue-400 hover:text-blue-600"> Register Here</Link>
                </p>
                <ToastContainer position="bottom-center" limit={1} />
            </div>
        </form>
    )
}