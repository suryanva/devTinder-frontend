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
    if (feed) return; // If feed already loaded, skip API call
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

  return (
    <div className=" flex justify-center mt-16">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
