import { Link } from "react-router-dom";
import {
  useFetchUsersQuery,
  useDeleteUserMutation,
} from "../redux/api/userApi";
import Swal from "sweetalert2";
import type React from "react";
import { useState, useEffect } from "react";
import type { User } from "../types/user";
import { FaSort, FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";

const ITEMS_PER_PAGE = 4;

const Home: React.FC = () => {
  const { data, isFetching } = useFetchUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [filteredUserData, setFilteredUserData] = useState<User[]>();
  const [gender, setGender] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [paginationArray, setPaginationArray] = useState<number[]>([]);
  const [noOfPages, setNoOfPages] = useState<number>(1);

  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredUserData([]);
      return;
    }
    let tempUserData = [...data];
    if (gender === "male" || gender === "female") {
      tempUserData = tempUserData.filter((value) => value.gender === gender);
    }
    if (sortOrder === "ascending") {
      tempUserData = tempUserData.sort(
        (a, b) => Number(a.mobile) - Number(b.mobile)
      );
    }
    if (sortOrder === "descending") {
      tempUserData = tempUserData.sort(
        (a, b) => Number(b.mobile) - Number(a.mobile)
      );
    }
    if (search.trim() !== "") {
      const lowerCaseSearch = search.toLowerCase();
      tempUserData = tempUserData.filter(
        (value) =>
          value.firstName.toLowerCase().includes(lowerCaseSearch) ||
          value.lastName.toLowerCase().includes(lowerCaseSearch) ||
          value.email.toLowerCase().includes(lowerCaseSearch) ||
          value.mobile.toLowerCase().includes(lowerCaseSearch) ||
          value.gender.toLowerCase().includes(lowerCaseSearch) ||
          value.book.toLowerCase().includes(lowerCaseSearch) ||
          value.hobbies.join(",").toLowerCase().includes(lowerCaseSearch)
      );
    }
    setFilteredUserData(tempUserData);
  }, [data, search, gender, sortOrder]);

  useEffect(() => {
    if (filteredUserData && filteredUserData?.length > 0) {
      const totalItems = filteredUserData?.length;
      const tempNoOfPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      setNoOfPages(tempNoOfPages);
      const tempPaginationArray = new Array(tempNoOfPages);
      setPaginationArray(tempPaginationArray);
    }
  }, [filteredUserData]);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Do you want to delete the user?",
      icon: "warning",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id).then(() => {
          Swal.fire({
            icon: "success",
            text: "user deleted successfully",
          });
        });
      }
    });
  };

  if (isFetching) {
    return (
      <p className="text-lg font-bold mt-3 text-center">loading user data...</p>
    );
  }
  return (
    <div className="w-[95%] mx-auto">
      <div className="my-3 flex justify-between pe-5">
        <div className="flex gap-5">
          <input
            type="text"
            name=""
            id=""
            value={search}
            className="border rounded-sm px-2"
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            name=""
            id=""
            value={gender}
            className="border rounded-sm w-36 ps-1"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase flex">
                Mobile{" "}
                {sortOrder === "" ? (
                  <FaSort
                    size="20px"
                    className="cursor-pointer"
                    onClick={() => setSortOrder("ascending")}
                  />
                ) : sortOrder === "ascending" ? (
                  <FaSortUp
                    size="20px"
                    className="cursor-pointer"
                    onClick={() => setSortOrder("descending")}
                  />
                ) : (
                  <FaSortDown
                    size="20px"
                    className="cursor-pointer"
                    onClick={() => setSortOrder("")}
                  />
                )}
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
            {filteredUserData &&
              filteredUserData.length > 0 &&
              filteredUserData.slice(startIndex, endIndex).map((value) => (
                <tr key={value._id}>
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
                      onClick={() => handleDelete(value._id?.toString()!)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex gap-1 justify-end mt-4">
          <button
            className={
              currentPage == 0
                ? "border px-2 rounded-md cursor-not-allowed bg-gray-200"
                : "border px-2 rounded-md cursor-pointer bg-gray-200"
            }
            onClick={() => setCurrentPage((pre) => pre - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {paginationArray.length > 0 &&
            [...paginationArray.keys()].map((value, index) => (
              <span
                key={index}
                className={
                  index === currentPage
                    ? "border px-3 rounded-sm cursor-pointer bg-amber-600 text-white"
                    : "border px-3 rounded-sm cursor-pointer"
                }
                onClick={() => setCurrentPage(index)}
              >
                {value + 1}
              </span>
            ))}
          <button
            className={
              currentPage == noOfPages - 1
                ? "border px-2 rounded-md cursor-not-allowed bg-gray-200"
                : "border px-2 rounded-md cursor-pointer bg-gray-200"
            }
            onClick={() => setCurrentPage((pre) => pre + 1)}
            disabled={currentPage === noOfPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
