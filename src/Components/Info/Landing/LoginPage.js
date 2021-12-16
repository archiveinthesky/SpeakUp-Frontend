import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginTopic from './LoginTopic'
import closedEye from './Images/closed-eye.svg'
import openEye from './Images/open-eye.svg'

const SignInForm = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userPwd, setUserPwd] = useState("")
    const [showPwd, setShowPwd] = useState(false)

    const onEmailReg = (e) => {
        e.preventDefault()
    }

    return (
        <div className='w-full h-full overflow-y-auto xl:pl-6 pr-2 2xl:px-14 '>
            <h2 className='my-3 text-4xl text-black font-rounded'>歡迎回來Speakup！</h2>
            <p className='text-lg text-black'>還沒有帳號嗎？現在<Link className='text-blue-600' to="../signup">註冊</Link>一個</p>
            <form onSubmit={onEmailReg}>
                <input type='email'
                    onChange={(e) => { setUserEmail(e.target.value) }}
                    className="w-full h-16 my-3 px-6 border-2 border-black rounded-3xl text-black text-2xl hover:drop-shadow-lg" placeholder='您的電子郵件'
                />
                <div className='relative'>
                    <input type={showPwd ? 'text' : 'password'}
                        value={userPwd}
                        onChange={(e) => { setUserPwd(e.target.value) }}
                        className='w-full h-16 my-3 px-6 border-2 border-black rounded-3xl text-black text-2xl shrink-0 hover:drop-shadow-lg' placeholder='您的密碼'
                    >
                    </input>
                    <button type='button' onClick={() => { setShowPwd(!showPwd) }} className="absolute top-7 right-6">
                        <img className="w-7 h-7" src={showPwd ? openEye : closedEye}></img>
                    </button>
                </div>
                <button className='w-full h-16 my-3 bg-blue-600 rounded-3xl hover:drop-shadow-lg' type='submit' >
                    <div className='m-auto'>
                        <p className='text-center text-white text-3xl font-rounded'>登入</p>
                    </div>
                </button>
            </form>
            <div className='w-full my-3 flex justify-center items-center'>
                <hr className='w-48 bg-black h-[2px]' />
                <p className='mx-2 text-black text-2xl font-rounded'>或</p>
                <hr className='w-48 bg-black h-[2px]' />
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
            </button>
        </div>
    )
}

const LoginPage = () => {
    return (
        <div className='w-screen h-screen bg-accent-blue flex'>
            <div className='w-10/12 py-[5vh] xl:py-0 xl:w-11/12 2xl:w-5/6 xl:h-5/6 m-auto bg-white rounded-[40px] flex'>
                <div className='w-5/6 xl:w-11/12 2xl:w-5/6 xl:h-4/6 m-auto xl:grid xl:grid-cols-2 xl:justify-center'>
                    <div className='hidden xl:block'>
                        <LoginTopic />
                    </div>
                    <SignInForm />
                </div>
            </div>
        </div>
    )
}

export default LoginPage
