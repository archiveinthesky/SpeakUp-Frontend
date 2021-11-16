import React, { useState, useEffect } from 'react'

const DiscussionHeader = ({ boardid }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showStandpoint, setShowStandpoint] = useState(false);
    const [showReference, setShowReference] = useState(false);

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
                </div>
            </div>
        </div >
    )
}

export default DiscussionHeader
