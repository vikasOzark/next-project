import axios from "axios";
import { useEffect, useState } from "react"

export const DepartmentSidenav = () => {
    const [departments, setDepartments] = useState([]);
    
    useEffect(() => {
        const getDepaartment = async () => {
            await axios.get(`api/departments`)
            .then(response => {
                if (response.status === 200) {
                    setDepartments(response.data)
                }
            })}
        getDepaartment()
    }, [])

    return (
        <>
            {departments.map(item => (
                <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-700 transition-colors duration-300 transform bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-x-2 ">
                        <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                        <span>{item.department}</span>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 rtl:rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            ))}
        </>
    )
} 
