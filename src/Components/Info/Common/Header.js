import React from 'react'
import logo from '../../../Assets/Common/logo.svg'

const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-screen h-20 bg-accent-blue z-20 ">
            <div className='w-5/6 md:w-11/12 h-20 mx-auto flex justify-between'>
                <img className="my-auto h-14" src={logo} alt="logo" />
                <ul className="hidden md:flex my-auto font-rounded justify-between gap-16">
                    <a href='https://speakupclosedpreview.notion.site/Speakup-5024cd215bbd436c9e14a8df435b0b4d' target="_blank"><li className='text-white text-2xl'>關於我們</li></a>
                    <a href='https://speakupclosedpreview.notion.site/Speakup-940ca29e16744db3864d1afd650134e6' target="_blank"><li className='text-white text-2xl'>留言規範</li></a>
                    <a href='/signup'><li className='text-white text-2xl'>開始使用</li></a>
                </ul>
            </div>
        </div >
    )
}

export default Header
