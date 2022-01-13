const LoadingSkeleton = () => {
    return (
        <div className=" w-11/12 mx-auto my-2 border-2 border-gray-200 rounded-3xl" >
            <div className="w-full px-8 mx-auto mt-6 flex justify-start">
                <div className="p-2 bg-gray-300 rounded-full overflow-hidden w-10 h-10 animate-pulse" />
                <div className="w-28 h-10 ml-4 my-auto pl-2 rounded-2xl bg-gray-300 animate-pulse"></div>
            </div>
            <div className="w-5/6 h-9 px-16 mt-4 mb-2 mx-auto bg-gray-300 rounded-2xl animate-pulse"></div>
            <div className="w-5/6 h-9 px-16 mt-2 mb-4 mx-auto bg-gray-300 rounded-2xl animate-pulse"></div>
        </div>
    )
}

export default LoadingSkeleton
