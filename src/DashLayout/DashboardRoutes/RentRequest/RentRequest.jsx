import useOwnerRent from "../../../Hooks/useOwnerRent";
import RentRequestCard from "./RentRequestCard";

const RentRequest = () => {
    const [ownerRent] = useOwnerRent()
    console.log(ownerRent);
    return (
        <>

            {
                ownerRent.map(item => (

                    <RentRequestCard key={item._id} items={item}></RentRequestCard>
                ))
            }
        </>
    );
};

export default RentRequest;