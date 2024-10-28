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
      <div className="mx-auto relative w-1/2">
        {/* Container with horizontal scroll */}
        <div className="w-full overflow-x-auto pb-4">
          {/* Inner flex container for items */}
          <div className="flex gap-4 min-w-max px-4">
            {connections.map((item) => (
              <div key={item._id} className="flex-none w-64 h-auto">
                <UserCard user={item} disabled={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Optional scroll buttons */}
        <button
          onClick={() => {
            const container = document.querySelector(".overflow-x-auto");
            container.scrollBy({ left: -200, behavior: "smooth" });
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
        >
          ←
        </button>
        <button
          onClick={() => {
            const container = document.querySelector(".overflow-x-auto");
            container.scrollBy({ left: 200, behavior: "smooth" });
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
        >
          →
        </button>
      </div>
    </>
  );
};

export default Connections;
