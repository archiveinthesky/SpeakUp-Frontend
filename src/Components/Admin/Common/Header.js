import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import logo from '../../../Assets/General/logo.svg'
import dfprofile from '../../../Assets/General/defualtprofile.png'


const Header = ({ accprofile = dfprofile }) => {

    const logout = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout/`, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem("AuthToken")
            }
        }).then(response => {
            if (response.status === 204) {
                localStorage.removeItem("AuthToken")
                window.location.href = "/"
            }
        })
    }

    const AccountOptions = () => {
        function classNames(...classes) {
            return classes.filter(Boolean).join(' ')
        }

        return (
            <Menu as="div" className="relative inline-block text-left z-10">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full h-full rounded-full border border-gray-300 shadow-sm bg-white text-sm text-gray-700 overflow-hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        <img src={accprofile} alt="Account "></img>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm'
                                    )} onClick={logout}>
                                        登出
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-16 bg-accent-blue z-20 flex justify-between items-center">
            <div className="flex h-16 w-screen items-center">
                <Link to="/home">
                    <img className="pl-8 xl:pl-14 my-auto h-14" src={logo} alt="logo" />
                </Link>
            </div>
            <div className='relative w-10 h-10 mr-8 xl:mr-14'>
                <AccountOptions />
            </div>
        </div >
    )
}

export default Header
