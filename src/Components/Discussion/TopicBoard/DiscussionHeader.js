import React, { useState, useEffect } from 'react'
import ReportContent from './ReportContent';

const DiscussionHeader = ({ boardid }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showStandpoint, setShowStandpoint] = useState(false);
    const [showReference, setShowReference] = useState(false);
    const [userSaved, setUserSaved] = useState(false)
    const [showReportMenu, setShowReportMenu] = useState(false)

    const [pageContent, setPageContent] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5500/boards/${boardid}`)
            .then(response => {
                return response.json()
            })
            .then(response => {
                let pagedata = [
                    response.title,
                    response.tags,
                    response.brief,
                    response.supContent,
                    response.agnContent,
                    response.refLinks,
                    response.isSaved
                ]
                setPageContent(pagedata)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [boardid])

    const toggleSaved = () => {
        setUserSaved(!userSaved)

    }

    return (
        <div className="bg-white w-11/12 mx-auto py-3">
            <div className="w-11/12 mx-auto my-6">
                {isLoading ?
                    <div className="w-40 h-12 my-1 rounded-xl animate-pulse bg-gray-300"></div> :
                    <h1 className="text-black text-5xl pb-4">{pageContent[0]}</h1>
                }
                {isLoading ?
                    <div className="w-20 h-8 my-1 rounded-xl animate-pulse bg-gray-300"></div> :
                    <div className="flex justify-start gap-4">
                        {
                            pageContent[1].map((tag) => {
                                return <div key={pageContent[1].indexOf(tag)} className="w-20 h-8 rounded-2xl bg-blue-300 bg-opacity-50">
                                    <p className="leading-8 text-center text-blue-500 font-bold">{`#${tag}`}</p>
                                </div>
                            })
                        }
                    </div>
                }
                <div className="mt-8 grid grid-w-40-1fr content-start gap-x-8 gap-y-5">
                    <div className="w-20 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                        <p className="leading-10 text-center text-black text-xl">內容</p>
                    </div>
                    <div >
                        {isLoading ?
                            <div className="w-full h-9 rounded-xl animate-pulse bg-gray-300"></div> :
                            <p className="text-black text-xl">{pageContent[2]}</p>
                        }
                    </div>
                    <div className="w-32 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                        <p className="leading-10 text-center text-black text-xl">立場/論點</p>
                    </div>
                    <div>
                        {showStandpoint ?
                            <div className="text-black">
                                <p className="font-medium text-2xl leading-8">支持者的立場</p>
                                <p className="text-xl leading-8">{pageContent[3]}</p>
                                <p className="font-medium text-2xl leading-8 pt-4">反對者的立場</p>
                                <p className="text-xl leading-8">{pageContent[4]}</p>
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
                            {userSaved ?
                                <svg className="w-8 h-8" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="1" width="14" height="15" fill="#FCD34D" />
                                    <path d="M2 17.5V15L6 15.5L2 17.5Z" fill="#FCD34D" />
                                    <path d="M14 18V15L10 15.6L14 18Z" fill="#FCD34D" />
                                    <path d="M8 16.62L1.45 19.89C1.29777 19.9667 1.12846 20.0032 0.958143 19.9961C0.787827 19.989 0.622163 19.9384 0.476882 19.8492C0.331601 19.7601 0.211527 19.6352 0.128063 19.4866C0.0445991 19.338 0.000515869 19.1705 0 19V2C0 0.9 0.9 0 2 0H14C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V19C16.0012 19.1713 15.9584 19.3401 15.8756 19.4901C15.7928 19.6401 15.6729 19.7663 15.5274 19.8566C15.3818 19.947 15.2155 19.9984 15.0444 20.006C14.8732 20.0136 14.703 19.9771 14.55 19.9L8 16.61V16.62ZM14 2H2V17.38L7.55 14.61C7.68958 14.5397 7.8437 14.503 8 14.503C8.1563 14.503 8.31042 14.5397 8.45 14.61L14 17.38V2Z" fill="black" />
                                </svg> :
                                <svg className="w-8 h-8" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 16.62L1.45 19.89C1.29777 19.9667 1.12846 20.0032 0.958143 19.9961C0.787827 19.989 0.622163 19.9384 0.476882 19.8492C0.331601 19.7601 0.211527 19.6352 0.128063 19.4866C0.0445991 19.338 0.000515869 19.1705 0 19V2C0 0.9 0.9 0 2 0H14C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V19C16.0012 19.1713 15.9584 19.3401 15.8756 19.4901C15.7928 19.6401 15.6729 19.7663 15.5274 19.8566C15.3818 19.947 15.2155 19.9984 15.0444 20.006C14.8732 20.0136 14.703 19.9771 14.55 19.9L8 16.61V16.62ZM14 2H2V17.38L7.55 14.61C7.68958 14.5397 7.8437 14.503 8 14.503C8.1563 14.503 8.31042 14.5397 8.45 14.61L14 17.38V2Z" fill="black" />
                                </svg>
                            }
                        </button>
                        <button onClick={() => { setShowReportMenu(true) }}>
                            <svg className="w-8 h-8 mx-2 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 33">
                                <g id="Icon_feather-flag" data-name="Icon feather-flag" transform="translate(-4.5 -1.5)">
                                    <path id="Path_5" data-name="Path 5" d="M6,22.5S7.5,21,12,21s7.5,3,12,3,6-1.5,6-1.5V4.5S28.5,6,24,6,16.5,3,12,3,6,4.5,6,4.5Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                    <path id="Path_6" data-name="Path 6" d="M6,33V22.5" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {showReportMenu && <ReportContent
                rHeader="請問此主題有什麼問題？"
                rQuestions={["內容包含不實訊息", "內容過度偏頗", "其他"]}
                closeReportContent={() => { setShowReportMenu(false) }}
            />}
        </div >
    )
}

export default DiscussionHeader
