import React, { useState } from "react";
import MetaHeaderchanger from "../component/MetaHeaderchanger";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { api } from "../Service/Httpservice";
import { useDispatch } from "react-redux";
import { setauth } from "../Store/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SigninPage = () => {
  const dispatch = useDispatch();
  const link = useNavigate();
  const [load, setload] = useState(false);
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  });
  const postinputs = (e) => {
    setinputs((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const calldata = async (e) => {
    e.preventDefault();
    if (!inputs.password || !inputs.username)
      return toast.error("please fill data properly");
    setload(true);
    try {
      const { data } = await api.post("/users/api/login", inputs);
      if (data.authenticate) {
        dispatch(setauth(data));
        localStorage.setItem("customer", JSON.stringify(data));
        toast.success("login success");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
    } finally {
      setload(false);
    }
  };
  return (
    <>
      <MetaHeaderchanger title="Login" />
      <div className="authenticatuin-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-container d-flex flex-column gap-2 justify-content-center align-items-center">
                <div className="authenticate p-4 border rounded">
                  <h2>
                    Sign In{" "}
                    <HiOutlineArrowNarrowRight style={{ color: "#fe831e" }} />
                  </h2>
                  <form className="d-flex flex-column">
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      id="username"
                      className="p-1"
                      name="username"
                      value={inputs.username}
                      onChange={postinputs}
                    />

                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      id="password"
                      className="p-1"
                      name="password"
                      value={inputs.password}
                      onChange={postinputs}
                    />
                    {load ? (
                      <button>
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </button>
                    ) : (
                      <button onClick={calldata} className="my-2 p-1">
                        sign In
                      </button>
                    )}
                  </form>
                  <p>Forgot password?</p>
                  <h5>
                    Create an account?{" "}
                    <span
                      onClick={() => link("/signup")}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Sign up
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
