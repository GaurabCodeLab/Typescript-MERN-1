import {
  useFetchUsersQuery,
  useDeleteUserMutation,
} from "../redux/api/userApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Home = () => {
  const { isLoading, data } = useFetchUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Do you want to delete the user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id)
          .unwrap()
          .then(() => {
            Swal.fire({
              icon: "success",
              text: "user deleted successfully",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              text: error.message || "Error in deleting user",
            });
          });
      }
    });
  };

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="w-[95%] mx-auto">
      <div className="my-3 flex justify-end pe-5">
        <Link to="/create">
          <button className=" bg-green-600 px-2 py-1 rounded-md cursor-pointer text-white font-bold">
            Add User
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Hobbies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Book
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data &&
              data.length > 0 &&
              data.map((value) => (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {value.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {value.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {value.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {value.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {value.hobbies.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{value.book}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                    <Link to={`/edit/${value._id}`}>
                      <button className="border bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="border bg-red-600 text-white px-2 py-1 rounded-md cursor-pointer"
                      onClick={() => handleDelete(value._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
