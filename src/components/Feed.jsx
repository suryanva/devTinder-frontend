import { useDispatch } from "react-redux";
import { addFeed } from "../utils/redux/feedSlice.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed?.data);
  const getFeed = async () => {
    // If feed already loaded, skip API call
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/getFeed`,
        { withCredentials: true }
      );
      dispatch(addFeed(response?.data));
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center mx-auto w-1/2">
        <h1 className="text-2xl">No users to show</h1>
        <button onClick={getFeed} className=" btn btn-primary p-4 m-2">
          Get More Users
        </button>
      </div>
    );
  }

  return (
    <div className=" flex justify-center mt-16">
      <UserCard disabled={false} user={feed[0]} />
    </div>
  );
};

export default Feed;
