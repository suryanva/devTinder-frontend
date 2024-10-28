import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((store) => store?.user?.data);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatedUserInfo = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/profile`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProfile = async () => {
    //Clear Errors
    const loadingToast = toast.loading("Updating Profile...");
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/updateUser`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        updatedUserInfo();

        toast.update(loadingToast, {
          render: res?.message || "Successfully Updated Profile!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      toast.update(loadingToast, {
        render:
          error?.response?.data?.error || "Update failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    user && (
      <>
        <div className="flex justify-center my-10">
          <div className="flex justify-center mx-10">
            <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name:</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <label className="form-control w-full max-w-xs my-2">
                      <div className="label">
                        <span className="label-text">Last Name:</span>
                      </div>
                      <input
                        type="text"
                        value={lastName}
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                    <div className="label">
                      <span className="label-text">Photo URL :</span>
                    </div>
                    <input
                      type="text"
                      value={photoUrl}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Age:</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Gender:</span>
                    </div>
                    <input
                      type="text"
                      value={gender}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">About:</span>
                    </div>
                    <input
                      type="text"
                      value={about}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>
                </div>
                <div className="card-actions justify-center m-2">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </>
    )
  );
};

export default EditProfile;
