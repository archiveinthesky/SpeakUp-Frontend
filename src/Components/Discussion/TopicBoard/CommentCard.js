import React, { useState, useEffect } from 'react'

const CommentCard = ({ cmtdata }) => {
    const [supported, setSupported] = useState(cmtdata.userSupported)
    const [liked, setLiked] = useState(cmtdata.userLiked)
    const [disliked, setDisliked] = useState(cmtdata.userDisliked)

    const updateUserStatus = (updatevar) => {
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

    return (
        <div className="w-11/12 mx-auto my-2 border-2 border-black rounded-3xl">
            <div className="w-11/12 mx-auto mt-2 flex justify-start">
                <img className="p-2 rounded-full overflow-hidden w-14 h-14" src={cmtdata.accPic} alt="Profile" />
                <div className="my-auto pl-2"><h3 className=" text-black text-2xl">{cmtdata.accName}</h3></div>
            </div>
            <p className="w-10/12 mt-2 mb-4 mx-auto text-xl">{cmtdata.cmtContent}</p>
            <div className="w-10/12 mx-auto flex mt-2 mb-2">
                <div className="flex min-w-max border-2 border-black rounded-3xl">
                    <div className="ml-2 my-1">
                        <button onClick={() => { updateUserStatus("supported") }}>
                            <svg className={`inline mx-2 w-7 ${supported ? "filter-blue" : "filter-none"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.501 22.501">
                                <path id="Icon_awesome-arrow-circle-up" data-name="Icon awesome-arrow-circle-up" d="M.563,11.813a11.25,11.25,0,1,1,11.25,11.25A11.248,11.248,0,0,1,.563,11.813Zm6.514,1.311L10.361,9.7v8.284a1.086,1.086,0,0,0,1.089,1.089h.726a1.086,1.086,0,0,0,1.089-1.089V9.7l3.284,3.425a1.09,1.09,0,0,0,1.556.018l.494-.5a1.084,1.084,0,0,0,0-1.538l-6.015-6.02a1.084,1.084,0,0,0-1.538,0l-6.024,6.02a1.084,1.084,0,0,0,0,1.538l.494.5A1.1,1.1,0,0,0,7.077,13.124Z" transform="translate(-0.563 -0.563)" />
                            </svg>
                        </button>
                        <span className="align-middle"><p className="inline text-lg mr-2">{cmtdata.cmtSupport + (supported ? 1 : 0)}</p></span>
                    </div>
                    <div className="ml-2 my-1">
                        <button onClick={() => { updateUserStatus("liked") }}>
                            <svg className={`inline mx-2 w-7 ${liked ? "filter-green" : "filter-none"}`} xmlns="http://www.w3.org/2000/svg" width="25.149" height="25.501" viewBox="0 0 25.149 25.501">
                                <path id="Icon_feather-thumbs-up" data-name="Icon feather-thumbs-up" d="M16.5,10.875v-4.5A3.375,3.375,0,0,0,13.125,3l-4.5,10.125V25.5h12.69a2.25,2.25,0,0,0,2.25-1.913l1.553-10.125a2.25,2.25,0,0,0-2.25-2.588ZM8.625,25.5H5.25A2.25,2.25,0,0,1,3,23.251V15.375a2.25,2.25,0,0,1,2.25-2.25H8.625" transform="translate(-1.5 -1.5)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            </svg>
                        </button>
                        <span className="align-middle"><p className="inline text-lg mr-2">{cmtdata.cmtLikes + (liked ? 1 : 0)}</p></span>
                    </div>
                    <div className="mx-2 my-1">
                        <button onClick={() => { updateUserStatus("disliked") }}>
                            <svg className={`inline mx-2 w-7 ${disliked ? "filter-red" : "filter-none"}`} xmlns="http://www.w3.org/2000/svg" width="22.934" height="23.251" viewBox="0 0 22.934 23.251">
                                <path id="Icon_feather-thumbs-down" data-name="Icon feather-thumbs-down" d="M11.255,16.162v4.05a3.037,3.037,0,0,0,3.037,3.037l4.05-9.112V3H6.921A2.025,2.025,0,0,0,4.9,4.721L3.5,13.834a2.025,2.025,0,0,0,2.025,2.329ZM18.342,3h2.7A2.339,2.339,0,0,1,23.4,5.025v7.087a2.339,2.339,0,0,1-2.359,2.025h-2.7" transform="translate(-1.971 -1.499)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            </svg>
                            <span className="align-middle"><p className="inline text-lg mr-2">{cmtdata.cmtDislikes + (disliked ? 1 : 0)}</p></span>
                        </button>
                    </div>
                </div>
                <div className="my-auto ml-4">
                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 33">
                        <g id="Icon_feather-flag" data-name="Icon feather-flag" transform="translate(-4.5 -1.5)">
                            <path id="Path_5" data-name="Path 5" d="M6,22.5S7.5,21,12,21s7.5,3,12,3,6-1.5,6-1.5V4.5S28.5,6,24,6,16.5,3,12,3,6,4.5,6,4.5Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                            <path id="Path_6" data-name="Path 6" d="M6,33V22.5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
