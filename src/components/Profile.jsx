import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Assuming you have an action to update user profile in your authSlice
import { login } from "../store/authSlice";
import { baseUrl } from "../../backend-url";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const isAuthenticated = useSelector((state) => state.auth.status);
  const expenseData = useSelector((state) => state.expense.expenseData);

  let monthSummaries = [
    {
      month: "--",
      year: "--",
      totalExpense: "--",
      topCategory: "--",
    },
  ];

  if (expenseData != null) {
    monthSummaries = expenseData.monthSummaries;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    // Add more fields as needed
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        // Set other fields from user object
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/user/update`, profileData, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(login(response.data.user));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </div>
            {/* Add more fields as needed */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="mb-4">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            {/* Display other user information */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Monthly Expense Report */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Monthly Expense Report</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Month</th>
                <th className="py-2 px-4 text-left">Total Expense</th>
                <th className="py-2 px-4 text-left">Top Category</th>
              </tr>
            </thead>
            <tbody>
              {monthSummaries.map((summary, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{`${summary.month} ${summary.year}`}</td>
                  <td className="py-2 px-4">{summary.totalExpense}</td>
                  <td className="py-2 px-4">{summary.topCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
