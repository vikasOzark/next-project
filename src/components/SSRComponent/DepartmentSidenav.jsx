import { LoadingState } from "../Buttons";
import { useQuery } from "react-query";
import { ErrorMessage } from "../Messages/NotificationMessage";

export const DepartmentSidenav = () => {
    const responseData = useQuery("departments",async () => {
        const response = await fetch("api/departments")
        const json_response = await response.json()
        return json_response
    })

    return (
        <>
            {responseData.isSuccess && responseData.data.length && responseData.data.map(item => (
                <button key={item.id} className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-700 transition-colors duration-300 transform bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-x-2 ">
                        <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                        <span>{item.department}</span>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 rtl:rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            ))}
            {responseData.isError && <ErrorMessage message={"Something went wrong."} />}
            {responseData.isLoading && <><div className="flex justify-center "><LoadingState title={"Loading..."} /></div></>}
        </>
    )
} 
