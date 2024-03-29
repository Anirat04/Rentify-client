// this code by konika
import useRentOutProperties from "../../../Hooks/useRentOutProperties";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import { HiHomeModern } from "react-icons/hi2";
import { FcHome } from "react-icons/fc";
import { FaMoneyCheckAlt } from "react-icons/fa";

const RentOutProperties = () => {
  const [rentOutProperties] = useRentOutProperties();
  // console.log(rentOutProperties);
  const [tabIndex, setTabIndex] = useState(0);

  const Residential = rentOutProperties.filter(
    (item) => item.property_category == "Residential"
  );
  const Commercial = rentOutProperties.filter(
    (item) => item.property_category == "Commercial"
  );
  const Apartment = rentOutProperties.filter(
    (item) => item.property_category == "Apartment"
  );
  console.log(Residential);

  const totalTransactions = rentOutProperties.reduce(
    (total, property) => total + Number(property.price),
    0
  );

  return (
    <>
      <section className="py-1 bg-[#f3f3f3] w-full min-h-screen">
        <div className=" flex gap-8 mx-auto py-5 w-[93%]">
          <div className="flex bg-white text-lg shadow-md  py-77 px-5 items-center justify-between gap-6 w-80 rounded-2xl">
            <div>
              <h1 className="font-bold">{rentOutProperties.length}</h1>
              <h1>Total Sold Properties</h1>
            </div>
            <div className="bg-[#002172] text-white rounded-xl p-4">
              <HiHomeModern />
            </div>
          </div>
          <div className="flex bg-white shadow-md text-lg py-7 px-5 items-center justify-between gap-6 w-80 rounded-2xl">
            <div className="">
              <h1 className="font-bold">{Number(totalTransactions)}</h1>
              <h1>Total Transactions</h1>
            </div>
            <div className="bg-[#002172] text-white rounded-xl p-4">
              <FaMoneyCheckAlt />
            </div>
          </div>
          <div className="flex bg-white py-7 shadow-md  px-10 items-center justify-between gap-20 w-[880px] rounded-2xl">
            <div className="text-6xl">
              <FcHome />
            </div>
            <div className="text-lg">
              <h1 className="font-bold">INFORMATION</h1>
              <h1>
              Rent Out transforms real estate transactions by connecting buyers and sellers seamlessly, facilitating personalized property matches based on preferences and requirements.
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[93%] mx-auto my-3  bg-white  px-6 py-5   shadow-lg rounded-lg">
          <div className="overflow-x-auto">
            <Tabs
              defaultIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList className="ml-[2px]">
                <Tab>All Sold Properties</Tab>
                <Tab>Residential</Tab>
                <Tab>Commercial</Tab>
                <Tab>Apartment</Tab>
              </TabList>
              <TabPanel>
                <table className="table table-zebra">
                  {/* head */}
                  <thead className="font-semibold text-lg text-[#002172]">
                    <tr>
                      <th>Property Info</th>
                      <th>Buyer-Email</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>transactionId</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentOutProperties.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={item.property_img} />
                              </div>
                            </div>

                            <div className="font-bold">
                              {item.property_title}
                            </div>
                          </div>
                        </td>
                        <td>{item.paymentUser}</td>
                        <td>{item.price}</td>
                        <td>{item.date}</td>
                        <td className="text-[#e33226]">
                          {item.property_status}
                        </td>
                        <td>{item.transactionId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel>
                <div className="">
                  <div>
                    <table className="table table-zebra">
                      <thead className="font-semibold text-lg text-[#002172]">
                        <tr>
                          <th>Property Info</th>
                          <th>Buyer-Email</th>
                          <th>Price</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>transactionId</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Residential.map((property, index) => (
                          <tr key={index}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img src={property.property_img} />
                                  </div>
                                </div>

                                <div className="font-bold">
                                  {property.property_title}
                                </div>
                              </div>
                            </td>
                            <td>{property.paymentUser}</td>
                            <td>{property.price}</td>
                            <td>{property.date}</td>
                            <td className="text-[#e33226]">
                              {property.property_status}
                            </td>
                            <td>{property.transactionId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="">
                  <div>
                    <table className="table table-zebra">
                      {/* head */}
                      <thead className="font-semibold text-lg text-[#002172]">
                        <tr>
                          <th>Buyer-Email</th>
                          <th>Price</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>transactionId</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Commercial.slice(0, 6).map((property, index) => (
                          <tr key={index}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img src={property.property_img} />
                                  </div>
                                </div>

                                <div className="font-bold">
                                  {property.property_title}
                                </div>
                              </div>
                            </td>
                            <td>{property.paymentUser}</td>
                            <td>{property.price}</td>
                            <td>{property.date}</td>
                            <td className="text-[#e33226]">
                              {property.property_status}
                            </td>
                            <td>{property.transactionId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="">
                  <div>
                    <table className="table table-zebra">
                      {/* head */}
                      <thead className="font-semibold text-lg text-[#002172]">
                        <tr>
                          <th>Buyer-Email</th>
                          <th>Price</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>transactionId</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Apartment.slice(0, 6).map((property, index) => (
                          <tr key={index}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img src={property.property_img} />
                                  </div>
                                </div>

                                <div className="font-bold">
                                  {property.property_title}
                                </div>
                              </div>
                            </td>
                            <td>{property.paymentUser}</td>
                            <td>{property.price}</td>
                            <td>{property.date}</td>
                            <td className="text-[#e33226]">
                              {property.property_status}
                            </td>
                            <td>{property.transactionId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default RentOutProperties;
