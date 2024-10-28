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
            <button className={`btn btn-primary ${disabled ? "hidden" : ""}`}>
              Ignore
            </button>
            <button className={`btn btn-secondary ${disabled ? "hidden" : ""}`}>
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
