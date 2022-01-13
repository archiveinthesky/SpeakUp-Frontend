import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'

const CommentResponseField = ({ boardId, onSide, commentId, hasComments }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        getResponses()
    }, [onSide, hasComments])

    const getResponses = () => {
        let onside
        if (onSide === "支持方") onside = "sup"
        else if (onSide === "反對方") onside = "agn"
        else if (onSide === null) onside = "all"
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${boardId}/${onside}/${commentId}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Start-Pos": 1,
                "End-Pos": hasComments
            }
        })
            .then(response => { return response.json() })
            .then(response => {
                let cmtarray = []
                for (let i in response) {
                    cmtarray.push(response[i])
                }
                setComments(cmtarray)
            })
    }

    return (
        <div className="w-11/12 bg-white ml-auto flex flex-col">
            {comments.map((cmt) => {
                return <CommentCard
                    boardId={boardId}
                    onSide={onSide}
                    key={"r" + commentId.toString() + "-" + comments.indexOf(cmt).toString()}
                    cmtdata={cmt}
                    motherComment={commentId}
                    replyFunction={null} />
            })}
        </div >
    )
}

export default CommentResponseField
