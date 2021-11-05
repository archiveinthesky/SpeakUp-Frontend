import React, { useState } from 'react'

const DiscussionHeader = () => {
    const [showStandpoint, setShowStandpoint] = useState(false);
    const [showReference, setShowReference] = useState(false);

    return (
        <div className="bg-white w-11/12 mx-auto py-3">
            <div className="w-11/12 mx-auto my-6">
                <h1 className="text-black text-5xl pb-4">網路匿名</h1>
                <div className="flex justify-start gap-4">
                    <div className="w-20 h-8 rounded-2xl bg-red-500 bg-opacity-50">
                        <p className="leading-8 text-center text-red-500 font-bold">＃媒體</p>
                    </div>
                    <div className="w-20 h-8 rounded-2xl bg-yellow-500 bg-opacity-50">
                        <p className="leading-8 text-center text-yellow-600 font-bold">＃自由</p>
                    </div>
                </div>
                <div className="mt-8 grid grid-w-40-1fr content-start gap-x-8 gap-y-5">
                    <div className="w-20 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                        <p className="leading-10 text-center text-black text-xl">內容</p>
                    </div>
                    <div >
                        <p className="text-black text-xl">在社群網站、論壇等網路平台上，使用者留言或發文時往往不需要顯示真實身分。相較於真實生活中的言論，這樣的形式較開放、沒有其他顧慮</p>
                    </div>
                    <div className="w-32 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                        <p className="leading-10 text-center text-black text-xl">立場/論點</p>
                    </div>
                    <div>
                        {
                            showStandpoint ?
                                <div className="text-black">
                                    <p className="font-medium text-2xl leading-8">支持者的立場</p>
                                    <p className="text-xl leading-8">在沒有政治正確、其他顧忌之下，網路匿名讓 #言論自由多了一種可能性。使用者不需要因為掛名、發表想法較自在，而議題和言論 #範圍多元。特別是針對特定群體，#吹哨者和受害者自白能較不顧後果，對於 #少數群體的發聲也不須克服公布身分的勇氣。也許有較為激進的言論或是假消息，但法律對於網路匿名發言仍有控管，發言者也需負起#法律責任。網路匿名的傷害相較於 #言論自由所保障的多元社會，自由發聲的機會是民主國家中最為重要的。</p>
                                    <p className="font-medium text-2xl leading-8 pt-4">反對者的立場</p>
                                    <p className="text-xl leading-8">在社群網站、論壇等網路平台上，使用者留言或發文時往往不需要顯示真實身分。相較於真實生活中的言論，這樣的形式較開放、沒有其他顧慮</p>
                                    <button onClick={() => { setShowStandpoint(false) }}><p className="leading-10 text-gray-400 text-xl">收合</p></button>
                                </div> :
                                <button onClick={() => { setShowStandpoint(true) }}><p className="leading-10 text-gray-400 text-xl">展開</p></button>
                        }
                    </div>
                    <div className="w-32 h-10 rounded-3xl bg-gray-300 bg-opacity-50">
                        <p className="leading-10 text-center text-black text-xl">參考資料</p>
                    </div>
                    <div>
                        {
                            showReference ?
                                <div>
                                    <p className="text-blue-600 text-xl"><a href="http://localhost:3000" rel="noreferrer" target="_blank">https://ericabuteau.com/2017/08/01/pros-cons-online-anonymity/</a></p>
                                    <button onClick={() => { setShowReference(false) }}><p className="leading-10 text-gray-400 text-xl">收合</p></button>
                                </div> :
                                <button onClick={() => { setShowReference(true) }}><p className="leading-10 text-gray-400 text-xl">展開</p></button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DiscussionHeader
