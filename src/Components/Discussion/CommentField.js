import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

import CommentCard from './CommentCard'
import CommentResponseField from './CommentResponseField';
import LoadingSkeleton from './Comments/LoadingSkeleton'
import CmtFieldHeader from './Comments/CmtFieldHeader';
import { cloneDeep } from 'lodash';


const CommentField = ({ boardId, onSide }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([])
    const [userComments, setUserComments] = useState([])
    const [furthestCmt, setFurthestCmt] = useState(10)
    const [canFetchMoreCmt, setCanFetchMoreCmt] = useState(true)
    const [errorOccured, setErrorOccured] = useState(false)

    const { ref: lastCardRef, inView: lastCardInView, entry } = useInView()

    const fetchComments = async (start, end) => {
        if (canFetchMoreCmt) {
            setIsLoading(true)
            let onside = ""
            if (onSide === "支持方") onside = "sup"
            else if (onSide === "反對方") onside = "agn"
            else if (onSide === null) onside = "all"
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${boardId}/${onside}`, {
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
        if (canFetchMoreCmt && !isLoading) {
            fetchComments(furthestCmt + 1, furthestCmt + 10)
        }
    }

    const postReply = async (commentid, cmtcontent) => {
        let onside = ""
        if (onSide === "支持方") onside = "sup"
        else if (onSide === "反對方") onside = "agn"
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${boardId}/${onside}/${commentid}`, {
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
            .then((response) => {

                if (userComments.some(cmt => cmt.id === commentid)) {
                    let newCmts = cloneDeep(userComments)
                    for (let i = 0; i < newCmts.length; i++) {
                        if (newCmts[i].id === commentid) {
                            newCmts[i].cmtReplies += 1
                            break
                        }
                    }
                    setUserComments(newCmts)
                }
                else {
                    let newCmts = cloneDeep(comments)
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

    useEffect(() => {
        if (entry !== undefined) {
            if (entry.isIntersecting) {
                fetchMoreComments()
            }
        }
    }, [lastCardInView])


    useEffect(() => {
        setCanFetchMoreCmt(true)
        setUserComments([])
        setComments([])
        fetchComments(1, 10)
    }, [onSide])


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

    const addUserComment = (commentContent) => {
        setUserComments([commentContent, ...userComments])
    }

    const delComment = (commentid) => {
        if (userComments.some(cmt => cmt.id === commentid)) {
            let newCmts = cloneDeep(userComments)
            for (let i = 0; i < newCmts.length; i++) {
                if (newCmts[i].id === commentid) newCmts.splice(i, 1)
            }
            setUserComments(newCmts)
        }
        else {
            let newCmts = cloneDeep(comments)
            for (let i = 0; i < newCmts.length; i++) {
                if (newCmts[i].id === commentid) newCmts.splice(i, 1)
            }
            setComments(newCmts)
        }
    }

    return (
        <>
            {errorOccured === false ?
                <div className="bg-white" >
                    <div className="h-1" />
                    <CmtFieldHeader boardId={boardId} onSide={onSide} addUserComment={addUserComment} />
                    <div className="w-full mb-4 flex flex-col divide-y divide-gray-300 lg:divide-y-0 ">
                        {[...userComments, ...comments].map((cmt, i) => {
                            return (
                                <div key={i}>
                                    <CommentCard
                                        boardId={boardId}
                                        onSide={onSide}
                                        cmtdata={cmt}
                                        APIPostReply={postReply}
                                        fetchComments={fetchMoreComments}
                                        ref={i + 1 === comments.length ? lastCardRef : null}
                                        delComment={delComment}
                                    />
                                    {cmt.cmtReplies > 0 &&
                                        <CommentResponseField
                                            boardId={boardId}
                                            onSide={onSide}
                                            commentId={cmt.id}
                                            hasComments={cmt.cmtReplies}
                                        />}
                                </div>
                            )
                        })}

                        {isLoading && <LoadingSkeleton />}
                        {(userComments.length + comments.length) === 0 && !isLoading && <NoCommentsDisplay />}
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
