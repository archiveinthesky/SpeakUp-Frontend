import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import PhoneLandingPage from './PhoneLandingPage'
import logo from './Images/logomic.svg'
import TopicSample from './Images/Topic-Sample.png'
import CommentCard from './Images/Comment-Card.png'
import CommentReport from './Images/Comment-Report.png'
import closedEye from './Images/closed-eye.svg'
import openEye from './Images/open-eye.svg'

const LandingPage = () => {
    const [onPhone, setOnPhone] = useState(window.innerWidth < 768 && window.innerWidth < window.innerHeight)

    window.onresize = () => { setOnPhone(window.innerWidth < 768 && window.innerWidth < window.innerHeight) }

    const OnPageRegComponent = () => {
        const [userEmail, setUserEmail] = useState("")
        const [userPwd, setUserPwd] = useState("")
        const [showPwd, setShowPwd] = useState(false)
        const [emailError, setEmailError] = useState(false)
        const [pwdError, setPwdError] = useState([])

        const onEmailReg = (e) => {
            e.preventDefault()

            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            setEmailError(!re.test(userEmail))
            let pwderrors = [];
            function hasUpperCase(str) {
                return str.toLowerCase() !== str;
            }
            function hasLowerCase(str) {
                return str.toUpperCase() !== str;
            }
            function hasNumber(myString) {
                return /\d/.test(myString);
            }
            if (!hasUpperCase(userPwd)) pwderrors.push("密碼至少需要一個大寫英文字母")
            if (!hasLowerCase(userPwd)) pwderrors.push("密碼至少需要一個小寫英文字母")
            if (!hasNumber(userPwd)) pwderrors.push("密碼至少需要一個數字")
            if (userPwd.length < 8) pwderrors.push("密碼至少需要八個字")
            setPwdError(pwderrors)
            if (!re.test(userPwd) && pwderrors.length === 0) {
                let lcs = window.localStorage
                lcs.setItem('usremail', userEmail)
                lcs.setItem('usrpwd', userPwd)
                window.location.href = "/signup?filledData=true"
            }
        }

        return (
            <div className='hidden xl:block xl:w-11/12 2xl:w-5/6 overflow-y-auto px-14 py-8 rounded-[60px] bg-sky-500 justify-self-end'>
                <h2 className='my-3 text-4xl text-white font-rounded'>註冊一個帳號</h2>
                <form onSubmit={onEmailReg}>
                    <input type='email'
                        value={userEmail}
                        onChange={(e) => { setUserEmail(e.target.value) }}
                        className={`w-full h-16 ${emailError ? "mt-3 mb-1" : "my-3"} rounded-3xl px-6 text-2xl hover:drop-shadow-lg`} placeholder='您的電子郵件'
                    />
                    {emailError && <p className='font-rounded text-red-500 text-lg'>請輸入一個有效的信箱</p>}
                    <div className='relative'>
                        <input type={showPwd ? 'text' : 'password'}
                            value={userPwd}
                            onChange={(e) => { setUserPwd(e.target.value) }}
                            className='w-full h-16 my-3 px-6 rounded-3xl text-black text-2xl shrink-0 hover:drop-shadow-lg' placeholder='您的密碼'
                        >
                        </input>
                        <button type='button' onClick={() => { setShowPwd(!showPwd) }} className="absolute top-7 right-6">
                            <img className="w-7 h-7" src={showPwd ? openEye : closedEye}></img>
                        </button>
                    </div>
                    {pwdError.length !== 0 &&
                        <ul>
                            {pwdError.map((eacherror, i) => {
                                return (<p key={i} className='font-rounded text-red-600 text-xl'>{eacherror}</p>)
                            })}
                        </ul>
                    }
                    <button className='w-full h-16 my-3 bg-blue-600 rounded-3xl hover:drop-shadow-lg' type='submit' >
                        <div className='m-auto'>
                            <p className='text-center text-white text-2xl'>使用電子郵件註冊</p>
                        </div>
                    </button>
                </form>
                {/* <div className='w-full my-3 flex justify-center items-center'>
                    <hr className='w-48 h-[2px] bg-white' />
                    <p className='mx-2 text-white text-2xl font-rounded'>或</p>
                    <hr className='w-48 h-[2px] bg-white' />
                </div>
                <button className='w-full h-16 bg-white border-2 rounded-3xl hover:drop-shadow-lg' type='submit' >
                    <div className='m-auto flex justify-center'>
                        <svg className=' w-11 h-11' viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.06 23.678C46.0614 22.0901 45.9184 20.5052 45.6328 18.9424H23.5V27.898H36.1473C35.6025 30.792 33.9469 33.244 31.458 34.8856V40.6946H39.0528C43.4964 36.6641 46.06 30.7288 46.06 23.678Z" fill="#4285F4" />
                            <path d="M23.5 46.3036C29.845 46.3036 35.1646 44.2304 39.0527 40.6945L31.458 34.8855C29.3536 36.2746 26.6618 37.0954 23.5 37.0954C17.3793 37.0954 12.1986 33.0228 10.3507 27.5505H2.49951V33.549C6.36632 41.1155 14.3136 46.3036 23.5 46.3036Z" fill="#34A853" />
                            <path d="M10.3507 27.5507C9.36798 24.698 9.36798 21.6057 10.3507 18.753V12.7545H2.49956C0.85592 15.9812 0 19.5416 0 23.1518C0 26.7621 0.85592 30.3224 2.49956 33.5491L10.3507 27.5507Z" fill="#FBBC05" />
                            <path d="M23.5 9.20812C26.9502 9.20812 30.0479 10.3762 32.4834 12.6704L39.2236 6.03C35.1538 2.29412 29.8342 0 23.4999 0C14.3136 0 6.36632 5.18815 2.49951 12.7545L10.3507 18.7531C12.1986 13.2808 17.3793 9.20816 23.5 9.20816V9.20812Z" fill="#EA4335" />
                        </svg>
                        <p className='mx-4 my-auto text-center text-black text-xl'>Continue with Google</p>
                    </div>
                </button> */}
            </div>
        )
    }

    return (
        <>
            {onPhone ?
                <PhoneLandingPage /> :
                <div className='w-screen h-screen overflow-x-hidden overflow-y-scroll'>
                    <Header />
                    <div className='mx-auto mt-44 mx-auto w-11/12 2xl:w-10/12' >
                        <div className='relative w-full lg:h-[500px] xl:h-[600px] xl:grid xl:grid-cols-2 xl:gap-10 items-center'>
                            <div>
                                <h1 className='
                            text-6xl 2xl:text-7xl 
                            leading-[80px] lg:leading-[88px] 2xl:leading-[108px] 
                            font-rounded'>
                                    為世界上的理性交流<br />
                                    提供一個自由的空間
                                </h1>
                                <p className='mt-2 xl:mt-8 text-3xl leading-[48px] font-rounded'>
                                    在Speakup，我們相信每個議題都值得被討論 <br />
                                    每個人的意見都應該能被聽到<br />
                                    因此，我們決定創建一個自由的平台空間<br />
                                    讓所有人都能夠在此理性交流
                                </p>
                                <a href="/signup">
                                    <button className='visible xl:invisible w-40 h-16 my-6 bg-blue-600 hover:drop-shadow-md rounded-[40px]'>
                                        <h1 className='m-auto text-white text-2xl font-rounded'>開始使用</h1>
                                    </button>
                                </a>
                            </div>
                            <OnPageRegComponent />
                            <div className='hidden lg:block xl:hidden'>
                                <img className='absolute w-[600px] h-[600px] opacity-100 -right-80 -top-20' src={logo} alt="" />
                            </div>
                        </div>

                        <div className='mx-auto my-32 flex justify-between'>
                            <h1 className='
                    text-[2.25rem] xl:text-[2.75rem] 2xl:text-5xl 
                    my-auto font-rounded lg:leading-[60px] xl:leading-[72px] 2xl:leading-[72px]'>
                                每週精選重點議題 <br />
                                快速了解焦點內容、<br className='block lg:hidden' />雙方立場
                            </h1>
                            <img className='w-[45%] xl:w-1/2' src={TopicSample} alt="主題範本"></img>
                        </div>

                        <div className='mx-auto my-32 flex justify-between'>
                            <img className='w-[45%] xl:w-1/2' src={CommentCard} alt="主題範本"></img>
                            <h1 className='
                    text-[2.25rem] xl:text-[2.75rem] 2xl:text-5xl text-right
                    my-auto font-rounded lg:leading-[60px] xl:leading-[72px] 2xl:leading-[72px]'>
                                專門為<p className='hidden lg:inline'>議題</p>討論設計的介面<br />
                                更容易的表達意見
                            </h1>
                        </div>

                        <div className='mx-auto my-32 flex justify-between'>
                            <h1 className='
                    text-[2.25rem] xl:text-[2.75rem] 2xl:text-5xl 
                    my-auto font-rounded lg:leading-[60px] xl:leading-[72px] 2xl:leading-[72px]'>
                                明確的留言管理<br />
                                保障<p className='hidden lg:inline'>所有人</p>自由討論的權利
                            </h1>
                            <img className='w-[45%] xl:w-1/2' src={CommentReport} alt="留言檢舉"></img>
                        </div>
                    </div>

                    <div className='w-screen h-60 xl:h-72 bg-sky-500 flex justify-between'>
                        <div className='w-10/12 mx-auto flex justify-between'>
                            <h1 className='text-4xl xl:text-5xl my-auto text-white font-rounded leading-[48px] lg:leading-[60px] xl:leading-[72px]'>
                                準備好了嗎？<br />
                                馬上開始討論吧</h1>
                            <a className='my-auto' href="/signup">
                                <button className='w-44 h-16 xl:w-52 xl:h-20 bg-blue-600 hover:drop-shadow-md rounded-[40px]'>
                                    <h1 className='m-auto text-white text-3xl xl:text-4xl font-rounded'>開始使用</h1>
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className='w-screen h-56 lg:h-80 bg-gray-100'>
                        <div className='mx-auto w-11/12 md:w-10/12 h-full grid grid-cols-2 items-center'>
                            <div className='font-rounded self-center'>
                                <h1 className='text-3xl lg:text-4xl 2xl:text-5xl my-2 lg:my-4 text-gray-500'>Speakup</h1>
                                <h1 className='text-md lg:text-2xl xl:text-3xl 2xl:text-4xl my-2 lg:my-4 text-gray-500'>致力於創造一個更理性的討論空間</h1>
                            </div>
                            {/* <div className='mt-8 lg:mt-16 flex gap-10 lg:gap-16 xl:gap-24'>
                                <div>
                                    <h2 className='text-gray-400 lg:text-2xl 2xl:text-3xl'>平台簡介</h2>
                                    <ul className='mt-6 font-rounded xl:text-xl 2xl:text-2xl'>
                                        <li className='my-4 text-gray-500'>平台理念</li>
                                        <li className='my-4 text-gray-500'>關於我們</li>
                                        <li className='my-4 text-gray-500'>支持我們</li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className='text-gray-400 lg:text-2xl 2xl:text-3xl'>平台規範</h2>
                                    <ul className='mt-6 font-rounded xl:text-xl 2xl:text-2xl'>
                                        <li className='my-4 text-gray-500'>使用者條款</li>
                                        <li className='my-4 text-gray-500'>留言規範</li>
                                        <li className='my-4 text-gray-500'>審核流程</li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className='text-gray-400 lg:text-2xl 2xl:text-3xl'>議題討論</h2>
                                    <ul className='mt-6 font-rounded xl:text-xl 2xl:text-2xl'>
                                        <li className='my-4 text-gray-500'>議題投票</li>
                                        <li className='my-4 text-gray-500'>篩選流程</li>
                                    </ul>
                                </div>
                            </div> */}
                            <h2 className='w-full text-right text-base lg:text-xl text-gray-500'>&copy; 2021 Speakup開發團隊 版權所有</h2>

                        </div>
                        {/* <hr className='w-screen border-t-2 border-gray-500 bg-gray-100 pt-3 pb-2 h-[1px]' />

                        <div className='w-screen pb-4 lg:pt-4 lg:pb-6 bg-gray-100'>
                            <h2 className='w-full text-center text-base lg:text-lg text-gray-500'>&copy; 2021 Speakup開發團隊 版權所有</h2>
                        </div>
                        <div className='h-1'></div> */}
                    </div>
                </div >
            }
        </>
    )
}

export default LandingPage
