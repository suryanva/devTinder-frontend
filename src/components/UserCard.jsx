import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/redux/feedSlice";

const UserCard = ({ user, disabled }) => {
  const {
    about = "N/A",
    age,
    firstName,
    lastName = "",
    photoUrl,
    gender,
    skills,
    _id,
  } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios
        .post(
          `${
            import.meta.env.VITE_PUBLIC_URL
          }/api/v1/connections/send/${status}/${userId}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          // Update the state with the new connections
          dispatch(removeFeed(userId));
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="card glass w-96">
        <figure>
          <img src={photoUrl} alt="profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{about}</p>
          <p>{age}</p>
          <p>{gender}</p>
          {skills && (
            <div className="flex space-x-2 ">
              {skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          )}
          <div className="card-actions justify-around">
            <button
              className={`btn btn-primary ${disabled ? "hidden" : ""}`}
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className={`btn btn-secondary ${disabled ? "hidden" : ""}`}
              onClick={() => handleSendRequest("interested", _id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
