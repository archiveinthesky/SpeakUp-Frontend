const PreviewBoardContent = ({ boarddata, editContent }) => {

    return (
        <>
            {
                boarddata.title !== undefined &&
                < div className="w-full p-10 bg-white rounded-xl" >
                    <div className="flex justify-between items-center gap-6">
                        <h1 className="text-black text-4xl pb-4">{boarddata.title}</h1>
                        <button className="h-12 px-4 py-auto bg-blue-500 text-white text-lg rounded-xl" onClick={editContent}>編輯</button>
                    </div>
                    <div className="flex justify-start gap-4">
                        {
                            boarddata.tags.map((tag, i) => <div key={i} className="px-4 h-8 rounded-2xl bg-blue-300 bg-opacity-50">
                                <p className="leading-8 text-center text-blue-500 font-bold">{`#${tag}`}</p>
                            </div>
                            )
                        }
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-w-40-1fr content-start gap-x-8 gap-y-5">
                        <div className="w-20 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                            <p className="leading-10 text-center text-black text-xl">內容</p>
                        </div>
                        <div >
                            <p className="text-black text-xl">{boarddata.content}</p>
                        </div>
                        <div className="w-32 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                            <p className="leading-10 text-center text-black text-xl">立場/論點</p>
                        </div>
                        <div className="text-black">
                            <p className="font-medium text-2xl my-2 leading-8">支持者的立場</p>
                            <p className="text-xl leading-8">{boarddata.supArg}</p>
                            <p className="font-medium text-2xl mt-6 mb-2 leading-8">反對者的立場</p>
                            <p className="text-xl leading-8">{boarddata.agnArg}</p>
                        </div>
                        <div className="w-32 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                            <p className="leading-10 text-center text-black text-xl">延伸資料</p>
                        </div>
                        <div className="flex items-center">
                            {boarddata.refData.map((link, i) =>
                                <p key={i} className="text-blue-600 text-xl">{link}</p>
                            )}
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default PreviewBoardContent
