import React, { useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import {
  MdLocalHotel,
  MdOutlineOfflinePin,
  MdOutlineAddBusiness,
  MdLocationOn,
} from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { setlogout } from "../Store/Slices/authSlice";

const Header = () => {
  const { user, islogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const link = useNavigate();
  const [place, setplace] = useState("");

  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    if (!place) return;
    navigate(`/search/city=${place}`);
  };
  const signinlogout = () => {
    if (islogin) {
      confirmAlert({
        title: "Logout",
        message: "Are you sure you want to logout?.",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              localStorage.clear();
              dispatch(setlogout());
            },
          },
          {
            label: "No",
          },
        ],
      });
    } else {
      link("/signin");
    }
  };
  const handleprofile = () => {
    if (islogin && user !== null) {
      link("/profile");
    } else {
      link("/signin");
    }
  };
  return (
    <>
      <header className="header header-top-strip py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Get upto 25% OFF.</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                <a className="text-white" href="tel:+977 9818463950">
                  booknify@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="headermobile row d-flex align-items-center justify-content-between">
            <div className="col-2 headerlogo">
              <h2>
                <Link to="/" className="text-white">
                  Book<span style={{ color: "#fea41e" }}>nify</span>
                </Link>
              </h2>
            </div>
            <form className="col-8 headersearch bg-white">
              <div className="headersearchitem px-2 col-10">
                <MdLocationOn
                  className="headericon"
                  style={{ color: " #fe831e" }}
                />
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setplace(e.target.value)}
                  placeholder="Where are you going?"
                />
              </div>
              <button className="col-2" type="submit" onClick={search}>
                search
              </button>
            </form>
            <div className="col-2">
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-2 text-white">
                <div
                  className="dropdownlogout"
                  style={{ cursor: "pointer" }}
                  onClick={handleprofile}
                >
                  <span>Hello, {user ? user.username : "sign In"}</span>
                  <h6>Accounts</h6>
                  <button
                    onClick={signinlogout}
                    className="dropdown-contentlogout"
                  >
                    {islogin ? "Sign out" : "Sign In"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-lower py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center justify-cuntent-center gap-3">
                <div className="menu-links">
                  <div className="d-flex gap-3">
                    <NavLink
                      to="/"
                      className="header-lower-links text-white d-flex align-items-center gap-2 activepage"
                    >
                      <MdLocalHotel /> Stays
                    </NavLink>

                    <a
                      href="https://bookingadmin.onrender.com"
                      className="header-lower-links text-white d-flex align-items-center gap-2"
                    >
                      <MdOutlineAddBusiness /> start Business
                    </a>
                    <NavLink
                      to="/reserve"
                      className="header-lower-links text-white d-flex align-items-center gap-2"
                    >
                      <MdOutlineOfflinePin /> My Reservation
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
