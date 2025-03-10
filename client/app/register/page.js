import Link from "next/link";
import Input from "@/Components/Input";
import { ToastContainer } from "react-toastify";
import RegisterButton from "@/Components/RegisterButton";

export default function Register() {
    return (
        <form className='flex justify-center items-center h-screen'>
            <div className='w-96 bg-slate-200 dark:bg-slate-900 p-6 rounded-lg'>
                <h2 className="text-center text-3xl mb-4">Register Here</h2>
            
                <Input 
                    name="name" 
                    label="Name" 
                    type="text" 
                    placeholder="Your Name..."
                />

                <Input 
                    name="email" 
                    label="Email" 
                    type="email" 
                    placeholder="Your Email..." 
                />

                <Input 
                    name="password"
                    label="Password" 
                    type="password" 
                    placeholder="Your Password..." 
                />

                <Input 
                    name="confirmPassword" 
                    label="Confirm Password" 
                    type="password" 
                    placeholder="Confirm Password..." 
                />

                <RegisterButton />

                <p className="mt-2 w-full text-center text-lg">
                    <span>Already have an account? </span>
                    <Link href='/login' className="text-blue-400 hover:text-blue-600"> Login Here</Link>
                </p>

                <ToastContainer position="bottom-center" limit={1} />
            </div>
        </form>
    )
}
