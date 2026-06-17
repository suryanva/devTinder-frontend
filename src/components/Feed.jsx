import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/redux/feedSlice.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed?.data);
  const [feedLoading, setFeedLoading] = useState(!feed);
  const [feedError, setFeedError] = useState(null);

  const getFeed = async (forceRefresh = false) => {
    if (!forceRefresh && feed) return;
    setFeedLoading(true);
    setFeedError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/getFeed`,
        { withCredentials: true }
      );
      dispatch(addFeed(response?.data));
    } catch (error) {
      console.log(error);
      if (error.code === "ECONNABORTED") {
        setFeedError("Server is taking too long. Try again.");
      } else {
        setFeedError("Failed to load feed. Please try again.");
      }
    } finally {
      setFeedLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (feedLoading) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-lg">Loading feed...</p>
      </div>
    );
  }

  if (feedError) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center mx-auto w-1/2">
        <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
        <p className="mb-4">{feedError}</p>
        <button onClick={() => getFeed(true)} className="btn btn-primary p-4 m-2">
          Retry
        </button>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center mx-auto w-1/2">
        <h1 className="text-2xl">No users to show</h1>
        <button onClick={() => getFeed(true)} className="btn btn-primary p-4 m-2">
          Get More Users
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-16">
      <UserCard disabled={false} user={feed[0]} />
    </div>
  );
};

export default Feed;
