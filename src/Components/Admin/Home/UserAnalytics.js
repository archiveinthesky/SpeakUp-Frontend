const UserAnalytics = () => {
    return (
        <div className="w-full h-96 px-12 py-8 bg-white rounded-3xl ">
            <h3 className="text-3xl">本月總覽</h3>
            <div className="w-full h-[calc(100%-36px)] my-4 flex justify-center items-center">
                <ul className="w-1/2 h-[91.6%] py-3 flex flex-col justify-between">
                    <li className="text-xl flex justify-between">
                        <p>議題總閱讀次數</p>
                        <p>60%</p>
                    </li>
                    <li className="text-xl flex justify-between">
                        <p>議題收藏率</p>
                        <p>60%</p>
                    </li>
                    <li className="text-xl flex justify-between">
                        <p>議題總閱讀次數</p>
                        <p>60%</p>
                    </li>
                    <li className="text-xl flex justify-between">
                        <p>留言比率</p>
                        <p>60%</p>
                    </li>
                    <li className="text-xl flex justify-between">
                        <p>問題留言比率</p>
                        <p>60%</p>
                    </li>
                </ul>
                <div className="mx-6 h-[91.6%] border-l-2 border-gray-400"></div>
                <div className="w-1/2">
                </div>
            </div>
            <div className="h-1"></div>
        </div>
    )
}

export default UserAnalytics
