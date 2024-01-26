// Listing section initially created and structured by "Konika khan"
// data get from database it's worked by sojib
// Final touchup, add responsive design for all devices and pixel perfection by Tanbir

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import PropertyCard from "../../../../Shared/PropertyCards/PropertyCard";
import ButtonBlue from "../../../../Shared/buttons/Blue/ButtonBlue";
import useProperties from "../../../../../Hooks/useProperties";

const Listing = () => {
    // properties data get from database
    const [properties] = useProperties();
    // const [properties, Setproperties] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);

    const apartment = properties.filter(
        (item) => item.property_info.property_category === "Apartment"
    );
    const Commercial = properties.filter(
        (item) => item.property_info.property_category === "Commercial"
    );
    const Residential = properties.filter(
        (item) => item.property_info.property_category === "Residential"
    );
    // console.log(apartment)

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
                <div>
                    {/* This tab part make by raknuzzaman sojib */}
                    <Tabs
                        defaultIndex={tabIndex}
                        onSelect={(index) => setTabIndex(index)}
                    >
                        <TabList>
                            <Tab>Residential</Tab>
                            <Tab>Commercial</Tab>
                            <Tab>Apartment</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 xl:px-0">
                                {Residential.slice(0, 6).map((property, index) => (
                                    <div key={index}>
                                        <PropertyCard
                                            property={property}
                                            details_path={"/details"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 xl:px-0">
                                {Commercial.slice(0, 6).map((property, index) => (
                                    <div key={index}>
                                        <PropertyCard
                                            property={property}
                                            details_path={"/details"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 xl:px-0">
                                {apartment.slice(0, 6).map((property, index) => (
                                    <div key={index}>
                                        <PropertyCard
                                            property={property}
                                            details_path={"/details"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
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

{
    /* <PropertyCard
  img={"https://angular.hibootstrap.com/enuf/assets/img/property/property-2.jpg"}
  details_path={'/details'}
  />
  <PropertyCard
  img={"https://angular.hibootstrap.com/enuf/assets/img/property/property-3.jpg"}
  details_path={'/details'}
  />
  <PropertyCard
  img={"https://angular.hibootstrap.com/enuf/assets/img/property/property-3.jpg"}
  details_path={'/details'}
  />
  <PropertyCard
  img={"https://angular.hibootstrap.com/enuf/assets/img/property/property-2.jpg"}
  details_path={'/details'}
  />
  <PropertyCard
  img={"https://angular.hibootstrap.com/enuf/assets/img/property/property-10.jpg"}
  details_path={'/details'}
  /> */
}
