import { useEffect, useState } from "react";
import useOwnerRent from "../../../Hooks/useOwnerRent";
import RentRequestCard from "./RentRequestCard";
import { FaUser } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import { FcHome } from "react-icons/fc";
import { IoMdArrowDropdown } from "react-icons/io";

const RentRequest = () => {
    const [ownerRent, refetch] = useOwnerRent();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");

    const accepted = ownerRent.filter(
        (item) => item.requestStatus == "accepted"
    );
    const pending = ownerRent.filter(
        (item) => item.requestStatus == "pending"
    );
    const rejected = ownerRent.filter(
        (item) => item.requestStatus == "rejected"
    );
    



    useEffect(() => {
        setTableData(ownerRent);
        setFilteredData(ownerRent);
    }, [ownerRent]);

    const filterData = (status) => {
        switch (status) {
            case "accepted":
                setFilteredData(accepted);
                break;
            case "pending":
                setFilteredData(pending);
                break;
            case "rejected":
                setFilteredData(rejected);
                break;
            default:
                setFilteredData(ownerRent);
        }
    };

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(prevState => !prevState);
    };


    return (
        <>
             
        <section className="py-1 bg-[#f3f3f3] w-full min-h-screen">
            {/* Top-Context */}
        <div className=" flex gap-8 mx-auto py-5 w-[93%]">
                
                <div className="flex bg-white shadow-md text-lg py-7 px-5 items-center justify-between gap-6 w-[40%] rounded-2xl">
                    <div >
                        <h1 className="font-bold text-xl">Rent Request List</h1>
                        <h3 className="text-base text-[#e33226]">Customer <span className="text-[#002172]">/ Order list</span></h3>
                    </div>
                    <button className="bg-[#002172] text-white rounded-xl px-4 py-2">
                        refresh
                    </button>
                </div>
                <div className="flex bg-white py-7 shadow-md  px-10 items-center justify-between gap-20 w-[880px] rounded-2xl">
                    <div className="text-6xl">
                        <FcHome />
                    </div>
                    <div className="text-lg">
                        <h1 className="font-bold">INFORMATION</h1>
                        <h1>Rent Request transforms real estate transactions by connecting buyers and sellers seamlessly, facilitating personalized property matches based on preferences and requirements.</h1>
                    </div>

                </div>
            </div>
           
            <div className="mt-10 w-[93%] bg-white px-6 mx-auto mb-20 shadow-lg rounded-lg">
                <table className="table table-zebra overflow-x-auto">
                    {/* head */}
                    <thead className="font-semibold text-lg text-[#002172]">
                        <tr>
                            <th>Property Info.</th>
                            <th>Location</th>
                            <th>Customer Info</th>
                            <th>Price</th>
                            <th>Order-ID</th>
                            <th>Type</th>
                            {/* dropdown */}
                            <th className="flex items-center  gap-2" tabIndex={0} role="button" onClick={toggleDropdown}>
                                Status <IoMdArrowDropdown />
                            </th>
                            {dropdownVisible && (
                            <div>
                                <div colSpan="7" className="relative">
                                    <ul className={`dropdown-content bg-white z-[1] menu p-2 shadow rounded-box w-52 absolute top-full left-0`}>
                                        <li><a onClick={() => filterData("ownerRent")}>All</a></li>
                                        <li><a onClick={() => filterData("pending")}>Pending</a></li>
                                        <li><a onClick={() => filterData("accepted")}>Accept</a></li>
                                        <li><a onClick={() => filterData("rejected")}>Reject</a></li>
                                    </ul>
                                </div>
                            </div>
                        )}


                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            <RentRequestCard key={item._id} refetch={refetch} items={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
        </>
    );
};

export default RentRequest;
