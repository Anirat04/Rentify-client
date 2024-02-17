import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useProperties from "../../../Hooks/useProperties";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const ManagePropertiesTable = ({ property }) => {
  const { property_info } = property || {};
  const {
    property_details,
    property_img,
    property_title,
    property_location,
    property_for,
    ownership_duration,
    owner_details,
    verify_status,
  } = property_info || {};
  const [dropdownVisible, setDropdownVisible] = useState(false);
 

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  return (
    <>
      <td>
        <div className="flex flex-col lg:flex-row gap-2 items-center">
          <img className="w-[80px] rounded" src={property_img} alt="" />
          <h2 className="font-bold">{property_title}</h2>
        </div>
      </td>
      <td>{property_location?.address?.city}</td>
      <td className="capitalize">{property_for}</td>
      <td>
        <span className="text-base">$</span>
        {property_details?.property_price}
      </td>
      <td>{ownership_duration}</td>
      <td>{owner_details?.owner_email}</td>
      <td>{verify_status ? "True" : "False"}</td>
      {/* from this line to 63 is done by [ sadia ] */}

      {
        verify_status == 'verified' ? <td>
        {/* Dropdown button */}
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            <HiOutlineDotsHorizontal className="text-xl" />
          </button>
          {/* Dropdown content */}
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box -ml-6">
            <li>
              <Link to={`/update-property/${property._id}`} className="text-green-500 font-semibold">Update</Link>
            </li>
            <li>
              <button className="text-red-500 font-semibold">Delete</button>
            </li>
          </ul>
        </div>
      </td> : <></>
      }
      
      
    </>
  );
};

export default ManagePropertiesTable;
