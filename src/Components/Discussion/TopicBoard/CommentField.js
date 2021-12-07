import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'
import CommentResponseField from './CommentResponseField';

const CommentField = ({ onSide }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([])
    const [typeComment, setTypeComment] = useState(false)
    const [cmtContent, setCmtContent] = useState({ side: onSide === null ? "支持方" : onSide, text: "" })
    const [userComments, setUserComments] = useState([])
    const [furthestCmt, setFurthestCmt] = useState(10)
    const [canFetchMoreCmt, setCanFetchMoreCmt] = useState(true)

    const fetchComments = async (start, end) => {
        if (canFetchMoreCmt) {
            setIsLoading(true)
            // console.log("fetch start")
            fetch('http://127.0.0.1:5500/comments/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "boardId": 0,
                    "onSide": (onSide === null) ? "all" : (onSide === "支持方") ? "sup" : "agn",
                    "startNum": start,
                    "endNum": end
                }
            })
                .then(response => { return response.json() })
                .then(response => {
                    let cmtarray = []
                    for (let i in response) {
                        cmtarray.push(response[i])
                        if (response[i].hasMore === false) {
                            setCanFetchMoreCmt(false)
                        }
                    }
                    setFurthestCmt(comments.length + cmtarray.length)
                    setIsLoading(false)
                    setComments([...comments, ...cmtarray])
                    // console.log("Fetch Done")
                })
                .catch(error => { console.log(error) })
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
        fetchComments(1, 10)
    }, [onSide])


    //eslint-disable-next-line
    const postComment = async (cmtcontent) => {
        await fetch('http://127.0.0.1:5500/comments/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "boardId": 0,
                "accToken": 1234,
                "onSide": (onSide === "支持方") ? "sup" : "agn",
                "cmtContent": cmtcontent,
                "replyTo": null
            })
        })
            .then((response) => { return response.json() })
            .then((response) => {
                setUserComments([response, ...userComments])
                setTypeComment(false)
                console.log(cmtcontent)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const detectTypeComment = (e) => {
        setTypeComment(e.target.value !== "")
        setCmtContent({ side: cmtContent.side, text: e.target.value })
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

    return (
        <div className="bg-white" >
            <div className="h-1" />
            <div className="mx-auto mt-4 mb-2 w-11/12 flex justify-between">
                {onSide == null ?
                    <>
                        {typeComment ?
                            <div className="flex flex-col justify-between">
                                <button
                                    className={`w-32 h-12 my-auto rounded-2xl bg-green-400 bg-opacity-50 flex justify-center ${cmtContent.side === "支持方" && "border-4 border-green-600"}`}
                                    onClick={() => { setCmtContent({ side: "支持方", text: cmtContent.text }) }}
                                >
                                    <div className="my-auto">
                                        <h2 className="text-2xl text-green-600">支持方</h2>
                                    </div>
                                </button>
                                <button
                                    className={`w-32 h-12 my-auto rounded-2xl bg-red-500 bg-opacity-50 flex justify-center ${cmtContent.side === "反對方" && "border-4 border-red-500"}`}
                                    onClick={() => { setCmtContent({ side: "反對方", text: cmtContent.text }) }}
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
                <div className="w-full ml-4 flex">
                    <textarea
                        className={`w-full ${typeComment ? "h-28" : "h-14"} my-auto px-5 py-3 text-xl border-2 border-gray-500 rounded-3xl resize-none `}
                        placeholder="新增一則留言"
                        onChange={detectTypeComment}>
                    </textarea>
                    <button className={`inline relative -left-12 ${typeComment && "self-end pb-2"}`}>
                        <svg className="w-7 h-7"
                            fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
                        >
                            <line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-full mb-4 flex flex-col">
                {comments.map((cmt, i) => {
                    return (cmt.cmtReplies > 0) ?
                        <div key={"div" + comments.indexOf(cmt).toString()}>
                            <CommentCard key={comments.indexOf(cmt)} cmtdata={cmt} isLast={i + 1 === comments.length} replyable={true} fetchComments={fetchMoreComments} />
                            <CommentResponseField key={"r" + comments.indexOf(cmt).toString()} onSide={onSide} commentId={comments.indexOf(cmt)} />
                        </div> :
                        <CommentCard key={comments.indexOf(cmt)} cmtdata={cmt} isLast={i + 1 === comments.length} replyable={true} fetchComments={fetchMoreComments} />
                })}
                {isLoading && <LoadingSkeleton />}
            </div >
        </div >
    )
}

export default CommentField
