import { NavLink } from "react-router-dom";
import useProperties from "../../../../../Hooks/useProperties";
import './Popular.css'
import DynamicCards from "./DynamicCards";


const Dynamic = () => {

    const [properties] = useProperties();
   const cityProperties = properties.filter(property => property?.property_info.property_location.address.city === 'New York City')
   
   console.log(cityProperties)

    // console.log(properties)

    return (
        <div>
        {/* banner section */}
        <div className="dynamicbgimg">
                <div className=" bg-[#000000B2]">
                    <div className=" max-w-screen-2xl mx-auto py-24">
                        <h2 className="text-6xl font-bold text-white font-serif">All Properties</h2>
                        <div className="mt-2">
                            <NavLink to='/' className='navAfter relative font-medium text-base text-white mx-3'>Home</NavLink>
                            <NavLink to='/blogs' className='navAfter relative font-medium text-base text-white mx-3'>Blogs</NavLink>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div>
              {
                cityProperties?.map((property) => <DynamicCards key={property._id} property={property}></DynamicCards>)
              }
            </div>
        </div>
    );
};

export default Dynamic;

 