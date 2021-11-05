import React from 'react'
import CommentCard from './CommentCard'

const CommentField = () => {
    return (
        <div className="w-full h-screen bg-white grid grid-cols-1 gap-6">
            <div className="mx-auto mt-4 w-11/12 flex justify-between">
                <div className="w-40 h-16 rounded-2xl bg-red-500 bg-opacity-50 flex justify-center">
                    <div className="my-auto"><h2 className="text-3xl text-red-500">支持方</h2></div>
                </div>
                <button className="w-full ml-4">
                    <div className="w-full h-14 flex rounded-3xl border-2 border-gray-500">
                        <div className="my-auto ml-5">
                            <p className="text-2xl text-gray-400">新增一則留言</p>
                        </div>
                    </div>
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
            </div>
            <div className="mb-4" />
        </div>
    )
}

export default CommentField
