import { Link } from 'react-router-dom'
import { HomeIcon, SearchIcon, BookmarkIcon, BellIcon, UserCircleIcon } from '@heroicons/react/outline';

const Footbar = () => {
    return (
        <div className='lg:hidden fixed left-0 bottom-0 w-full h-16 bg-white border-t border-gray-400 flex justify-around items-center'>
            <Link to='/home'><HomeIcon className='w-8 h-8' /></Link>
            <Link to='/home'><SearchIcon className='w-8 h-8' /></Link>
            <Link to='/home'><BookmarkIcon className='w-8 h-8' /></Link>
            <Link to='/home'><BellIcon className='w-8 h-8' /></Link>
            <Link to='/home'><UserCircleIcon className='w-8 h-8' /></Link>
        </div>
    );
};

export default Footbar;
