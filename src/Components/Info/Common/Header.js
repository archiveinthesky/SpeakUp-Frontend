import React from 'react'
import logo from '../../../Assets/Common/logo.svg'

const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-screen h-20 bg-accent-blue z-20 ">
            <div className='w-5/6 md:w-11/12 h-20 mx-auto flex justify-between'>
                <img className="my-auto h-14" src={logo} alt="logo" />
                <ul className="hidden md:flex my-auto font-rounded justify-between gap-16">
                    <li className='text-white text-2xl'>平台理念</li>
                    <li className='text-white text-2xl'>關於我們</li>
                    <li className='text-white text-2xl'><a href="/signup">開始使用</a></li>
                </ul>
            </div>
        </div >
    )
}

export default Header
