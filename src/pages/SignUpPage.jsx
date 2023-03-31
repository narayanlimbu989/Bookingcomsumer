import React, { useState } from "react";
import MetaHeaderchanger from "../component/MetaHeaderchanger";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../Service/Httpservice";
const Signup = () => {
  const link = useNavigate();
  const [load, setload] = useState(false);
  const [err, seterr] = useState("");
  const [inputs, setinputs] = useState({
    username: "",
    phone: "",
    fullname: "",
    email: "",
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
    if (
      !inputs.username ||
      !inputs.phone ||
      !inputs.password ||
      !inputs.fullname ||
      !inputs.email
    )
      return toast.error("all field required");
    setload(true);
    try {
      const { data } = await api.post("/users/api/register", inputs);
      if (data.register) {
        link("/signin");
        toast.success("successfully register");
      } else {
        seterr(data.message);
      }
    } catch (error) {
    } finally {
      setload(false);
    }
  };
  return (
    <>
      <MetaHeaderchanger title="create account" />
      <div className="authenticatuin-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-container d-flex flex-column gap-2 justify-content-center align-items-center">
                <div className="authenticate p-4 border rounded">
                  <h2>
                    Sign Up{" "}
                    <HiOutlineArrowNarrowRight style={{ color: "#fe831e" }} />
                  </h2>
                  <form className="d-flex flex-column">
                    <label htmlFor="Fullname">Fullname</label>
                    <input
                      className="p-1"
                      type="text"
                      id="Fullname"
                      name="fullname"
                      value={inputs.fullname}
                      onChange={postinputs}
                    />

                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      className="p-1"
                      onClick={() => seterr("")}
                      id="username"
                      name="username"
                      value={inputs.username}
                      onChange={postinputs}
                    />
                    {err && <p className="mb-0 text-danger">{err}</p>}

                    <label htmlFor="Email">Email</label>
                    <input
                      type="text"
                      id="Email"
                      className="p-1"
                      name="email"
                      value={inputs.email}
                      onChange={postinputs}
                    />

                    <label htmlFor="phone">phone</label>
                    <input
                      type="text"
                      className="p-1"
                      id="phone"
                      name="phone"
                      value={inputs.phone}
                      onChange={postinputs}
                    />

                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      className="p-1"
                      id="password"
                      name="password"
                      value={inputs.password}
                      onChange={postinputs}
                    />
                    {load ? (
                      <button>
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </button>
                    ) : (
                      <button onClick={calldata} className="my-2 p-1">
                        create account
                      </button>
                    )}
                  </form>
                  <h5>
                    Already have an account?{" "}
                    <span
                      onClick={() => link("/signin")}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Sign in
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

export default Signup;
