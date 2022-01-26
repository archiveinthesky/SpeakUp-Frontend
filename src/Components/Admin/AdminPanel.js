import { Outlet } from "react-router-dom"
import Header from './Common/Header'
import Sidebar from './Common/Sidebar'

const AdminPanel = () => {
    return (
        <div className="w-screen h-screen bg-slate-200 overflow-y-hidden">
            <div>
                <Header />
                <Sidebar defualtState={window.innerWidth >= 1280} />
            </div>
            <div className="mt-16 ml-80 px-6 py-6">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPanel

