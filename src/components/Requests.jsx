import { useEffect, useState } from "react";
import axios from "axios";
import DecisionCard from "./DecisionCard";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "../utils/redux/requestsSlice";
import { toast } from "react-toastify";

const Requests = () => {
  const requests = useSelector((store) => store?.requests?.data);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(requests ? "success" : "loading");

  const getrequests = async () => {
    if (requests) return;
    setStatus("loading");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/requests/received`,
        { withCredentials: true }
      );
      dispatch(addRequests(response?.data));
      setStatus("success");
    } catch (error) {
      console.error(error);
      if (
        error.response?.status !== 404 ||
        error.response?.data?.error !== "No pending requests"
      ) {
        toast.error("Failed to load requests");
      }
      setStatus("error");
    }
  };

  useEffect(() => {
    getrequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return (
      <div className="h-dvh flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return <div className="h-dvh flex flex-col justify-center items-center">No requests found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Requests</h1>

      <div className="flex gap-4 min-w-max px-4">
        {requests &&
          requests.map((item) => (
            <div key={item?._id} className="flex-none w-96 h-auto">
              <DecisionCard
                user={typeof item?.fromUserId === "object" ? item.fromUserId : item?.toUserId}
                requestId={item?._id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Requests;
