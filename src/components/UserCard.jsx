const UserCard = ({ user }) => {
  const {
    about,
    age,
    firstName,
    lastName = "",
    photoUrl,
    gender = "N/A",
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
