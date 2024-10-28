import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequests } from "../utils/redux/requestsSlice";

const DecisionCard = ({ user, requestId }) => {
  const { age, firstName, lastName = "", photoUrl, gender, skills } = user;
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      await axios
        .post(
          `${
            import.meta.env.VITE_PUBLIC_URL
          }/api/v1/connections/review/${status}/${_id}`,
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response?.data?.message);
            dispatch(removeRequests(_id));
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="card card-side bg-base-300 shadow-xl p-2">
        <figure>
          <img className="rounded-lg" src={photoUrl} alt="Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + lastName}</h2>
          <p>{age + " " + gender + " " + skills}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary px-8"
              onClick={() => reviewRequests("accepted", requestId)}
            >
              Accept
            </button>
            <button
              className="btn btn-secondary px-8"
              onClick={() => reviewRequests("rejected", requestId)}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionCard;
