import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/redux/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [authLoading, setAuthLoading] = useState(!userData);
  const [authError, setAuthError] = useState(null);

  const fetchUser = async () => {
    if (userData) return;
    setAuthError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/profile`,
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      setAuthLoading(false);
    } catch (error) {
      console.error(error);
      if (error.code === "ECONNABORTED") {
        setAuthError("Server is taking too long to respond. Please try again.");
        setAuthLoading(false);
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authLoading) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-lg">Connecting to server...</p>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center bg-base-200">
        <h2 className="text-xl font-semibold mb-4">Connection Issue</h2>
        <p className="mb-4">{authError}</p>
        <button onClick={fetchUser} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
