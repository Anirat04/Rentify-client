//component by "Fahima"
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";
import useReviews from "../../../Hooks/useReviews";

const ReviewForm = ({ property }) => {
  const { user } = useAuth();
  const [images, setImages] = useState([])
  const [showImages, setShowImages] = useState([])
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useReviews();

  //destructuring
  const { _id, property_info } = property || {};
  const { displayName, email, photoURL } = user || {};

  //images hosting to imgbb
  const image_hosting_api =
    "https://api.imgbb.com/1/upload?key=bd58c2cacfaf8bbacf4ee63a9bafe25c";

  {  //
    // multiple images //
    // const [uploadedImages, setUploadedImages] = useState([]);
    // console.log(uploadedImages);
    // const handleFileChange = async (event) => {
    //   const files = event.target.files;

    //   const formData = new FormData();

    //   for (let i = 0; i < files.length; i++) {
    //     formData.append("image", files[i]);
    //   }

    //   try {
    //     const response = await axiosPublic.post(image_hosting_api, formData);

    //     // Extract the uploaded image URLs from the response
    //     const dataNew = response.data.data;
    //     const newUploadedImages = dataNew.map((image) => image.url);

    //     // Update state with the new uploaded images
    //     setUploadedImages((prevImages) => [...prevImages, ...newUploadedImages]);
    //   } catch (error) {
    //     console.error("Error uploading images:", error);
    //   }
    // };
    //
    //
  }

  // onFileSelect added for immediately show pic and host img on imgbb
  const onFileSelect = (event) => {
    event.preventDefault();
    const files = event.target.files;
    setImages(files[0])
    console.log(files)

    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!showImages.some((e) => e.name === files[i].name)) {
        setShowImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i])
          }
        ])
      }
    }
  }

  //review form
  const { register, reset, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // console.log("review pic", data.image);
    const imageFile = { image: images };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageUrl = res.data.data.display_url;
    if (user) {
      //for saving property data to backend
      const review = {
        propertyId: _id,
        propertyTitle: property_info.property_title,
        reviewerEmail: email,
        reviewerName: displayName,
        reviewerImage: photoURL,
        reviewText: data.message,
        reviewImage: imageUrl,
        reviewRating: data.rating,
        date: new Date().toLocaleDateString("en-GB"),
      };
      console.log(review)
      axiosSecure.post("/reviews", review).then((response) => {
        Swal.fire({
          title: `Thanks for your valuable review`,
          timer: 2000,
          color: "#002172",
          showConfirmButton: false,
          icon: "success",
        });
        reset();
        refetch();
        setShowImages([])
      });
      console.log(review);
    } else {
      // this login will allow user to add booking for their desired property only if they are user.
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
      <div className="shadow-xl h-auto w-full p-10 bg-[#F9F9F9]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* div for rating and image upload */}
          {/* errors will return when field validation fails  */}
          <textarea
            {...register("message")}
            className="textarea h-40 w-full mt-3 mb-4"
            placeholder="Please enter your review"
            required
          ></textarea>
          {/* div for rating and image upload */}
          <div className="flex justify-between items-center my-5">
            <div className="text-[#666666] flex flex-col">
              <p className="mb-2">Your ratings for this property</p>
              {/* rating select felid updated by sojib */}
              <select
                {...register("rating")}
                name="rating"
                required
                className="select select-bordered w-full text-xl font-bold"
              >
                <option value="1"> 1</option>
                <option value="2"> 2</option>
                <option value="3"> 3</option>
                <option value="4"> 4</option>
                <option value="5"> 5</option>
              </select>
            </div>
            {/* upload image felid updated by sojib*/}
            <div className="mt-4">
              {
                showImages[0] ?
                  <div className=" flex justify-center flex-wrap items-center gap-2 border-2 rounded-md p-2">
                    {
                      showImages.map((item, index) =>
                        <div key={index}>
                          <img className=" w-[100px] h-[100px]" src={item.url} alt="Drop img" />
                        </div>)
                    }
                  </div> :
                  <label className=" rounded px-8 py-4 mt-3 bg-[#EC3323] hover:bg-[#002172] text-white mb-4">
                    Upload Image
                    <input
                      type="file"
                      required
                      className="hidden"
                      {...register("files")}
                      // multiple
                      onChange={onFileSelect}
                    />
                  </label>
              }
              {
              /* 
              <div className="my-3">
                <p>Selected Images:</p>
                {uploadedImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Uploaded Image ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      marginRight: "10px",
                    }}
                  />
                ))}
              </div> */
              }
            </div>
          </div>
          {/* <div className=" my-3 flex justify-start items-center gap-3">
            <input type="checkbox" className="checkbox" />
            <p className=" text-xl text-gray-400">
              Save my name, email, website address in this browser for the next
              time I comment.
            </p>
          </div> */}
          <input
            type="submit"
            value="Submit Review"
            className=" rounded px-8 py-4 mt-3 bg-[#EC3323] hover:bg-[#002172] text-white mb-4"
          />
        </form>
      </div>
    </>
  );
};
export default ReviewForm;
