import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ButtonBlue from "../buttons/Blue/ButtonBlue";
// import ButtonRed from "../buttons/Red/ButtonRed";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isNavbarJumping, setIsNavbarJumping] = useState(false);
  const { userSignOut, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // for logout user -Sadia
  const handleLogOut = () => {
    userSignOut()
      .then(() => {
        console.log("logged out");
        // swal("Signout", "You are successfully signed out", "success");
        //sweet alert 2 added by Fahima
        Swal.fire({
          title: "You are successfully signed out",
          timer: 2000,
          color: "#002172",
          showConfirmButton: false,
          icon: "success",
        });
        setUser(null);

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // for jumping effect code -sadia
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const scrollThreshold = 100;

      setIsNavbarJumping(scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // when the user dont have a pro pic this pic will be shown
  const defaultImg =
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1696786604~exp=1696787204~hmac=c10645727b8724eecda4984ef1d8fbfba92a9c9072a57b851c28c9b1d8d62b81";

  const navLinks = (
    <>
      <NavLink
        to="/"
        className="navAfter relative font-medium text-base text-black mx-3"
      >
        Home
      </NavLink>
      <NavLink
        to="/all"
        className="navAfter relative font-medium text-base  text-black mx-3"
      >
        All Properties
      </NavLink>
      <NavLink
        to="/owners"
        className="navAfter relative font-medium text-base  text-black mx-3"
      >
        Owners
      </NavLink>
      <NavLink
        to="/blogs"
        className="navAfter relative font-medium text-base text-black mx-3"
      >
        Blogs
      </NavLink>


      {/* for others */}
      <div className="dropdown dropdown-hover relative h-[65px]">
        <div tabIndex={0} role="button" className="dropAfter relative font-medium text-base text-black mx-3 flex items-center h-full">Others</div>
        <ul className="menu dropdown-content z-[1] bg-white pl-5  w-[250px] border-[#e33226] border-l-[2px] rounded-[5px] py-0 absolute top-14">
          <NavLink
            to="/how-it-works"
            className="navAfter relative font-medium text-base text-black my-2"
          >
            How it works
          </NavLink>
          <NavLink
            to="/testimonials"
            className="navAfter relative font-medium text-base text-black my-2"
          >
            Testimonials
          </NavLink>
          <NavLink
            to="/contact"
            className="navAfter relative font-medium text-base text-black my-2"
          >
            Contact with us
          </NavLink>
          <NavLink
            to="/privacy"
            className="navAfter relative font-medium text-base text-black my-2"
          >
            Our Privacy
          </NavLink>
          <NavLink
            to="/conditions"
            className="navAfter relative font-medium text-base text-black my-2"
          >
            Terms & Conditions
          </NavLink>
          <NavLink
            to="/faq"
            className="navAfter relative font-medium text-base text-black  my-2"
          >
            FAQ
          </NavLink>
        </ul>
      </div>
    </>
  );

  return (
    // Please don't change the z-index, added by -Tanbir
    <div
      className={` bg-base-100  sticky top-0 left-0 z-[99999] ${isNavbarJumping ? "animate-jump shadow-md" : ""
        }`}
    >
      <div className="navbar max-w-screen-2xl mx-auto bg-base-100 px-0 py-2">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="main-nav menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/">
            <div className="flex  items-center">
              <img
                className="w-[60px] md:w-full"
                src="https://i.ibb.co/GsQpf2D/logo.png"
              />
              <h4 className="font-bold poppins-font text-2xl lg:text-[38px] ml-2 text-[#002172]">
                Renti<span className="text-[#e33226]">fy</span>
              </h4>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex min-h-full">
          <ul className="menu menu-horizontal px-1  flex items-center py-0">{navLinks}</ul>
        </div>

        {/* for toggle feature for btn -sadia */}
        <div className="navbar-end gap-5 lg:gap-0">
          {user && (
            <div className="dropdown dropdown-end">
              <div>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      // src={user?.photoURL}
                      src={`${user?.photoURL ? user?.photoURL : defaultImg}`}
                    />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      {user.displayName ? user.displayName : "anonymous"}
                    </a>
                  </li>
                  <li>
                    <a>{user.email ? user.email : "anonymous@example.com"}</a>
                  </li>
                  {/* {console.log("js diye aslm", user.photoURL)} */}
                  <li>
                    <Link to="/dashboard/userProfile">Dashboard</Link>
                  </li>
                  <li>
                    <a href="http://localhost:5174/" target="blank">Admin Panel</a>
                  </li>
                  <li>
                    <Link onClick={handleLogOut}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div>
            {user ? (
              ""
            ) : (
              <>
                <div className="flex items-center">
                  <Link to="/login">
                    <ButtonBlue titleBlue={"Log In"} />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
// comment for checking
