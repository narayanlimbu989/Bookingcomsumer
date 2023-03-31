import React from "react";
import Layout from "./component/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/Searchpage";
import Singlepage from "./pages/Singlepage";
import SigninPage from "./pages/SigninPage";
import Signup from "./pages/SignUpPage";
import { useSelector } from "react-redux";
import Reserve from "./pages/Reservepage";
import Profilepage from "./pages/Profilepage";
import Nopage from "./pages/Nopage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/signin"
              element={
                <Guestarea>
                  <SigninPage />
                </Guestarea>
              }
            />
            <Route
              path="/signup"
              element={
                <Guestarea>
                  <Signup />
                </Guestarea>
              }
            />
            <Route
              path="/reserve"
              element={
                <Securearea>
                  <Reserve />
                </Securearea>
              }
            />
            <Route
              path="/profile"
              element={
                <Securearea>
                  <Profilepage />
                </Securearea>
              }
            />

            <Route path="/search/:id" element={<SearchPage />} />
            <Route path="/single/:id" element={<Singlepage />} />
            <Route path="*" element={<Nopage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const Guestarea = ({ children }) => {
  const { islogin } = useSelector((state) => state.auth);
  if (islogin) {
    return <Navigate to="/" />;
  }
  return children;
};

const Securearea = ({ children }) => {
  const { user, islogin } = useSelector((state) => state.auth);
  if (islogin && user !== null) {
    return children;
  }
  return <Navigate to="/signin" />;
};

export default App;
