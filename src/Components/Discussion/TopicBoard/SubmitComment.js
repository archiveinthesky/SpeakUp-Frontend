import React, { useState } from 'react'

const SubmitComment = ({
    onSideProp, closeSubmitComment, clickhandler, isreply = false
}) => {
    const [cmtcontent, setCmtcontent] = useState("")
    const [onSide, setOnSide] = useState(onSideProp)

    return (
        <div className="w-screen h-screen fixed top-0 left-0 grid align-middle z-10">
            <span className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-50" onClick={() => { closeSubmitComment() }}></span>
            <div className="w-5/12 h-5/6 m-auto bg-white rounded-3xl flex flex-col flex-auto z-10">
                <div className="h-4" />
                {isreply ?
                    <div className="flex justify-center" >
                        <h2 className={"text-3xl text-green-400"}>回覆留言</h2>
                    </div> :
                    <div className="flex justify-center">
                        <button
                            className={`w-40 h-16 mx-2 rounded-2xl bg-green-400 ${onSide === "支持方" && "border-4 border-green-600"} bg-opacity-50 flex justify-center`}
                            onClick={() => { setOnSide("支持方") }}
                        >
                            <div className="my-auto">
                                <h2 className={"text-3xl text-green-400"}>支持方</h2>
                            </div>
                        </button>
                        <button
                            className={`w-40 h-16 mx-2 rounded-2xl bg-red-500 ${onSide === "反對方" && "border-4 border-red-500"} bg-opacity-50 flex justify-center`}
                            onClick={() => { setOnSide("反對方") }}
                        >
                            <div className="my-auto">
                                <h2 className={"text-3xl text-red-500"}>反對方</h2>
                            </div>
                        </button>
                    </div>
                }

                <textarea className="w-10/12 my-3 mx-auto px-5 py-4 text-xl resize-none border-2 border-black rounded-3xl flex-grow"
                    onChange={(e) => { setCmtcontent(e.target.value) }}
                />
                <div className="w-10/12 mx-auto mb-4 flex justify-end">
                    <div className="w-32 my-auto">
                        <p className="inline text-xl mr-2 text-gray-300">是否匿名</p>
                        <input className="inline w-4 h-4" type="checkbox"></input>
                    </div>
                    <button className="w-24 h-10 rounded-2xl bg-green-400 bg-opacity-50 flex">
                        <div className="m-auto">
                            <h2 className={"text-2xl text-green-600 text-center"} onClick={() => { clickhandler(cmtcontent) }}>發送</h2>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubmitComment
