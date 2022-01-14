import React, { useState, useEffect, useRef, forwardRef } from 'react'
import ReportContent from './ReportContent'
import ProfileImg from '../../Assets/General/defualtprofile.png'

import { ArrowCircleUpIcon, ReplyIcon, XIcon, FlagIcon } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline'


const CommentCard = forwardRef(({ boardId, onSide, cmtdata, motherComment = null, APIPostReply, delComment }, ref) => {

    const [supported, setSupported] = useState(cmtdata.userSupported)
    const [liked, setLiked] = useState(cmtdata.userLiked)
    const [disliked, setDisliked] = useState(cmtdata.userDisliked)
    const [showReportMenu, setShowReportMenu] = useState(false)
    const [showExtendedMenu, setShowExtendedMenu] = useState(false)
    const [showReplyBox, setShowReplyBox] = useState(false)
    const [enableAnim, setEnableAnim] = useState(false)

    const firstRender = useRef(true)
    const cardmenu = useRef(null)

    useEffect(() => {
        let onside
        if (onSide === "支持方") onside = "sup"
        else if (onSide === "反對方") onside = "agn"
        else if (onSide === null) onside = "all"
        if (!firstRender.current) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/${boardId}/${onside}${(motherComment !== null) ? "/" + motherComment : ""}/${cmtdata.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem("AuthToken"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "supported": supported,
                    "liked": liked,
                    "disliked": disliked,
                    "reported": false
                })
            })
                .then((response) => { return response.json() })
                .catch((error) => {

                })
        }
    }, [supported, liked, disliked])

    useEffect(() => { firstRender.current = false }, [])

    const updateUserStatus = (updatevar) => {
        if (!enableAnim) setEnableAnim(true)
        if (updatevar === "supported") {
            setSupported(!supported)
            if (!supported) {
                setLiked(false)
                setDisliked(false)
            }
        } else if (updatevar === "liked") {
            setLiked(!liked)
            if (!liked) {
                setSupported(false)
                setDisliked(false)
            }
        } else if (updatevar === "disliked") {
            setDisliked(!disliked)
            if (!disliked) {
                setSupported(false)
                setLiked(false)
            }
        }

    }

    const deleteComment = () => {
        let onside
        if (onSide === "支持方") onside = "sup"
        else if (onSide === "反對方") onside = "agn"
        else if (onSide === null) onside = "all"
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/comments/delete/${boardId}/${onside}${(motherComment !== null) ? "/" + motherComment : ""}/${cmtdata.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
            }
        })
            .then(response => {
                if (response.status === 204) {
                    delComment(cmtdata.id)
                }
            })
            .catch((error) => { })

    }

    const ExtendedMenu = () => {
        return (
            <span className="absolute top-0 left-0 w-screen h-screen" onClick={() => { setShowExtendedMenu(false) }}>
                <div className="absolute flex flex-col"
                    style={{ top: cardmenu.current.getBoundingClientRect().y + 15, left: cardmenu.current.getBoundingClientRect().x + 15 }}
                >
                    <button
                        className=" bg-white hover:bg-gray-200 px-4 py-2 filter drop-shadow-md transition-colors duration-200 z-10"
                        onClick={() => { setShowReportMenu(true) }}
                    >
                        <FlagIcon className='w-7 h-7 inline' />
                        <h3 className="text-gray-400 pl-1 inline">檢舉</h3>
                    </button>

                    {cmtdata.isOwner &&
                        <button
                            className=" bg-white hover:bg-gray-200 px-4 py-2 filter drop-shadow-md transition-colors duration-200 z-10"
                            onClick={deleteComment}
                        >
                            <TrashIcon className='w-7 h-7 inline' />
                            <h3 className="text-gray-400 pl-1 inline">刪除</h3>
                        </button>

                    }

                    {motherComment === null &&
                        <button
                            className="visible 2xl:hidden bg-white hover:bg-gray-200 px-4 py-2 filter drop-shadow-md transition-colors duration-200 z-10"
                            onClick={() => { setShowReplyBox(!showReplyBox) }}
                        >
                            {showReplyBox ? <XIcon className='w-7 h-7 inline' /> : <ReplyIcon className='w-7 h-7 inline' />}
                            <h3 className="text-gray-400 pl-1 inline">{showReplyBox ? "取消" : "回覆"}</h3>
                        </button>}
                </div>
            </span>
        )
    }


    const ReplyTextField = () => {
        const replyFieldRef = useRef(null)

        const postReply = () => {
            APIPostReply(cmtdata.id, replyFieldRef.current.innerText)
            replyFieldRef.current.innerText = ""
            setShowReplyBox(false)
        }

        return (
            <div className="w-11/12 ml-10 flex items-center overflow-x-hidden" >
                <div
                    className={`w-full my-auto pl-5 pr-14 py-3 flex-grow-0 text-xl border-2 border-gray-500 rounded-3xl`}
                    contentEditable={true}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            postReply()
                        }
                    }}
                    ref={replyFieldRef}
                >
                </div>
                <button className={`relative right-12 -bottom-1 pb-2`} onClick={postReply} >
                    <ReplyIcon className='w-7 h-7' />
                </button>
            </div>
        )
    }


    return (
        <>
            <div className=" w-11/12 mx-auto my-2 border-2 border-gray-200 rounded-3xl duration-300" ref={ref}>
                <div className="w-full px-4 2xl:px-8 mx-auto mt-2 flex justify-start">
                    <img className="p-2 rounded-full overflow-hidden w-14 h-14" src={ProfileImg} alt="Profile" />
                    <div className="my-auto pl-2"><h3 className=" text-black text-2xl">{cmtdata.accName}</h3></div>
                </div>
                <p className="w-full px-8 2xl:px-16 mt-2 mb-4 mx-auto text-xl">{cmtdata.cmtContent}</p>
                <div className="w-full px-8 2xl:px-16 mx-auto flex justify-between mt-2 mb-2">
                    <div className="flex h-10">
                        <div className="flex min-w-max h-10 border-2 border-gray-200 rounded-3xl">
                            <div className="ml-2 my-1">
                                <button onClick={() => { updateUserStatus("liked") }}>
                                    <svg className={`inline mx-2 w-7 ${(liked && enableAnim) && "animate-jump-up"} ${liked ? "filter-green ease-in" : "filter-none"}`} xmlns="http://www.w3.org/2000/svg" width="25.149" height="25.501" viewBox="0 0 25.149 25.501">
                                        <path id="Icon_feather-thumbs-up" data-name="Icon feather-thumbs-up" d="M16.5,10.875v-4.5A3.375,3.375,0,0,0,13.125,3l-4.5,10.125V25.5h12.69a2.25,2.25,0,0,0,2.25-1.913l1.553-10.125a2.25,2.25,0,0,0-2.25-2.588ZM8.625,25.5H5.25A2.25,2.25,0,0,1,3,23.251V15.375a2.25,2.25,0,0,1,2.25-2.25H8.625" transform="translate(-1.5 -1.5)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                    </svg>
                                </button>
                                <span className="align-middle"><p className="inline text-lg mr-2">{cmtdata.cmtLikes + (liked ? 1 : 0)}</p></span>
                            </div>
                            <div className="ml-2 my-1 flex items-center">
                                <button className='w-8 h-8 mx-2 overflow-hidden' onClick={() => { updateUserStatus("supported") }}>
                                    <ArrowCircleUpIcon className={`inline w-8 overflow-hidden ${supported ? "text-blue-600 " : "text-blue"} ${supported & enableAnim && "animate-fly-up "}`} />
                                </button>
                                <p className="inline text-lg mr-2">{cmtdata.cmtSupport + (supported ? 1 : 0)}</p>
                            </div>
                            <div className="mx-2 my-1">
                                <button onClick={() => { updateUserStatus("disliked") }}>
                                    <svg className={`inline mx-2 w-7 ${(disliked && enableAnim) && "animate-jump-down"} ${disliked ? "filter-red ease-in" : "filter-none"}`} xmlns="http://www.w3.org/2000/svg" width="22.934" height="23.251" viewBox="0 0 22.934 23.251">
                                        <path id="Icon_feather-thumbs-down" data-name="Icon feather-thumbs-down" d="M11.255,16.162v4.05a3.037,3.037,0,0,0,3.037,3.037l4.05-9.112V3H6.921A2.025,2.025,0,0,0,4.9,4.721L3.5,13.834a2.025,2.025,0,0,0,2.025,2.329ZM18.342,3h2.7A2.339,2.339,0,0,1,23.4,5.025v7.087a2.339,2.339,0,0,1-2.359,2.025h-2.7" transform="translate(-1.971 -1.499)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                    </svg>
                                    <span className="align-middle"><p className="inline text-lg mr-2">{cmtdata.cmtDislikes + (disliked ? 1 : 0)}</p></span>
                                </button>
                            </div>
                        </div>
                        {motherComment === null &&
                            <button className=" invisible 2xl:visible my-auto ml-4" onClick={() => { setShowReplyBox(!showReplyBox) }}>
                                {showReplyBox ? <XIcon className='w-7 h-7 inline' /> : <ReplyIcon className='w-7 h-7 inline' />}
                            </button>
                        }
                    </div>
                    <div>
                        <button className="text-3xl" onClick={() => { setShowExtendedMenu(true) }} ref={cardmenu}> ⋮ </button>
                        {showExtendedMenu && <ExtendedMenu />}
                    </div>
                    {showReportMenu && <ReportContent
                        rHeader="請問此留言有什麼問題？"
                        rQuestions={["留言內容惡意攻擊其他使用者", "留言內容與此討論無關", "留言內容含有騷擾、廣告內容", "其他"]}
                        closeReportContent={() => { setShowReportMenu(false) }}
                        boardId={boardId}
                        motherComment={motherComment}
                        commentid={cmtdata.id}
                    />}
                </div>
            </div>
            {showReplyBox && <ReplyTextField />}
        </>
    )
})

export default CommentCard
