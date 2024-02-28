//component added by "Fahima"

import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import useOwners from "../../../Hooks/useOwners";
import OwnerCard from "./OwnerCard";
import { Helmet } from "react-helmet";
import PageBanner from "../../Shared/banner for pages/PageBanner";

const OwnerList = () => {
  //get owner data
  const [owners] = useOwners();
  console.log(owners);

  return (
    <>
      <Helmet>
        <title>Rentify | Owners</title>
      </Helmet>
      <div>
        <PageBanner
          img={"https://i.ibb.co/Zdk0mLj/breadcrumb-4.jpg"}
          heading={"Owner List"}
          title={"Owners"}
        />
        <div className="p-20 grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center items-center">
          {/* agents */}
          {owners.map((owner) => (
            <OwnerCard owner={owner} key={owner._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OwnerList;
