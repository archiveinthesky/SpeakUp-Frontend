import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import AccountOptions from './HeaderComponents/AccountOptions'
import NotificationButton from './HeaderComponents/Notifications'

import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline'

import logo from '../../Assets/General/logo.svg'
import dfprofile from '../../Assets/General/defualtprofile.png'



const Header = ({ accprofile = dfprofile }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [showReturnArrow, setShowReturnArrow] = useState(false)

    useEffect(() => {
        let sepedUrl = location.pathname.split('/')
        console.log(sepedUrl[sepedUrl.length - 2])
        setShowReturnArrow(sepedUrl[sepedUrl.length - 2] === 'discussions')
    }, [location])


    const searchSubmit = (e) => {
        e.preventDefault()
        let keyword = e.target[0].value
        if (keyword !== null) {
            if (keyword.charAt(0) === "#") window.location.href = `/search?tags=${keyword.substring(1)}`
            else window.location.href = `/search?keyword=${keyword}`
        }
    }

    return (
        <div className='fixed w-screen h-16 bg-accent-blue z-20 px-8 xl:px-14 2xl:px-18'>
            <div className='flex lg:hidden h-full items-center'>
                {showReturnArrow ?
                    <button onClick={() => { navigate(-1) }}>
                        <ArrowLeftIcon className='w-8 h-8 text-white' />
                    </button> :
                    <Link to="/home">
                        <img className="my-auto h-12" src={logo} alt="logo" />
                    </Link>
                }
            </div>

            <div className="hidden lg:flex justify-between items-center">
                <div className="w-screen h-16 flex items-center gap-14">
                    <Link to="/home">
                        <img className="my-auto h-16 md:h-14" src={logo} alt="logo" />
                    </Link>
                    <form className="my-auto h-11 invisible md:visible md:w-7/12 xl:w-5/12 max-w-2xl flex" onSubmit={searchSubmit}>
                        <input className="w-full bg-white rounded-3xl text-xl text-gray-500 pl-4" placeholder="搜尋你感興趣的議題" type="text" />
                        <button type="submit" className="relative -left-12">
                            <SearchIcon className='w-7 h-7' />
                        </button>
                    </form>
                </div>
                <div className='w-10 h-10 flex justify-end items-center gap-6 '>
                    <NotificationButton />
                    <AccountOptions />
                </div>
            </div >
        </div>
    )
}

export default Header
