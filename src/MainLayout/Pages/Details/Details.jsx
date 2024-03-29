import { Link, NavLink, useLoaderData, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { RiCheckboxMultipleLine, RiMailSendLine } from "react-icons/ri";
import { IoMdPlay } from "react-icons/io";
import VideoModal from "../Home/HomeComponents/Virtual Apartments/VideoModal";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
import { FaBookmark, FaFacebookMessenger, FaRegBookmark } from "react-icons/fa";
import BookingForm from "./BookingForm.jsx";
import useAuth from "../../../Hooks/useAuth.jsx";
import ReviewForm from "./ReviewForm.jsx";
import OwnerInfo from "./OwnerInfo.jsx";
import useSavedProperties from "../../../Hooks/useSavedProperties.jsx";
import Reviews from "./Reviews.jsx";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import { useEffect, useState } from "react";
import useGetRole from "../../../Hooks/useGetRole.jsx";
import PageBanner from "../../Shared/banner for pages/PageBanner.jsx";
import { HiOutlinePhone } from "react-icons/hi2";

const Details = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const properties = useLoaderData();
  const { id } = useParams();
  const item = properties.find((item) => item._id == id);
  const [saved, refetch] = useSavedProperties();
  // console.log(saved);

  // saved properties find for bookmark design and So that the user cannot add a property more than once this function added by sojib
  const findSaved = saved.find((save) => save.property._id == item?._id);
  // console.log(findSaved);

  //destructure
  const { property_info } = item || {};
  const {
    property_details,
    property_for,
    property_img,
    property_title,
    property_location,
    property_category,
    owner_details,
    property_description,
  } = property_info || {};
  const {
    property_tags,
    property_features,
    property_id,
    property_price,
    property_type,
    property_status,
    built,
    bedroom,
    bath,
    balcony,
    garages,
  } = property_details || {};
  const {
    owner_name,
    owner_img,
    owner_phone,
    owner_email,
    owner_profession,
    owner_address,
  } = owner_details || {};
  console.log("owner image", owner_img);
  //destructure

  //save property feature added by Fahima
  const handleSaveProperty = () => {
    if (user) {
      //for saving property data to backend
      const savedProperties = {
        property: item,
        savedUserEmail: user.email,
      };
      if (findSaved) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your already have this property Saved done!",
          footer: `<a href='/all' className='font-bold underline'>Please saved another property</a>`,
          showConfirmButton: false,
        });
      } else {
        axiosSecure.post("/saved-properties", savedProperties).then((res) => {
          console.log(res.data);
          Swal.fire({
            title: `Added to saved properties.`,
            timer: 2000,
            color: "#002172",
            showConfirmButton: false,
            icon: "success",
          });
          refetch();
        });
        console.log(savedProperties);
      }
      // reset();
      //for saving property data to backend
    } else {
      // this login will allow user to save their desired property only if they are user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Looks like you're not logged in!",
        footer: `<a href='/login' className='font-bold underline'>Please Log In</a>`,
        showConfirmButton: false,
      });
    }
  };
  // remove property from saved properties feature added by Fahima
  const handleRemoveProperty = (id) => {
    console.log(id);
    axiosSecure.delete(`/saved-properties/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          title: `Removed from saved properties.`,
          timer: 2000,
          color: "#002172",
          showConfirmButton: false,
          icon: "success",
        });
      }
    });
  };

  // chat functionality
  const [ownerUser, setOwnerUser] = useState([]);
  const [chatsMembers, setChatMembers] = useState([]);
  const [userRole] = useGetRole();
  // get ownerUser by use fetch
  const url = `https://rentify-server-drab.vercel.app/users/${owner_details?.owner_email}`;
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setOwnerUser(data))
  }, [url])

  // First member is the owner of the property
  const firstMember = ownerUser?._id;
  // Second Member is the current user
  const secondMember = userRole?._id;
  // get chatMembers by use fetch
  const memberUrl = `https://rentify-server-drab.vercel.app/chat/find/${firstMember}/${secondMember}`;
  useEffect(() => {
    fetch(memberUrl)
      .then((res) => res.json())
      .then((data) => setChatMembers(data));
  }, [memberUrl]);

  // console.log("MEmbers", firstMember, secondMember);
  // console.log("chtMembers", chatsMembers);

  const handleSendChats = async () => {
    if (user) {
      const newMembers = {
        members: [firstMember, secondMember],
      };
      console.log(newMembers);
      const existingOwner = owner_email === user?.email;
      console.log("existing email", existingOwner);
      if (!chatsMembers && !existingOwner) {
        await axiosSecure.post("/chat", newMembers)
          .then(res => {
            console.log(res.data)
            Swal.fire("Now You connected With this owner")
          })
      }
    } 
    else {
      // this login will allow user to save their desired property only if they are user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Looks like you're not logged in!",
        footer: `<a href='/login' className='font-bold underline'>Please Log In</a>`,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Rentify | Property Details</title>
      </Helmet>
      <div>
        {/* page banner component added */}
        <PageBanner
          heading={"Property Details"}
          title={"Property Details"}
          img={"https://i.ibb.co/Zdk0mLj/breadcrumb-4.jpg"}
        />
        {/* details sections starts */}
        <div className="max-w-7xl mx-auto mt-16 md:p-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="main_details px-5 md:px-0 md:w-3/4">
              <div className="mb-16">
                <div className="flex justify-between">
                  <h2 className="text-3xl poppins-font mb-[12px] font-semibold text-black">
                    {property_title}
                  </h2>
                  <p className="text-[#ec3323] inline-block text-lg font-bold mt-1">
                    ${property_price}
                  </p>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <p className="flex text-base items-center gap-2 ">
                    <CiLocationOn className="text-[#e33226]" />
                    {property_location?.address?.street},{" "}
                    {property_location?.address?.city},{" "}
                    {property_location?.address?.state},{" "}
                    {property_location?.address?.country}
                  </p>
                  {/* wishlist icon functionality added by Fahima */}
                  {/* <button onClick={handleSaveProperty}> */}
                  {/* this condition added by Sojib */}
                  {findSaved ? (
                    <button>
                      <FaBookmark
                        onClick={() => handleRemoveProperty(findSaved._id)}
                        className="text-xl text-[#ec3323]"
                      />
                    </button>
                  ) : (
                    <>
                      {/* this condition is used for removing the property from saved properties */}
                      <button onClick={handleSaveProperty}>
                        <FaRegBookmark className="text-xl" />
                      </button>
                    </>
                  )}
                  {/* </button> */}
                </div>
              </div>
              <div>
                <span className=" px-3 py-3 rounded bg-[#ec3323] border-none text-white w-fit h-fit relative ml-7 text-lg capitalize">
                  For {property_for}
                </span>
                <img
                  className="rounded-md w-full h-auto static -mt-20"
                  src={property_img}
                  alt={property_title}
                />
              </div>
              {/* Description section */}
              <div>
                <h3 className="poppins-font text-[24px] font-semibold my-6">
                  Description
                </h3>
                {/* description added by fahima */}
                <p className="text-[#666666] text-[16px]">
                  {property_description ? (
                    property_description
                  ) : (
                    <span>
                      Indulge in the epitome of urban sophistication with our
                      Stylish Urban Loft, a captivating space meticulously
                      curated to embody the essence of Industrial Chic Vibes.
                      This loft is a harmonious fusion of contemporary allure
                      and industrial aesthetics, where every element is
                      carefully chosen to create an environment that is not only
                      stylish but also exceptionally comfortable. As you enter,
                      be greeted by the alluring play of textures - exposed
                      brick walls that tell a story of the building&#39;s
                      history, polished concrete floors providing a sleek
                      foundation, and strategically placed metal accents that
                      add an industrial edge to the overall design. The open
                      layout enhances the loft&#39;s spacious feel, inviting you
                      to explore each carefully appointed corner. The carefully
                      selected furnishings and decor seamlessly integrate modern
                      elegance with industrial elements. Statement pieces, such
                      as artisanal light fixtures and bespoke furniture, elevate
                      the space, offering both functionality and aesthetic
                      appeal. The color palette, a blend of muted tones and bold
                      contrasts, complements the loft&#39;s overall ambiance,
                      creating a cozy yet stylish retreat.
                    </span>
                  )}
                </p>
              </div>
              {/* Property specification/details section */}
              <div>
                <h3 className="poppins-font text-[24px] font-semibold my-6">
                  Property Details
                </h3>
                <ul className="grid grid-cols-3 gap-3">
                  <li className="text-[16px] font-bold text-black">
                    Property ID:{" "}
                    <span className="text-[#666666]">{property_id}</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Property Type:{" "}
                    <span className="text-[#666666]">{property_category}</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Property Status:{" "}
                    <span className="text-[#666666]">{property_for}</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Property Price:{" "}
                    <span className="text-[#666666]">${property_price}</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Rooms: <span className="text-[#666666]">6</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Bedrooms: <span className="text-[#666666]">{bedroom}</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Bath: <span className="text-[#666666]">{bath}</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Garages: <span className="text-[#666666]">{garages}</span>
                  </li>
                  <li className="text-[16px] font-bold text-black">
                    Year Built: <span className="text-[#666666]">{built}</span>
                  </li>
                </ul>
              </div>
              {/* Property Floor plans */}
              <div>
                <h3 className="poppins-font text-[24px] font-semibold my-6">
                  Floor Plans
                </h3>
                <div className="p-[50px] bg-[#f9f9f9]">
                  <img
                    src="https://angular.hibootstrap.com/enuf/assets/img/property/floor-plan.png"
                    // src={item?.property_info.floor_plans}
                    alt="Floor plan image"
                  />
                </div>
              </div>
              {/* Property features */}
              <div>
                <h3 className="poppins-font text-[24px] font-semibold my-6">
                  Property Features
                </h3>
                <ul className="grid grid-cols-3 gap-3">
                  {property_features?.map((feature) => (
                    <li
                      key={feature}
                      className="text-[#666666] flex items-center gap-2"
                    >
                      <span>
                        <RiCheckboxMultipleLine className="text-[#eb3323]" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Property Video section */}
              <div>
                <h3 className="poppins-font text-[24px] font-semibold my-6">
                  Property Video
                </h3>
                <div className="relative">
                  <div>
                    <img
                      className="rounded-md"
                      src="https://angular.hibootstrap.com/enuf/assets/img/property/single-property-2.jpg"
                      alt="The video section image"
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-6 rounded-full">
                    <IoMdPlay
                      className="text-[#eb3323] text-[34px]"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    />
                    <VideoModal
                      virtualLink={
                        "https://www.youtube.com/embed/B4o8PvcqHC4?si=_KSnfXaSAJltBM0G"
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Property Review section */}
              <Reviews property_title={property_title} />
              {/* Review submission form starts */}
              <div>
                <h3 className="poppins-font text-[24px] font-semibold my-6">
                  Add your review
                </h3>
                {/* review form designed by Sojib modified by Fahima */}
                <ReviewForm property={item} />
              </div>
              {/* similar property section starts */}
              {/* <div>
              <h3 className="poppins-font text-[24px] font-semibold my-6">
                Similar Properties
              </h3>
              <div className="flex gap-6">
                <PropertyCard
                  img={
                    "https://angular.hibootstrap.com/enuf/assets/img/property/property-10.jpg"
                  }
                ></PropertyCard>
                <PropertyCard
                  img={
                    "https://angular.hibootstrap.com/enuf/assets/img/property/property-2.jpg"
                  }
                ></PropertyCard>
              </div>
            </div> */}
            </div>
            {/* div for right side */}
            <div className="flex flex-col gap-3">
              {/* booking form designed by Sojib modified by Fahima */}
              <div
                className="md:w-[416px] max-w-[416px] h-fit p-5"
                style={{
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.09)",
                }}
              >
                <BookingForm item={item} property_for={property_for} />
              </div>
              {/* owner information */}
              <div
                className="h-auto p-5 md:w-[416px] max-w-[416px] mt-3"
                style={{
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.09)",
                }}
              >
                {/* this owner form commented by sojib please Don't uncomment it without telling him */}
                {/* <OwnerInfo owner={owner_details} /> */}
                <h2 className="text-3xl font-bold my-5">Owner Information</h2>
                <div className="flex gap-4 my-3">
                  <img
                    className="rounded-full h-[70px] w-[70px]"
                    src={owner_img}
                    alt="owner-image"
                  />
                  <div className="flex flex-col ">
                    <h2 className="text-black text-lg font-bold">{owner_name} </h2>
                    <p className="text-[#666666] text-sm">{owner_profession} </p>
                  </div>
                </div>
                <hr />
                {/* contact information */}
                <div className="my-3 space-y-4">
                  <p className="flex gap-2 text-base">
                    <CiLocationOn className="text-[#ec3323] text-base" />
                    {owner_address}
                  </p>
                  <p className="flex gap-2 text-base">
                    <HiOutlinePhone className="text-[#ec3323] text-base" />
                    {owner_phone}
                  </p>
                  <p className="flex gap-2 text-base">
                    <RiMailSendLine className="text-[#ec3323] text-base" />
                    {owner_email}
                  </p>
                </div>
                <hr />
                <div className="my-3">
                  <Link to={`/dashboard/chat/${firstMember}`}>
                    <div onClick={handleSendChats}>
                      <button
                        className="rounded p-4 bg-[#002172] hover:bg-[#EC3323] text-white mb-4 w-full flex justify-center items-center gap-2"
                      >
                        <FaFacebookMessenger className=" text-2xl font-bold"></FaFacebookMessenger> Chat with owner
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
              {/* popular tags */}
              <div
                className="h-auto p-5 md:w-[416px] max-w-[416px] mt-3"
                style={{
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.09)",
                }}
              >
                <h2 className="text-3xl font-bold my-5">Popular Tags</h2>
                <div className="flex flex-wrap">
                  {property_tags?.map((tag) => (
                    <button
                      key={tag}
                      className="text-[#666666] p-2 mx-2 mb-3 w-fit h-auto bg-transparent hover:bg-[#ec3323] hover:text-white transition-all duration-500 border capitalize"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className=" ml-5 mt-5">
                {/* <div className=" flex items-center gap-2">
                  <Link to={`/dashboard/chat/${firstMember}`}>
                    <div onClick={handleSendChats}>
                    <FaFacebookMessenger className=" text-5xl font-bold text-[#002172]"></FaFacebookMessenger>
                    </div>
                  </Link>
                  <h2 className=" text-3xl font-bold">Chat with owner</h2>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
