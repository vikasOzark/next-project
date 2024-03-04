import { VscCheck } from "react-icons/vsc";

export default function CreateNote() {
    return (
        <>
            <div>
                <form
                    action=""
                    className="p-1 border flex items-center ms-2 rounded border-gray-700"
                >
                    <input
                        className="bg-transparent w-full text-gray-300 focus:outline-none"
                        type="text"
                        placeholder="note title..."
                    />
                    <button
                        type="submit"
                        className=" cursor-pointer bg-gray-500 rounded p-1 hover:bg-green-500 transition-all"
                    >
                        <VscCheck color="white" className="" />
                    </button>
                </form>
            </div>
        </>
    );
}
