import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { UserCircleIcon, CogIcon, InformationCircleIcon, LogoutIcon } from '@heroicons/react/outline'

const AccountOptions = () => {

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

    return (
        <Menu as="div" className="relative inline-block text-left z-10">
            <div className='h-9'>
                <Menu.Button className="inline-flex justify-center w-9 h-9 rounded-full border border-gray-300 shadow-sm bg-white text-sm text-gray-700 overflow-hidden hover:bg-gray-50 ">
                    <UserCircleIcon className='w-full h-full' />
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
                    <div className="py-1 ">
                        <div className='flex px-4 py-2 items-center gap-2'>
                            <div className='w-10 h-10 overflow-hidden rounded-full flex-shrink-0'>
                                <UserCircleIcon className='w-10 h-10' />
                            </div>
                            <p className='text-lg'>Andrew Kuo</p>
                        </div>

                        <Menu.Item>
                            {({ active }) => <button
                                className={`w-full ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} px-4 py-2 flex items-center gap-3 text-sm text-left`}

                            >
                                <CogIcon className='w-7 h-7' />
                                <p className=' text-base'>設定</p>
                            </button>
                            }
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => <button
                                className={`w-full ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} px-4 py-2 flex items-center gap-3 text-sm text-left`}

                            >
                                <InformationCircleIcon className='w-7 h-7' />
                                <p className=' text-base'>幫助</p>
                            </button>
                            }
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => <button
                                className={`w-full ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} px-4 py-2 flex items-center gap-3 text-sm text-left`}
                                onClick={logout}
                            >
                                <LogoutIcon className='w-7 h-7' />
                                <p className=' text-base'>登出</p>
                            </button>
                            }
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default AccountOptions