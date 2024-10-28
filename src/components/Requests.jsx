import { useEffect } from "react";
import axios from "axios";
import DecisionCard from "./DecisionCard";
import { useSelector, useDispatch } from "react-redux";
import { addRequests } from "../utils/redux/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store?.requests?.data);
  const dispatch = useDispatch();

  const getrequests = async () => {
    try {
      await axios
        .get(
          `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/requests/received`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          dispatch(addRequests(response?.data));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getrequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <div>No requests found</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Requests</h1>

      <div className="flex gap-4 min-w-max px-4">
        {requests &&
          requests.map((item) => (
            <div key={item?._id} className="flex-none w-96 h-auto">
              <DecisionCard
                user={item?.fromUserId || item?.toUserId}
                requestId={item?._id}
              />
            </div>
          ))}
      </div>

      {/* {console.log(requests[0]._id)} */}
    </>
  );
};

export default Requests;
