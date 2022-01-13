import React, { useState, useEffect, useRef, forwardRef } from 'react'
import ReportContent from './ReportContent'
import ProfileImg from '../../Assets/General/defualtprofile.png'

import { ArrowCircleUpIcon, ReplyIcon, XIcon } from '@heroicons/react/solid'


const CommentCard = forwardRef(({ boardId, onSide, cmtdata, motherComment = null, APIPostReply, }, ref) => {

    const [supported, setSupported] = useState(cmtdata.userSupported)
    const [liked, setLiked] = useState(cmtdata.userLiked)
    const [disliked, setDisliked] = useState(cmtdata.userDisliked)
    const [showReportMenu, setShowReportMenu] = useState(false)
    const [showReportBtn, setshowReportBtn] = useState(false)
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
    }, [boardId, cmtdata.id, motherComment, onSide, supported, liked, disliked])

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

    const ReportButton = () => {
        return (
            <span className="absolute top-0 left-0 w-screen h-screen" onClick={() => { setshowReportBtn(false) }}>
                <div className="absolute flex flex-col"
                    style={{ top: cardmenu.current.getBoundingClientRect().y + 15, left: cardmenu.current.getBoundingClientRect().x + 15 }}>
                    <button
                        className=" bg-white hover:bg-gray-200 px-4 py-2 filter drop-shadow-md transition-colors duration-200 z-10"
                        onClick={() => { setShowReportMenu(true) }}
                    >
                        <svg className="w-7 h-7 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 33">
                            <g id="Icon_feather-flag" data-name="Icon feather-flag" transform="translate(-4.5 -1.5)">
                                <path id="Path_5" data-name="Path 5" d="M6,22.5S7.5,21,12,21s7.5,3,12,3,6-1.5,6-1.5V4.5S28.5,6,24,6,16.5,3,12,3,6,4.5,6,4.5Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                <path id="Path_6" data-name="Path 6" d="M6,33V22.5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            </g>
                        </svg>
                        <h3 className="text-gray-400 pl-1 inline">檢舉</h3>
                    </button>

                    {motherComment === null &&
                        <button
                            className="visible 2xl:hidden bg-white hover:bg-gray-200 px-4 py-2 filter drop-shadow-md transition-colors duration-200 z-10"
                            onClick={() => { setShowReplyBox(!showReplyBox) }}
                        >
                            {showReplyBox ?
                                <svg className="w-7 h-7 inline" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_15_475)">
                                        <path d="M2 11L11.8995 1.10051" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <g filter="url(#filter1_d_15_475)">
                                        <path d="M2 1.00001L11.8995 10.8995" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_15_475" x="0.5" y="0.60051" width="12.8995" height="12.8995" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="1" />
                                            <feGaussianBlur stdDeviation="0.5" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_475" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_475" result="shape" />
                                        </filter>
                                        <filter id="filter1_d_15_475" x="0.5" y="0.500008" width="12.8995" height="12.8995" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="1" />
                                            <feGaussianBlur stdDeviation="0.5" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_475" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_475" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                                :
                                <svg className="w-7 h-7 inline" xmlns="http://www.w3.org/2000/svg" width="33.38" height="27.817" viewBox="0 0 33.38 27.817">
                                    <path id="Icon_material-reply" data-name="Icon material-reply" d="M17.481,14.918V7.5L4.5,20.481,17.481,33.462v-7.6c9.272,0,15.763,2.967,20.4,9.458C36.025,26.044,30.462,16.772,17.481,14.918Z" transform="translate(-4.5 -7.5)" />
                                </svg>}
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
            <div className="w-11/12 ml-10 flex items-center" >
                <div
                    className={`w-full my-auto pl-5 pr-14 py-3 text-xl border-2 border-gray-500 rounded-3xl resize-none `}
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
                        <button className="text-3xl" onClick={() => { setshowReportBtn(true) }} ref={cardmenu}> ⋮ </button>
                        {showReportBtn && <ReportButton />}
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
