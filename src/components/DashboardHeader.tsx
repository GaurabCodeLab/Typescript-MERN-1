// interface DashboardHeaderProps {
//   userName: string;
//   onLogout: () => void;
// }

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import type { Person } from "../types/person";
import { usePersonLogoutMutation } from "../redux/api/personApi";
import { useNavigate } from "react-router-dom";
import { removePerson } from "../redux/slices/personSlice";

const DashboardHeader = () => {
  const person = useSelector<RootState, Person | null>(
    (state) => state.person.personDetails,
  );

  const [logout, { isLoading }] = usePersonLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(removePerson());
      navigate("/");
    } catch (error) {
      console.error("Error in logout: " + error);
    }
  };

  return (
    <header className="bg-blue-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold">React: CRUD Application</h1>
      <div className="flex items-center gap-4">
        <span className="text-white font-medium">
          Welcome, {person && person.name}
        </span>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold cursor-pointer"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out" : "Logout"}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
