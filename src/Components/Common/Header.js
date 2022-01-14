import { Link } from 'react-router-dom'

import AccountOptions from './AccountOptions'
import NotificationButton from './Notifications'

import logo from '../../Assets/General/logo.svg'
import magnifer from '../../Assets/General/magnifier.png'
import dfprofile from '../../Assets/General/defualtprofile.png'


const Header = ({ accprofile = dfprofile }) => {

    const searchSubmit = (e) => {
        e.preventDefault()
        let keyword = e.target[0].value
        if (keyword !== null) {
            if (keyword.charAt(0) === "#") window.location.href = `/search?tags=${keyword.substring(1)}`
            else window.location.href = `/search?keyword=${keyword}`
        }
    }

    return (
        <div className="fixed w-screen h-16 bg-accent-blue z-20 flex justify-between items-center">
            <div className="flex h-16 w-screen items-center">
                <Link to="/home">
                    <img className="ml-8 xl:ml-14 my-auto h-16 md:h-14" src={logo} alt="logo" />
                </Link>
                <form className="pl-10 2xl:pl-24 my-auto h-11 invisible md:visible md:w-7/12 xl:w-5/12 max-w-2xl flex" onSubmit={searchSubmit}>
                    <input className="w-full bg-white rounded-3xl text-xl text-gray-500 pl-4" placeholder="搜尋你感興趣的議題" type="text" />
                    <button type="submit" className="relative -left-12">
                        <img className="w-7 h-7" src={magnifer} alt="Search"></img>
                    </button>
                </form>
            </div>
            <div className='w-10 h-10 mr-8 xl:mr-14 flex justify-end items-center gap-6 '>
                <NotificationButton />
                <AccountOptions />
            </div>
        </div >
    )
}

export default Header
