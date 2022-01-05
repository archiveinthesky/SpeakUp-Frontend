import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import homeIcon from '../../Assets/Discussion/homeIcon.png'
import globeIcon from '../../Assets/Discussion/globeIcon.png'
import collectionIcon from '../../Assets/Discussion/collectionIcon.png'

const Sidebar = ({ defualtState = true, toggleIndent = null }) => {
    const [showSidebar, setShowSidebar] = useState(defualtState)
    const [enableAnim, setEnableAnim] = useState(false)

    const tags = ['教育', '娛樂', '媒體', '科技']; //['娛樂', '環境', '司法', '國家發展', '經濟', '少數族群', '媒體', '醫藥', '道德', '政治', '教育', '家庭', '女性', '自由', '宗教', '科技', '社會政策', '社會運動', '體育'];

    useEffect(() => {
        setEnableAnim(false)
        setShowSidebar(defualtState)
        setTimeout(() => { setEnableAnim(true) }, 200)
    }, [defualtState])

    const smToggle = () => {
        setShowSidebar(!showSidebar)
        if (toggleIndent !== null) toggleIndent(false)
    }

    const xlToggle = () => {
        setShowSidebar(!showSidebar)
        toggleIndent(!showSidebar)
    }

    return (<>
        <span className={`${showSidebar ? "visible xl:hidden" : "hidden"} fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-30 z-20`} onClick={smToggle}></span>
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
                            <img className='w-8 h-8 inline' src={globeIcon} alt="封測議題"></img>
                            <p className="text-black text-2xl leading-8">封測議題</p>
                        </li>
                    </Link>
                    <Link to="/collections">
                        <li className="flex list-none py-3 gap-4">
                            <img className='w-8 h-8 inline' src={collectionIcon} alt="首頁"></img>
                            <p className="text-black text-2xl leading-8">我的收藏</p>
                        </li>
                    </Link>
                    {/* <Link to="/search">
                        <li className="flex list-none py-3 gap-3">
                            <svg className="ml-1 w-8 h-8" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 9C16.0031 7.19187 15.3936 5.43601 14.2709 4.01869C13.1481 2.60137 11.5783 1.6062 9.81749 1.19542C8.05663 0.784634 6.20855 0.982477 4.57455 1.75669C2.94055 2.5309 1.61702 3.83581 0.819732 5.45868C0.0224456 7.08154 -0.201564 8.92663 0.184225 10.6931C0.570013 12.4596 1.54285 14.0433 2.94411 15.1861C4.34538 16.3288 6.09243 16.9631 7.90042 16.9856C9.70842 17.0081 11.4707 16.4175 12.9 15.31L19.3 21.71L20.71 20.3L14.31 13.9C15.4015 12.4995 15.9961 10.7756 16 9V9ZM8 15C6.81331 15 5.65327 14.6481 4.66658 13.9888C3.67988 13.3295 2.91085 12.3925 2.45672 11.2961C2.00259 10.1997 1.88377 8.99335 2.11529 7.82946C2.3468 6.66558 2.91824 5.59648 3.75736 4.75736C4.59647 3.91825 5.66557 3.3468 6.82945 3.11529C7.99334 2.88378 9.19974 3.0026 10.2961 3.45673C11.3925 3.91085 12.3295 4.67989 12.9888 5.66658C13.6481 6.65328 14 7.81331 14 9C14 10.5913 13.3679 12.1174 12.2426 13.2426C11.1174 14.3679 9.5913 15 8 15Z" fill="black" />
                            </svg>
                            <p className="text-black text-2xl leading-8">搜尋</p>
                        </li>
                    </Link> */}
                </ul>
            </div>
            <div className="py-3">
                <hr className="border-t-2 border-gray-300 w-5/6 mx-auto" />
            </div>
            <ul className="list-none h-3/5 pl-24 overflow-auto">
                {tags.map((tag, i) => {
                    return (
                        <Link to={`/search?tags=${tag}`} key={`link${i}`}>
                            <li key={i} className="py-2 text-xl">{tag}</li>
                        </Link>
                    )
                })}
            </ul>
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
