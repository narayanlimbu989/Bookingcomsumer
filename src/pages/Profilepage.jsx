import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { api } from "../Service/Httpservice";
import { setauth, setlogout } from "../Store/Slices/authSlice";

const Profilepage = () => {
  const { user } = useSelector((s) => s.auth);
  const [openchangepassword, setopenchangepassword] = useState(false);
  const [openprofile, setopenprofile] = useState(false);
  const [password, setpassword] = useState({});
  const [profile, setprofile] = useState({});

  const dispatch = useDispatch();

  const savepassword = (e) => {
    setpassword((pre) => ({
      ...pre,
      [e.target.id]: e.target.value,
    }));
  };

  const saveprofile = (e) => {
    setprofile((pre) => ({
      ...pre,
      [e.target.id]: e.target.value,
    }));
  };

  const postpassword = async (e) => {
    e.preventDefault();
    try {
      if (
        password.currentpassword ||
        password.newpassword ||
        password.confirmpassword
      ) {
        (async () => {
          const { data } = await api.post(
            "/users/api/changepassword",
            password
          );
          if (data.change) {
            localStorage.clear();
            dispatch(setlogout());
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })();
      }
      return;
    } catch (error) {
    } finally {
      setopenchangepassword(!openchangepassword);
      password.currentpassword = "";
      password.newpassword = "";
      password.confirmpassword = "";
    }
  };

  const postprofile = async (e) => {
    e.preventDefault();
    try {
      if (profile.fullname || profile.email || profile.phone) {
        (async () => {
          const { data } = await api.patch(
            `/users/api/update/${user.id}`,
            profile
          );
          if (data.userinfo) {
            dispatch(setauth(data));
            toast.success(data.message);
          }
        })();
      }
      return;
    } catch (error) {
    } finally {
      setopenprofile(!openprofile);
      profile.fullname = "";
      profile.email = "";
      profile.phone = "";
    }
  };

  return (
    <div className="py-5 backgroundchange">
      <div className="container-xxl bg-white border p-5 rounded  d-flex justify-content-center">
        <div className="row">
          <div className="col-4 d-flex flex-column align-items-center">
            <img
              width="200px"
              src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png"
              alt="profile"
            />
            <h4>{user?.username}</h4>
          </div>
          <div className="col-8 d-flex flex-column gap-4">
            <div>
              <h4 className="d-flex gap-2">
                profile{" "}
                <FiEdit
                  onClick={() => setopenprofile(!openprofile)}
                  className="edit"
                />
              </h4>
              {openprofile ? (
                <div className="change">
                  <form className="d-flex flex-column gap-2">
                    <input
                      className="p-2"
                      type="text"
                      autoComplete="off"
                      id="fullname"
                      value={profile.fullname}
                      onChange={saveprofile}
                      placeholder="Full Name"
                    />
                    <input
                      className="p-2"
                      id="email"
                      value={profile.email}
                      onChange={saveprofile}
                      type="text"
                      placeholder="Email"
                    />
                    <input
                      className="p-2"
                      id="phone"
                      value={profile.phone}
                      onChange={saveprofile}
                      type="text"
                      placeholder="phone"
                    />
                    <button className="px-4" onClick={postprofile}>
                      save
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <p className="mb-0">{user?.email}</p>
                  <p className="mb-0">{user?.fullname}</p>
                  <p className="mb-0">+977 {user?.phone}</p>
                </>
              )}
            </div>

            <div>
              <h4 className="d-flex gap-2">
                change password{" "}
                <FiEdit
                  className="edit"
                  onClick={() => setopenchangepassword(!openchangepassword)}
                />
              </h4>
              {openchangepassword && (
                <div className="change">
                  <form className="d-flex flex-column gap-2">
                    <input
                      className="p-2"
                      type="text"
                      id="currentpassword"
                      value={password.currentpassword}
                      onChange={savepassword}
                      placeholder="current password"
                    />
                    <input
                      className="p-2"
                      type="text"
                      id="newpassword"
                      value={password.newpassword}
                      onChange={savepassword}
                      placeholder="New password"
                    />
                    <input
                      className="p-2"
                      type="text"
                      id="confirmpassword"
                      value={password.confirmpassword}
                      onChange={savepassword}
                      placeholder="confirm password"
                    />
                    <button className="px-4" onClick={postpassword}>
                      save
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
