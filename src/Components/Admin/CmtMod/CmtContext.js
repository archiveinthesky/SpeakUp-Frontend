import { useState, useEffect, useRef } from "react"

const CmtContext = ({ rHeight = 0, boardId, motherCmt }) => {
    const [motherComment, setMotherComment] = useState("Officia esse in sit aute id nostrud nulla dolore commodo dolore elit quis. Sit Lorem proident elit non veniam esse officia aliqua velit et esse adipisicing cupidatat. Id consectetur sunt incididunt consectetur.")
    const [replyComments, setReplyComments] = useState([""])
    const [commentsHeight, setCommentsHeight] = useState(0)
    const comments = useRef(null)

    useEffect(() => {
        setReplyComments([
            "Ea qui officia ipsum ipsum aliquip nulla consequat mollit. In tempor est ullamco consequat velit ad aliqua nulla irure excepteur. Id labore cupidatat dolore aliqua minim nisi magna voluptate exercitation. Do ad eiusmod ullamco mollit anim aute deserunt labore eiusmod labore ipsum aliqua et fugiat.",
            "Culpa dolor dolore occaecat nisi aliqua minim. In velit qui aliquip Lorem anim ex minim voluptate veniam aliquip ea tempor. Exercitation laborum incididunt tempor nulla cupidatat consequat aliquip magna irure labore duis quis culpa. Nostrud magna ad enim aliqua ipsum irure anim esse cillum. Non sit irure cupidatat dolore magna ut mollit. Sunt et laborum velit ut pariatur tempor."
        ])
    }, [])

    useEffect(() => {
        setCommentsHeight(comments.current.clientHeight + 55)
    }, [comments.current.clientHeight])

    return (
        <div style={{ height: (rHeight + 56 > commentsHeight) ? commentsHeight : rHeight + 56 }} className="absolute -top-14 w-11/12 p-6 overflow-y-scroll scrollbar-hide rounded-3xl border-2 border-gray-400">
            <div ref={comments}>
                <h3 className="text-xl mb-2">這則留言是一個回覆，該對話串如下</h3>
                <h3 className="mb-2">{motherComment}</h3>
                <div className="ml-8">
                    {replyComments.map((comment, i) => <p key={i} className="my-2 leading-5">{comment}</p>)}
                </div>
            </div>
        </div>
    )
}

export default CmtContext
