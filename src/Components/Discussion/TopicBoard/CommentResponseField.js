import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'

const CommentResponseField = ({ onSide, commentId }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5500/cmtresponses/', {
            headers: {
                "boardid": 0,
                "onside": (onSide === "支持方") ? "sup" : "agn",
                "commentId": commentId,
                "startNum": 1,
                "endNum": 10
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
    }, [])

    return (
        <div className="w-11/12 bg-white ml-auto flex flex-col">
            {comments.map((cmt) => { return <CommentCard key={comments.indexOf(cmt)} cmtdata={cmt} /> })}
        </div >
    )
}

export default CommentResponseField
