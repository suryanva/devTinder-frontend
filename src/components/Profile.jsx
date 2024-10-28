import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const profile = useSelector((store) => store?.user?.data);
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-dvh bg-primary-300 p-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

      <div className="flex flex-col items-center bg-secondary-100 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center w-full">
          <figure className="mb-4 ">
            <img
              src={profile?.photoUrl}
              alt="profile"
              className="rounded-full w-24 h-24"
            />
          </figure>
          <Link to="/edit-profile">
            <button className="btn btn-error">Edit Profile</button>
          </Link>
        </div>
        <div className="w-full mb-4">
          <label htmlFor="about" className="block  font-semibold mb-2">
            About:
          </label>
          <textarea
            name="about"
            placeholder={profile?.about}
            className="textarea textarea-bordered w-full h-24"
            disabled
          />
        </div>
        <div className="w-full space-y-4 text-white">
          <div>
            <label htmlFor="email" className="block  font-semibold mb-2">
              Email:
            </label>
            <input
              name="email"
              type="text"
              placeholder={profile?.email}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block  font-semibold mb-2">
              First Name:
            </label>
            <input
              name="firstName"
              type="text"
              placeholder={profile?.firstName}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block  font-semibold mb-2">
              Last Name:
            </label>
            <input
              name="lastName"
              type="text"
              placeholder={profile?.lastName}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label htmlFor="age" className="block  font-semibold mb-2">
              Age:
            </label>
            <input
              name="age"
              type="number"
              placeholder={profile?.age}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label htmlFor="gender" className="block  font-semibold mb-2">
              Gender:
            </label>
            <input
              name="gender"
              type="text"
              placeholder={profile?.gender}
              className="input input-bordered w-full"
              disabled
            />
          </div>
          <div>
            <label htmlFor="skills" className="block  font-semibold mb-2">
              Skills:
            </label>
            <input
              name="skills"
              type="text"
              placeholder={profile?.skills?.join(", ")}
              className="input input-bordered w-full"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
