import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Common/Header'
import logo from './Images/logomic.svg'
import TopicSample from './Images/Topic-Sample.png'
import CommentCard from './Images/Comment-Card.png'
import CommentReport from './Images/Comment-Report.png'

const PhoneLandingPage = () => {
    const [onSection, setOnSection] = useState(0)

    useEffect(() => {

    }, [window.scroll])

    return (
        <div className='w-screen h-screen overflow-x-hidden snap-y snap-mandatory snap'>
            <Header />

            <div className='relative w-11/12 h-screen mx-auto snap-center snap-always overflow-hidden flex flex-col justify-center'>
                <div >
                    <h1 className='text-6xl leading-[80px] font-rounded'>
                        為理性交流<br />
                        提供一個<br />
                        自由的空間
                    </h1>
                    <Link to="/signup">
                        <div className='w-40 h-16 my-6 bg-blue-600 hover:drop-shadow-md rounded-[40px]'>
                            <h1 className='m-auto text-white text-2xl font-rounded'>開始使用</h1>
                        </div>
                    </Link>
                </div>
                <img className='absolute w-[600px] h-[600px] -right-40 top-[50vh]' src={logo} alt="" />
            </div>

            <div className='w-11/12 h-screen mx-auto scroll-mt-20 snap-center snap-always flex flex-col gap-10 justify-center'>
                <h1 className='text-[2.25rem] sm:text-6xl sm:leading-[80px] font-rounded leading-[60px]'>
                    每週精選重點議題 <br />
                    快速了解焦點內容、<br className='block' />雙方立場
                </h1>
                <img src={TopicSample} alt="主題範本"></img>
            </div>

            <div className='w-11/12 h-screen mx-auto snap-center snap-always flex flex-col gap-10 justify-center'>
                <h1 className='text-[2.25rem] font-rounded leading-[60px]'>
                    專為討論設計的介面<br />
                    更容易的表達意見
                </h1>
                <img src={CommentCard} alt="主題範本"></img>
            </div>

            <div className='w-11/12 h-screen mx-auto snap-center snap-always flex flex-col gap-10 justify-center'>
                <h1 className='text-[2.25rem] font-rounded leading-[60px]'>
                    明確的留言管理<br />
                    保障自由討論的權利
                </h1>
                <img src={CommentReport} alt="留言檢舉"></img>
            </div>


            <div className='h-screen snap-center snap-always '>
                <div className='w-screen h-full bg-sky-500 flex flex-col justify-center '>
                    <div className='w-5/6 m-auto'>
                        <h1 className='text-4xl text-white font-rounded leading-[48px]'>
                            準備好了嗎？<br />
                            馬上開始討論吧</h1>
                        <div className='h-[15%]'></div>
                        <Link className='my-auto' to="/signup">
                            <div className='w-44 h-16 bg-blue-600 hover:drop-shadow-md rounded-[40px]'>
                                <h1 className='m-auto text-white text-3xl font-rounded'>開始使用</h1>
                            </div>
                        </Link>
                    </div>
                    <h2 className='w-full pb-3 text-center text-lg text-white'>&copy; 2021 Speakup開發團隊 版權所有</h2>
                </div>
            </div>
        </div >
    )
}

export default PhoneLandingPage
