import { useState, useEffect, useRef } from "react"

const CmtFieldHeader = ({ boardId, onSide, addUserComment }) => {

    const [typingCmt, setTypingCmt] = useState(false)
    const [newCmtSide, setNewCmtSide] = useState(onSide === null ? "支持方" : onSide)
    const [swtichedSides, setSwitchedSides] = useState(false)
    const cmtTextarea = useRef(null)

    useEffect(() => {
        if (!typingCmt) cmtTextarea.current.innerText = "有想法嗎？提出來討論吧"
        else if (cmtTextarea.current.innerText === "有想法嗎？提出來討論吧") cmtTextarea.current.innerText = ""
    }, [typingCmt])

    const postComment = async (cmtside, cmtcontent) => {
        if (cmtcontent === "" || cmtcontent === "有想法嗎？提出來討論吧") return false
        let onside = ""
        if (cmtside === "支持方") onside = "sup"
        else if (cmtside === "反對方") onside = "agn"
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${boardId}/${onside}`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "cmtContent": cmtcontent,
            })
        })
            .then((response) => { return response.json() })
            .then((response) => {
                addUserComment(response)
                setTypingCmt(false)
                cmtTextarea.current.innerText = ""
            })
            .catch((error) => {

            })
    }

    return (
        <div className="mx-auto mt-4 mb-2 w-11/12 flex justify-between gap-4">
            {onSide == null ? <> {typingCmt ?
                <div className="flex flex-col justify-between gap-2 flex-shrink-0">
                    <button
                        className={`h-12 my-auto px-6 rounded-2xl bg-green-400 bg-opacity-50 flex justify-center ${newCmtSide === "支持方" && "border-4 border-green-600"}`}
                        onMouseDown={() => { setNewCmtSide("支持方"); setSwitchedSides(true) }}
                    >
                        <div className="my-auto">
                            <h2 className="text-2xl text-green-600">支持方</h2>
                        </div>
                    </button>
                    <button
                        className={`h-12 my-auto px-6 rounded-2xl bg-red-500 bg-opacity-50 flex justify-center ${newCmtSide === "反對方" && "border-4 border-red-500"}`}
                        onMouseDown={() => { setNewCmtSide("反對方"); setSwitchedSides(true) }}
                    >
                        <div className="my-auto">
                            <h2 className="text-2xl text-red-500">反對方</h2>
                        </div>
                    </button>
                </div> :
                <div className={`px-6 h-14 my-auto rounded-2xl bg-gray-300 flex-shrink-0 flex justify-center`}>
                    <div className="my-auto">
                        <h2 className="text-3xl">留言</h2>
                    </div>
                </div>
            }</> :
                <div className={`h-14 my-auto px-4 rounded-2xl ${onSide === "支持方" && "bg-green-400"} ${onSide === "反對方" && "bg-red-500"} bg-opacity-50 flex-shrink-0 flex justify-center`}>
                    <div className="my-auto">
                        <h2 className={`text-3xl ${onSide === "支持方" && "text-green-600"} ${onSide === "反對方" && "text-red-500"}`}>{onSide}</h2>
                    </div>
                </div>
            }

            <div className="relative flex-grow overflow-x-hidden">
                <div
                    className={`w-[calc(100%)] h-full 
                    my-auto pl-5 pr-14 py-3
                    text-xl ${typingCmt ? "text-black" : "text-gray-500"} 
                    border-2 border-gray-500 rounded-3xl`}
                    ref={cmtTextarea}
                    contentEditable={true}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            postComment(onSide === null ? newCmtSide : onSide, cmtTextarea.current.innerText)
                        }
                    }}
                    onFocus={() => { setTypingCmt(true) }}
                    onBlur={() => {
                        if (!swtichedSides) setTypingCmt(false)
                        else {
                            setSwitchedSides(false)
                            cmtTextarea.current.focus()
                        }
                    }}
                >
                </div>
                <button
                    className="inline absolute right-6 bottom-3"
                    onMouseDown={() => { setSwitchedSides(true) }}
                    onClick={() => { postComment(onSide === null ? newCmtSide : onSide, cmtTextarea.current.innerText) }}
                >
                    <svg className="w-7 h-7"
                        fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div >
    )

}

export default CmtFieldHeader
