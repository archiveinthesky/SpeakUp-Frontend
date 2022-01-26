import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookmarkIcon } from '@heroicons/react/outline';
import SaveBoard from '../Common/SaveBoards';
import ReportContent from './ReportContent';

const DiscussionHeader = ({ boardId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showStandpoint, setShowStandpoint] = useState(false);
    const [showReference, setShowReference] = useState(false);
    const [userSaved, setUserSaved] = useState(false)
    const [showReportMenu, setShowReportMenu] = useState(false)
    const [errorOccured, setErrorOccured] = useState(false)

    const [pageContent, setPageContent] = useState([]);

    useEffect(() => {
        console.log(boardId)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/boards/${boardId}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("AuthToken"),
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                let pagedata = [
                    response.title,
                    response.tags.split(","),
                    response.brief,
                    response.supContent,
                    response.agnContent,
                    response.refLinks.split(","),
                    response.isSaved
                ]
                setPageContent(pagedata)
                setUserSaved(response.isSaved)
                setIsLoading(false)
            })
            .catch(error => {
                let errtxt = `獲取頁面資料時發生錯誤(${error.message})，請重新整理網頁。若錯誤持續發生，請稍待片刻，我們將盡快修復。`
                setErrorOccured(errtxt)
            })
    }, [boardId])

    const toggleSaved = () => {
        SaveBoard(boardId, !userSaved)
        setUserSaved(!userSaved)
    }

    return (
        <>
            {errorOccured === false ?
                <div className="bg-white w-full mx-auto py-3">
                    <div className="w-11/12 mx-auto my-4 lg:my-6">
                        {isLoading ?
                            <div className="w-40 h-12 my-1 rounded-xl animate-pulse bg-gray-300"></div> :
                            <h1 className="text-black text-3xl font-medium lg:text-5xl lg:leading-[3.5rem] pb-4">{pageContent[0]}</h1>
                        }
                        {isLoading ?
                            <div className="w-20 h-8 my-1 rounded-xl animate-pulse bg-gray-300"></div> :
                            <div className="flex flex-wrap justify-start gap-4">
                                {
                                    pageContent[1].map((tag) => {
                                        return <div key={pageContent[1].indexOf(tag)} className="px-4 h-8 flex-shrink-0 rounded-2xl bg-blue-300 bg-opacity-50">
                                            <Link to={`/search?tags=${tag}`}><p className="leading-8 text-center text-blue-500 font-bold">{`#${tag}`}</p></Link>
                                        </div>
                                    })
                                }
                            </div>
                        }
                        <div className="mt-8 grid grid-cols-1 md:grid-w-40-1fr content-start gap-x-8 gap-y-4">
                            <div className="w-20 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                                <p className="leading-10 text-center text-black text-xl">內容</p>
                            </div>
                            <div >
                                {isLoading ?
                                    <div className="w-full h-9 rounded-xl animate-pulse bg-gray-300"></div> :
                                    <p className="text-black text-xl font-light leading-[34px]">{pageContent[2]}</p>
                                }
                            </div>
                            <div className="w-32 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                                <p className="leading-10 text-center text-black text-xl">立場/論點</p>
                            </div>
                            <div>
                                {showStandpoint ?
                                    <div className="text-black">
                                        <p className="font-medium text-2xl leading-8 mb-2">支持者的立場</p>
                                        <p className="text-xl leading-[34px] font-light">{pageContent[3]}</p>
                                        <p className="font-medium text-2xl leading-8 pt-4 mb-2">反對者的立場</p>
                                        <p className="text-xl leading-[34px] font-light">{pageContent[4]}</p>
                                        <button onClick={() => { setShowStandpoint(false) }}><p className="leading-10 text-gray-400 text-xl">收合</p></button>
                                    </div> :
                                    <div>
                                        {isLoading ?
                                            <div className="w-full h-9 rounded-xl animate-pulse bg-gray-300"></div> :
                                            <button onClick={() => { setShowStandpoint(true) }}><p className="leading-10 text-gray-400 text-xl">展開</p></button>
                                        }
                                    </div>
                                }
                            </div>
                            <div className="w-32 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                                <p className="leading-10 text-center text-black text-xl">延伸資料</p>
                            </div>
                            <div>
                                {
                                    showReference ?
                                        <div>
                                            {pageContent[5].map((link) => {
                                                return <p key={pageContent[5].indexOf(link)} className="text-blue-600 text-xl"><a href={link} rel="noreferrer" target="_blank">{link}</a></p>
                                            })}
                                            <button onClick={() => { setShowReference(false) }}><p className="leading-10 text-gray-400 text-xl">收合</p></button>
                                        </div> :
                                        <div>
                                            {isLoading ?
                                                <div className="w-full h-9 rounded-xl animate-pulse bg-gray-300"></div> :
                                                <button onClick={() => { setShowReference(true) }}><p className="leading-10 text-gray-400 text-xl">展開</p></button>
                                            }
                                        </div>
                                }
                            </div>
                            <div className="h-8 flex">
                                <button onClick={toggleSaved}>
                                    <BookmarkIcon className={`w-9 h-9 ${userSaved ? 'fill-yellow-300' : 'fill-white'}`} />
                                </button>
                                {/* <button onClick={() => { setShowReportMenu(true) }}>
                                    <svg className="w-8 h-8 mx-2 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 33">
                                        <g id="Icon_feather-flag" data-name="Icon feather-flag" transform="translate(-4.5 -1.5)">
                                            <path id="Path_5" data-name="Path 5" d="M6,22.5S7.5,21,12,21s7.5,3,12,3,6-1.5,6-1.5V4.5S28.5,6,24,6,16.5,3,12,3,6,4.5,6,4.5Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                            <path id="Path_6" data-name="Path 6" d="M6,33V22.5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                        </g>
                                    </svg>
                                </button> */}
                            </div>
                        </div>
                    </div>
                    {showReportMenu && <ReportContent
                        rHeader="請問此主題有什麼問題？"
                        rQuestions={["內容包含不實訊息", "內容過度偏頗", "其他"]}
                        closeReportContent={() => { setShowReportMenu(false) }}
                    />}
                </div > :
                <div className="bg-red-200 w-11/12 h-96 mx-auto py-3 flex rounded-xl">
                    <div className='m-auto'>
                        <h1 className='text-center text-3xl text-red-500 font-medium'>錯誤</h1>
                        <p className='px-4 my-2 text-center text-xl text-red-500'>{errorOccured}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default DiscussionHeader
