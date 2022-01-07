import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import homeIcon from '../../../Assets/Admin/Sidebar/homeIcon.svg'
import manageCmtIcon from '../../../Assets/Admin/Sidebar/mngCmtIcon.svg'
import userBoardsIcon from '../../../Assets/Admin/Sidebar/userBoardsIcon.svg'
import userTasksIcon from '../../../Assets/Admin/Sidebar/userTasksIcon.svg'

const Sidebar = ({ defualtState = true, toggleIndent = null }) => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [enableAnim, setEnableAnim] = useState(false)

    useEffect(() => {
        setEnableAnim(false)
        setShowSidebar(true)
        setTimeout(() => { setEnableAnim(true) }, 200)
    }, [defualtState])

    const smToggle = () => {
        if (toggleIndent !== null) toggleIndent(false)
    }

    const xlToggle = () => {
        toggleIndent(!showSidebar)
    }

    return (<>
        {/* <span className={`${showSidebar ? "visible xl:hidden" : "hidden"} fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-30 z-20`} onClick={smToggle}></span> */}
        <div className={`fixed h-screen xl:top-16 w-80 border-r-2 border-gray-200 bg-white flex flex-col ${enableAnim ? "transition-left duration-1000" : "duration-[0ms]"} duration-1000 ease-out z-20 ${showSidebar ? "left-0" : "-left-80"}`}>
            <div className="h-6" />
            <div className="flex z-10">
                <ul className="pl-10">
                    <Link to="/home">
                        <li className="flex list-none py-3 gap-4">
                            <img className='w-8 h-8 inline' src={homeIcon} alt="首頁"></img>
                            <p className="text-black text-2xl leading-8">首頁</p>
                        </li>
                    </Link>
                    <Link to="/search?tags=封測議題">
                        <li className="flex list-none py-3 gap-4">
                            <img className='w-8 h-8 inline' src={userBoardsIcon} alt="封測議題"></img>
                            <p className="text-black text-2xl leading-8">您的議題</p>
                        </li>
                    </Link>
                    <Link to="/admin/comments">
                        <li className="flex list-none py-3 gap-4">
                            <img className='w-8 h-8 inline' src={manageCmtIcon} alt="首頁"></img>
                            <p className="text-black text-2xl leading-8">留言管理</p>
                        </li>
                    </Link>
                    <Link to="/search">
                        <li className="flex list-none py-3 gap-4">
                            <img className='w-8 h-8 inline' src={userTasksIcon} alt="首頁"></img>
                            <p className="text-black text-2xl leading-8">您的任務</p>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="py-3">
                <hr className="border-t-2 border-gray-300 w-5/6 mx-auto" />
            </div>
            <div className={`invisible xl:visible absolute top-80 left-80 w-20 h-20 overflow-hidden`}>
                {toggleIndent !== null &&
                    <button className="absolute bg-accent-blue rounded-r-full w-20 h-20 -left-8 flex"
                        onClick={xlToggle}>
                        <div className="ml-10 my-auto">
                            <svg className={`w-6 h-10 transform ${showSidebar ? "rotate-180" : "rotate-0"}`} viewBox="0 0 23.783 41.595">
                                <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M27.86,26.986,12.12,11.258a2.96,2.96,0,0,1,0-4.2,3,3,0,0,1,4.211,0L34.163,24.881a2.967,2.967,0,0,1,.087,4.1L16.343,46.925a2.973,2.973,0,1,1-4.211-4.2Z" transform="translate(-11.246 -6.196)" fill="#fff" />
                            </svg>
                        </div>
                    </button>
                }
            </div>
            <div className={`visible xl:invisible absolute top-24 left-80 w-20 h-20 overflow-hidden`}>
                {toggleIndent !== null &&
                    <button className="absolute bg-accent-blue rounded-r-full w-16 h-16 -left-8 flex"
                        onClick={smToggle}>
                        <div className="ml-9 my-auto">
                            <svg className={`w-4 h-8 transform ${showSidebar ? "rotate-180" : "rotate-0"}`} viewBox="0 0 23.783 41.595">
                                <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M27.86,26.986,12.12,11.258a2.96,2.96,0,0,1,0-4.2,3,3,0,0,1,4.211,0L34.163,24.881a2.967,2.967,0,0,1,.087,4.1L16.343,46.925a2.973,2.973,0,1,1-4.211-4.2Z" transform="translate(-11.246 -6.196)" fill="#fff" />
                            </svg>
                        </div>
                    </button>
                }
            </div>
        </div>
    </>
    )
}

export default Sidebar
