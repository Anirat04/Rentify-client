import './SideBar.css'
import { Link, NavLink } from 'react-router-dom';
import { FaBookmark, FaHome, FaUserCircle } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";

const SideBar = () => {
    const sideLinks = <>
        <li className="dashLi">
            <NavLink
                to="/dashboard/profile"
                className="dashNav flex items-center gap-2"
            >
                <FaUserCircle className="dashIcon text-[#64707d]"></FaUserCircle >
                Profile
            </NavLink>
        </li>

        <li className="dashLi">
            <NavLink
                to="/dashboard/my-requests"
                className="dashNav flex items-center gap-2"
            >
                <MdOutlinePendingActions className="dashIcon text-[#64707d]"></MdOutlinePendingActions >
                Requested Properties
            </NavLink>
        </li>

        <li className="dashLi">
            <NavLink
                to="/dashboard/saved"
                className="dashNav flex items-center gap-2"
            >
                <FaBookmark className="dashIcon text-[#64707d]"></FaBookmark >
                Saved Properties
            </NavLink>
        </li>
    </>

    const ownerRoutes = <>
        <li className="dashLi">
            <NavLink
                to="/dashboard/add"
                className="dashNav flex items-center gap-2"
            >
                <IoAddCircleSharp className="dashIcon text-[#64707d]"></IoAddCircleSharp >
                Add Properties
            </NavLink>
        </li>
        <li className="dashLi pt-2">
            <NavLink
                to="/dashboard/manage"
                className="dashNav flex items-center gap-2"
            >
                <MdManageHistory className="dashIcon text-[#64707d]"></MdManageHistory>
                Manage Properties
            </NavLink>
        </li>
    </>

    return (
        <div>
            <div className="w-64 min-h-screen">
                <div className="flex justify-center items-center my-6">
                    <Link to="/">
                        <div className="flex  items-center">
                            <img
                                className="max-w-[65px] md:w-full"
                                src="https://i.ibb.co/3kqdMYy/logo-white.png"
                            />
                            <h4 className="font-bold poppins-font text-2xl lg:text-[34px] ml-2">
                                Renti<span className="text-[#e33226]">fy</span>
                            </h4>
                        </div>
                    </Link>
                </div>
                {/* Sidebar Contents (Routes of dashboard) starts here */}
                <div className="p-4">
                    <span className='flex gap-5'>
                        <NavLink
                            to="/"
                            className="flex items-center gap-2"
                        >
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                        <h3>&gt;</h3>
                        <h3 className='flex items-center gap-2'><MdOutlineDashboardCustomize />Dashboard</h3>
                    </span>
                    <hr className="mb-3" />
                    <ul className="flex flex-col gap-2">
                        {sideLinks}
                    </ul>
                    <h3 className="poppins-font font-semibold text-xl mt-5 text-gray-400">Owner Routes</h3>
                    <hr className="mb-3" />
                    <ul>
                        {ownerRoutes}
                    </ul>
                    {/* dropdown impleament by sojib */}
                    <h2 className='poppins-font font-semibold text-xl mt-5 text-gray-400' >Dropdown Demo</h2>
                    <hr className="mb-3" />
                    <div className="dropdown dropdown-bottom text-center">
                        <div tabIndex={0} role="button" className=" ml-3 dashIcon text-[#64707d]">Dropdown demo</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 dashIcon text-[#ffffff] rounded-box w-52 bg-[#000]">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;