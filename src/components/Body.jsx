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
  const fetchUser = async () => {
    if (userData) return;
    // Make API call to fetch user profile data
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/profile`,
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
    } catch (error) {
      // If user is not authenticated, redirect to login page
      navigate("/login");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
