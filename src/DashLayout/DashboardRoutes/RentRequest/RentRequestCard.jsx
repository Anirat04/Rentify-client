import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import './dropdown.css'; // Import the CSS file

const RentRequestCard = ({ items, refetch }) => {
    const { _id, property, requestStatus, requesterNumber, requesterEmail, requesterName } = items;
    const axiosSecure = useAxiosSecure();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false); 

    
    const toggleDropdown = () => {
        setDropdownVisible(prevState => !prevState);
    };

  
    const handleClickOutside = (event) => {
        if (dropdownVisible && !event.target.closest('.dropdown')) {
            setDropdownVisible(false);
        }
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownVisible && !event.target.closest('.dropdown')) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownVisible]); 
    useEffect(() => {
        if (requestStatus === 'accepted' || requestStatus === 'rejected') {
            setButtonDisabled(true);
        }
    }, [requestStatus]);


    const setAccept = (id) => {
        axiosSecure.put(`/accept/${id}`)
            .then((res) => {
                console.log("hi", res);
                refetch();
                setButtonDisabled(true); 
            })
            .catch((error) => console.error("Error updating verification status:", error));
    };

   
    const setReject = (id) => {
        axiosSecure.put(`/reject/${id}`)
            .then((res) => {
                console.log(res);
                refetch();
                setButtonDisabled(true); 
            })
            .catch((error) => console.error("Error updating verification status:", error));
    };

    return (
        <tr className="font-semibold"> 
            <td>
                {/* Redesign by Rana */}
            <div className="flex flex-col lg:flex-row gap-2 items-center">
          <img className="w-[100px] rounded" src={property.property_img} alt="" />
          <h2 className="font-bold text-sm">{property.property_title}</h2>
        </div>
                {/* <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-20 h-20">
                            <img src={property.property_img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{property.property_title}</div>
                    </div>
                </div> */}
            </td>
            <td >{property.property_location.address.street}</td>
            <td className="flex mt-7 justify-between ">
                {requesterName}
                <span className="">
                    <div className="dropdown">
                        <button onClick={toggleDropdown} className="dropbtn "><HiOutlineDotsVertical /></button>
                        {/* Dropdown content */}
                        <div className={`dropdown-content bg-white shadow-xl py-2 px-2 w-64 rounded-lg -left-40 ${dropdownVisible ? 'show' : ''}`}>
                            {/* Dropdown options */}
                            <h1><span className="text-[#002172] font-semibold">E-mail:</span>{requesterEmail}</h1>
                            <h1><span className="text-[#002172] font-semibold">Phone: </span> {requesterNumber}</h1>

                        </div>
                    </div>
                </span>
            </td>
            <td>{property.property_details.property_price}</td>
            <td>{property.property_details.property_id}</td>
            <td>{property.property_category}</td>
            <td className="text-[#e33226]">{requestStatus}</td>
            <td>
                {/* Dropdown button */}
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropbtn"><HiOutlineDotsHorizontal /></button>
                    {/* Dropdown content */}
                    <div className={`dropdown-content menu menu-sm -left-12 py-0   px-0 w-32  rounded-lg bg-[#ffffff]  text-center  ${dropdownVisible ? 'show' : ''}`}>
                        {/* Dropdown options */}
                        <ul>
                            <li className="hover:bg-[#002172] hover:rounded-t-md transition-all ease-out duration-300 hover:text-white"><button onClick={() => setAccept(_id)} disabled={buttonDisabled}>Accept</button>
                        </li>
                        <li className="hover:bg-[#002172] hover:rounded-b-md transition-all ease-out duration-300 hover:text-white"><button onClick={() => setReject(_id)} disabled={buttonDisabled}>Reject</button></li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default RentRequestCard;
