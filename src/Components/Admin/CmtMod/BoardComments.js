import { useState, useRef, useEffect } from "react"
import { cloneDeep } from "lodash"
import TrialComment from "./TrialComment"
import CommentRules from "./CommentRules"
import CmtContext from "./CmtContext"

const BoardComments = ({ boardId }) => {
    const cmtSection = useRef(null)
    const [TOSHeight, setTOSHeight] = useState(0)
    const [boardTitle, setBoardTitle] = useState("")
    const [commentQueue, setCommentQueue] = useState([])
    const [curReplyThread, setCurReplyThread] = useState(null)

    useEffect(() => {
        setBoardTitle("台灣應該廢除早自習嗎？")
        setCommentQueue([
            {
                "id": 2,
                "replingTo": 2,
                "content": "Nulla sint deserunt aliquip ullamco incididunt laborum do proident. Laboris adipisicing qui anim labore do occaecat. Esse anim cillum ea proident in aute non deserunt incididunt do est laboris. Id et dolor tempor officia deserunt deserunt sunt sint. Nulla est incididunt voluptate anim laborum reprehenderit dolore incididunt enim. Magna aute fugiat laboris eiusmod cillum veniam proident."
            },
            {
                "id": 3,
                "content": "Elit quis fugiat consequat qui commodo incididunt est nisi. Ea nulla nulla elit fugiat ad duis officia nulla nisi quis id dolor in occaecat. Ex velit proident dolor qui consectetur Lorem eu officia ea dolor sint nulla."
            }
        ])
    }, [])

    useEffect(() => {
        setTOSHeight(cmtSection.current.clientHeight)
    }, [cmtSection.current.clientHeight])

    const toggleReplyThread = (showThread, commentId) => {
        if (showThread) setCurReplyThread(commentId)
        else setCurReplyThread(null)
    }

    const sendDecision = (ban, cmtPos) => {
        if (ban) {

        }
        let newQueue = cloneDeep(commentQueue)
        newQueue.splice(cmtPos, 1)
        setCommentQueue(newQueue)
    }

    return (
        <div className={`w-11/12 ${commentQueue.length === 0 && "hidden"} px-8 py-8 bg-white rounded-3xl`}>
            <div className="flex gap-4 items-center">
                <h2 className="text-3xl">{boardTitle}</h2>
                <div className="px-4 py-2 rounded-3xl bg-accent-blue flex items-center">
                    <p className="text-base text-white text-center">進入管理</p>
                </div>
            </div>
            <div className="mx-1 mt-6 flex items-center gap-12">
                <div className="w-7/12 flex flex-col gap-6" ref={cmtSection}>
                    {commentQueue.map((content, i) => {
                        return (<TrialComment
                            key={i}
                            cmtPos={i}
                            data={content}
                            toggleThread={toggleReplyThread}
                            sendDecision={sendDecision}
                        />)

                    })}
                </div>
                <div style={{ height: TOSHeight }} className="relative w-5/12">
                    {curReplyThread === null ?
                        <CommentRules rHeight={TOSHeight} /> :
                        <CmtContext rHeight={TOSHeight} boardId={boardId} motherCmt={curReplyThread} />
                    }
                </div>
            </div>
        </div>
    )
}

export default BoardComments
