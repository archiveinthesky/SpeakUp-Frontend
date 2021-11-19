import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'
import CommentResponseField from './CommentResponseField';
import SubmitComment from './SubmitComment';

const CommentField = ({ onSide }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([])
    const [typeComment, setTypeComment] = useState(false)
    const [userComments, setUserComments] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5500/comments/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "boardid": 0,
                "onside": (onSide === "支持方") ? "sup" : "agn",
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
        <div className="bg-white">
            <div className="mx-auto mt-4 mb-2 w-11/12 flex justify-between">
                <div className={`w-40 h-16 my-auto rounded-2xl ${onSide === "支持方" && "bg-green-400"} ${onSide === "反對方" && "bg-red-500"} bg-opacity-50 flex justify-center`}>
                    <div className="my-auto">
                        <h2 className={`text-3xl ${onSide === "支持方" && "text-green-600"} ${onSide === "反對方" && "text-red-500"}`}>{onSide}</h2>
                    </div>
                </div>
                <button className="w-full ml-4" onClick={() => { setTypeComment(true) }}>
                    <div className="w-full h-14 flex rounded-3xl border-2 border-gray-500">
                        <div className="my-auto ml-5">
                            <p className="text-2xl text-gray-400">新增一則留言</p>
                        </div>
                    </div>
                </button>
            </div>
            <div className="w-full mb-4 flex flex-col">
                {comments.map((cmt) => {
                    return (cmt.cmtReplies > 0) ?
                        <div key={"div" + comments.indexOf(cmt).toString()}>
                            <CommentCard key={comments.indexOf(cmt)} cmtdata={cmt} />
                            <CommentResponseField key={"r" + comments.indexOf(cmt).toString()} onSide={onSide} commentId={comments.indexOf(cmt)} />
                        </div> :
                        <CommentCard key={comments.indexOf(cmt)} cmtdata={cmt} />
                })}
            </div >
            <div>
                {typeComment &&
                    <SubmitComment
                        onSideProp={onSide}
                        closeSubmitComment={() => { setTypeComment(!typeComment) }}
                        userComments={userComments}
                        setUserComments={setUserComments}
                    />}
            </div>
        </div>
    )
}

export default CommentField
