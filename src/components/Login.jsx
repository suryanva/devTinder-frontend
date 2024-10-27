import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("mason.williams@example.com");
  const [password, setPassword] = useState("masonpassword321");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Make API call to login with email and password
    // On successful login, redirect to profile page
    const loadingToast = toast.loading("Logging in...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      toast.update(loadingToast, {
        render: "Successfully logged in!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.update(loadingToast, {
        render:
          error.response?.data?.error || "Login failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-dvh flex justify-center items-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="space-y-2">
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="email"
                value={email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-center mt-2">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
