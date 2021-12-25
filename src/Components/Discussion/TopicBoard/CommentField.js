import React, { useState, useEffect, useRef } from 'react'
import CommentCard from './CommentCard'
import CommentResponseField from './CommentResponseField';

const CommentField = ({ boardId, onSide }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([])
    const [userComments, setUserComments] = useState([])
    const [furthestCmt, setFurthestCmt] = useState(10)
    const [canFetchMoreCmt, setCanFetchMoreCmt] = useState(true)
    const [errorOccured, setErrorOccured] = useState(false)

    const fetchComments = async (start, end) => {
        if (canFetchMoreCmt) {
            setIsLoading(true)
            let onside = ""
            if (onSide === "支持方") onside = "sup"
            else if (onSide === "反對方") onside = "agn"
            else if (onSide === null) onside = "all"
            fetch(`http://localhost:8000/api/comments/${boardId}/${onside}`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem("AuthToken"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Start-Pos': start,
                    'End-Pos': end
                }
            })
                .then(response => { return response.json() })
                .then(response => {
                    let cmtarray = []
                    for (let i in response) {
                        if (response[i] === false) {
                            setCanFetchMoreCmt(false)
                        } else {
                            cmtarray.push(response[i])
                        }
                    }
                    setFurthestCmt(comments.length + cmtarray.length)
                    setIsLoading(false)
                    setComments([...comments, ...cmtarray])
                })
                .catch(error => {
                    let errtxt = `獲取頁面資料時發生錯誤(${error.message})，請重新整理網頁。若錯誤持續發生，請稍待片刻，我們將盡快修復。`
                    setErrorOccured(errtxt)
                })
        }
    }

    const fetchMoreComments = () => {
        if (canFetchMoreCmt) {
            setIsLoading(true)
            if (!isLoading) {
                fetchComments(furthestCmt + 1, furthestCmt + 10)
            }
        }
    }

    useEffect(() => {
        setCanFetchMoreCmt(true)
        setUserComments([])
        setComments([])
        fetchComments(1, 10)
    }, [onSide])


    const postReply = async (commentid, cmtcontent) => {
        let onside = ""
        if (onSide === "支持方") onside = "sup"
        else if (onSide === "反對方") onside = "agn"
        await fetch(`http://localhost:8000/api/comments/${boardId}/${onside}/${commentid}`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "cmtContent": cmtcontent
            })
        })
            .then((response) => { return response.json() })
            .then((response) => {
                if (userComments.some(cmt => cmt.id === commentid)) {
                    let newCmts = userComments.map((x) => JSON.parse(JSON.stringify(x)))
                    for (let i = 0; i < newCmts.length; i++) {
                        if (newCmts[i].id === commentid) {
                            newCmts[i].cmtReplies += 1
                            break
                        }
                    }
                    setUserComments(newCmts)
                }
                else {
                    let newCmts = comments.map((x) => JSON.parse(JSON.stringify(x)))
                    for (let i = 0; i < newCmts.length; i++) {
                        if (newCmts[i].id === commentid) {
                            newCmts[i].cmtReplies += 1
                            break
                        }
                    }
                    setComments(newCmts)
                }
            })
            .catch((error) => {

            })
    }


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

    const NoCommentsDisplay = () => {
        return (
            <div className=" w-11/12 h-40 mx-auto my-2 border-2 border-gray-200 rounded-3xl flex" >
                <div className='m-auto'>
                    <h1 className='text-xl text-center'>
                        目前還沒有留言呢 <br />
                        成為第一個留言的人吧
                    </h1>
                </div>
            </div>
        )
    }

    const CmtFieldHeader = () => {

        const [typingCmt, setTypingCmt] = useState(false)
        const [newCmtSide, setNewCmtSide] = useState(onSide === null ? "支持方" : onSide)
        const [cmtContent, setCmtContent] = useState("")
        const [swtichedSides, setSwitchedSides] = useState(false)
        const cmtTextarea = useRef()

        const postComment = async (cmtside, cmtcontent) => {
            let onside = ""
            if (cmtside === "支持方") onside = "sup"
            else if (cmtside === "反對方") onside = "agn"
            await fetch(`http://localhost:8000/api/comments/${boardId}/${onside}`, {
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
                    setUserComments([response, ...userComments])
                    setTypingCmt(false)
                })
                .catch((error) => {

                })
        }

        return (
            <>
                {onSide == null ?
                    <>
                        {typingCmt ?
                            <div className="flex flex-col justify-between">
                                <button
                                    className={`w-32 h-12 my-auto rounded-2xl bg-green-400 bg-opacity-50 flex justify-center ${newCmtSide === "支持方" && "border-4 border-green-600"}`}
                                    onMouseDown={() => {
                                        setNewCmtSide("支持方")
                                        setSwitchedSides(true)
                                    }}
                                >
                                    <div className="my-auto">
                                        <h2 className="text-2xl text-green-600">支持方</h2>
                                    </div>
                                </button>
                                <button
                                    className={`w-32 h-12 my-auto rounded-2xl bg-red-500 bg-opacity-50 flex justify-center ${newCmtSide === "反對方" && "border-4 border-red-500"}`}
                                    onMouseDown={() => {
                                        setNewCmtSide("反對方")
                                        setSwitchedSides(true)
                                    }}
                                >
                                    <div className="my-auto">
                                        <h2 className="text-2xl text-red-500">反對方</h2>
                                    </div>
                                </button>
                            </div> :
                            <div className={`w-32 h-14 my-auto rounded-2xl bg-gray-300 flex justify-center`}>
                                <div className="my-auto">
                                    <h2 className="text-3xl">留言</h2>
                                </div>
                            </div>
                        }
                    </> :
                    <div className={`w-40 h-14 my-auto rounded-2xl ${onSide === "支持方" && "bg-green-400"} ${onSide === "反對方" && "bg-red-500"} bg-opacity-50 flex justify-center`}>
                        <div className="my-auto">
                            <h2 className={`text-3xl ${onSide === "支持方" && "text-green-600"} ${onSide === "反對方" && "text-red-500"}`}>{onSide}</h2>
                        </div>
                    </div>
                }
                <form
                    className="w-full ml-4 flex"
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (cmtContent != "") postComment(newCmtSide, cmtContent)
                    }}
                >
                    <input
                        className="w-full h-14 my-auto pl-5 pr-14 py-3 text-xl border-2 border-gray-500 rounded-3xl resize-none"
                        placeholder="新增一則留言"
                        onChange={(e) => { setCmtContent(e.target.value) }}
                        value={cmtContent}
                        ref={cmtTextarea}
                        onFocus={() => { setTypingCmt(true) }}
                        onBlur={() => {
                            if (!swtichedSides) setTypingCmt(false)
                            else {
                                setSwitchedSides(false)
                                cmtTextarea.current.focus()
                            }
                        }}
                    >
                    </ input>
                    <button
                        className="inline relative -left-12"
                        type='submit'
                        onMouseDown={() => { setSwitchedSides(true) }}
                    >
                        <svg className="w-7 h-7"
                            fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
                        >
                            <line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </form>

            </>
        )

    }

    const DynamicCommentDisplay = ({ boardId, cmt, comments, i, postReply, fetchMoreComments, onSide }) => {
        return (
            (cmt.cmtReplies > 0) ?
                <div key={"div" + comments.indexOf(cmt).toString()}>
                    <CommentCard
                        boardId={boardId}
                        onSide={onSide}
                        key={comments.indexOf(cmt)}
                        cmtdata={cmt}
                        isLast={i + 1 === comments.length}
                        APIPostReply={postReply}
                        fetchComments={fetchMoreComments}
                    />
                    <CommentResponseField
                        key={"r" + comments.indexOf(cmt).toString()}
                        boardId={boardId}
                        onSide={onSide}
                        commentId={cmt.id}
                        hasComments={cmt.cmtReplies}
                    />
                </div> :
                <CommentCard
                    boardId={boardId}
                    onSide={onSide}
                    key={comments.indexOf(cmt)}
                    cmtdata={cmt}
                    isLast={i + 1 === comments.length}
                    APIPostReply={postReply}
                    fetchComments={fetchMoreComments}
                />
        )
    }

    return (
        <>
            {errorOccured === false ?
                <div className="bg-white" >
                    <div className="h-1" />
                    <div className="mx-auto mt-4 mb-2 w-11/12 flex justify-between">
                        <CmtFieldHeader />
                    </div>
                    <div className="w-full mb-4 flex flex-col">
                        {userComments.map((cmt, i) => {
                            return (<DynamicCommentDisplay
                                key={i}
                                boardId={boardId}
                                cmt={cmt}
                                comments={comments}
                                postReply={postReply}
                                fetchMoreComments={fetchMoreComments}
                                onSide={onSide}
                            />)
                        })}
                        {comments.map((cmt, i) => {
                            return (
                                <DynamicCommentDisplay
                                    key={i}
                                    boardId={boardId}
                                    cmt={cmt}
                                    comments={comments}
                                    postReply={postReply}
                                    fetchMoreComments={fetchMoreComments}
                                    onSide={onSide}
                                />
                            )
                        })}
                        {isLoading && <LoadingSkeleton />}
                        {(userComments.length + comments.length) === 0 && <NoCommentsDisplay />}
                    </div >
                </div > :
                <div className="bg-red-200 w-full h-48 mx-auto py-3 flex rounded-xl">
                    <div className='m-auto'>
                        <h1 className='text-center text-3xl text-red-500 font-medium'>錯誤</h1>
                        <p className='my-2 px-6 text-center text-xl text-red-500'>{errorOccured}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default CommentField
