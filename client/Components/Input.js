export default function Input({name, label, type, placeholder}) {
    return (
        <div className="mb-4">
            <label className="text-xl block mb-1" htmlFor={name}>{ label }</label>
            <input
                className="w-full rounded-xl py-2 px-3 text-black outline-hidden text-lg bg-gray-100 dark:bg-blue-900 dark:text-white"
                name={name} 
                type={type} 
                placeholder={placeholder} 
                id={name}
            />
        </div>
    )
}