import React from 'react'
import logo from '../../../Assets/Common/logo.svg'
import magnifer from '../../../Assets/Common/magnifier.png'


const Header = () => {
    const searchSubmit = (e) => {
        e.preventDefault()
        if (e.target[0].value !== null) window.location.href = `/search?keyword=${e.target[0].value}`
    }

    return (
        <a href='/home'>
            <div className="fixed w-screen h-16 bg-accent-blue z-20 flex justify-between">
                <div className="flex h-16 w-screen">
                    <img className="pl-8 xl:pl-14 my-auto h-14" src={logo} alt="logo" />
                    <form className="pl-10 2xl:pl-24 my-auto h-11 invisible md:visible md:w-7/12 xl:w-5/12 max-w-2xl flex" onSubmit={searchSubmit}>
                        <input className="w-full bg-white rounded-3xl text-xl text-gray-500 pl-4" placeholder="搜尋你感興趣的議題" type="text" />
                        <button type="submit" className="relative -left-12">
                            <img className="w-7 h-7" src={magnifer}></img>
                        </button>
                    </form>
                </div>
            </div >
        </a>
    )
}

export default Header
