import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import { addConnection } from "../utils/redux/connectionSlice";
import { useRef } from "react";

const Connections = () => {
  const connections = useSelector((store) => store?.connection?.data);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const getConnections = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/myConnections`, {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(addConnection(response.data));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) {
    return <div>Loading...</div>;
  }

  if (connections.length === 0) {
    return <div>No connections found</div>;
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
