export default function TaskLoading() {
    return (
        <div className="">
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-500  h-96 rounded-lg animate-pulse shadow-lg ">
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                </div>
                <div className="bg-gray-500  h-96 rounded-lg animate-pulse shadow-lg ">
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                </div>
                <div className="bg-gray-500  h-96 rounded-lg animate-pulse shadow-lg ">
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                    <div className="bg-gray-600 h-12 m-2 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
