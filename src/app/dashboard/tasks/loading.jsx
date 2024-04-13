export default function TaskLoading() {
    return (
        <div className="">
            <div className="grid grid-cols-4 gap-4">
                <div className=" softer-bg h-96 rounded-lg animate-pulse delay-500 shadow-lg ">
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    <div className=" flex bottom-auto">
                        <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    </div>
                </div>
                <div className=" softer-bg h-72 rounded-lg animate-pulse delay-700 shadow-lg ">
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                </div>
                <div className=" softer-bg h-80 rounded-lg animate-pulse delay-300 shadow-lg ">
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                    <div className="soft-bg h-10 m-2 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
