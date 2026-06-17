import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { addConnection } from "../utils/redux/connectionSlice";
import { toast } from "react-toastify";

const Connections = () => {
  const connections = useSelector((store) => store?.connection?.data);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(connections ? "success" : "loading");

  const getConnections = async () => {
    if (connections) return;
    setStatus("loading");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/myConnections`,
        { withCredentials: true }
      );
      dispatch(addConnection(response.data));
      setStatus("success");
    } catch (error) {
      console.error(error);
      toast.error("Failed to load connections");
      setStatus("error");
    }
  };

  useEffect(() => {
    getConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return (
      <div className="h-dvh flex flex-col justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return <div className="h-dvh flex flex-col justify-center items-center">No connections found</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Connections</h1>

      <div className="flex overflow-x-scroll space-x-4 snap-x w-full p-4 ">
        {connections.map((item) => (
          <div key={item._id} className="shrink-0 snap-start">
            <UserCard user={item} disabled={true} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Connections;
