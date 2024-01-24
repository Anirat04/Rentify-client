// Listing section initially created and structured by "Konika khan"
// Final touchup, add responsive design for all devices and pixel perfection by Tanbir

import useProperty from "../../../../../Hooks/useProperty";
import PropertyCard from "../../../../Shared/PropertyCards/PropertyCard";
import ButtonBlue from "../../../../Shared/buttons/Blue/ButtonBlue";

const Listing = () => {
  const [property] = useProperty();
//   console.log(property);

  return (
    <>
      <div className="max-w-[1296px] mx-auto mt-32 mb-[100px]">
        <div className="md:flex justify-between items-end mb-8 px-3 xl:px-0">
          <div>
            <h1 className="text-[#e33226] font-semibold text-base">
              Our Properties
            </h1>
            <p className="text-[40px] poppins-font font-bold">
              Latest House Listings
            </p>
          </div>
          <div className="w-[180px] hidden md:flex">
            <ButtonBlue
              titleBlue={"View All Property"}
              padX={"px-8"}
              padY={"py-4"}
            ></ButtonBlue>
          </div>
        </div>
       
        {/* individual property card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 xl:px-0">
          {property.slice(0,6).map((data) => (
            <PropertyCard property={data} key={property._id} />
          ))}
        </div>
        {/* individual property card */}
        <div className="w-[180px] mx-auto mt-7 flex md:hidden">
          <ButtonBlue
            titleBlue={"View All Property"}
            padX={"px-8"}
            padY={"py-4"}
          ></ButtonBlue>
        </div>
      </div>
    </>
  );
};

export default Listing;
