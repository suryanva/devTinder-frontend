import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/redux/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.update(loadingToast, {
          render: response?.data?.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(loadingToast, {
        render: "Logout failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      dispatch(removeUser());
      navigate("/login");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []); // Run only once when component mounts

  return <div>Logging out...</div>;
};

export default Logout;
