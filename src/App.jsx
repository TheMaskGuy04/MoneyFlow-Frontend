import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/Navbar";
import Expense from "./components/Expense";
import AuthLayout from "./components/AuthLayout";
import Profile from "./components/Profile";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// Import other components as needed

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const isAuthenticated = useSelector((state) => state.auth.status);
  // const dispatch = useDispatch();
  // const isExpenseDataPresent = useSelector((state) => state.expense.status);

  // useEffect(() => {
  //   async function check() {
  //     const response1 = await axios.get(
  //       "http://localhost:8001/user/checkAuth",
  //       {
  //         withCredentials: true, // Important for sending cookies
  //       }
  //     );

  //     if (response1.data.success) {
  //       dispatch(login(response1.data.user));
  //     }

  //     console.log("check called");
  //   }

  //   async function getData() {
  //     const response2 = await axios.get("http://localhost:8001/expenses", {
  //       withCredentials: true, // Important for sending cookies
  //     });

  //     const isLoggedIn = response2.data.success;

  //     console.log("getData called");

  //     if (response2.data.success) {
  //       const data = JSON.parse(response2.data.data);
  //       return data;
  //     } else {
  //       return null;
  //     }
  //   }

  //   async function dispatchData(data) {
  //     if (data) {
  //       // const date = new Date();
  //       // const payload = {
  //       //   data: data,
  //       //   timeStamp: date.toISOString(), // Convert Date to ISO string
  //       // };

  //       // console.log("Dispatching add action:", payload);
  //       // const action = { type: "add", payload: payload };
  //       // await dispatch(action);

  //       dispatch(add(data));

  //       document.cookie = "data = " + JSON.stringify(data) + ";max-age=600";
  //     }
  //   }

  //   async function fetchData() {
  //     if (!isExpenseDataPresent) {
  //       const data = await getData();
  //       dispatchData(data);
  //     } else {
  //       console.log(expenseDataTimestamp);
  //     }
  //   }

  //   if (!isAuthenticated) {
  //     check();
  //   }

  //   if (isAuthenticated) {
  //     const cookieData = document.cookie.split("; ");

  //     if (cookieData.length == 2) {
  //       const temp = cookieData[1].split("=");

  //       if (temp[0] == "data" && temp[1].length !== 0) {
  //         console.log("Data present");
  //         const data = JSON.parse(temp[1]);
  //         console.log(data);
  //         dispatchData(data);
  //       } else {
  //         fetchData();
  //       }
  //     } else {
  //       fetchData();
  //     }
  //   }
  // }, [isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <AuthLayout>
                  <HomePage />
                </AuthLayout>
              }
            />
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthLayout>
                  <RegisterPage />
                </AuthLayout>
              }
            />
            {/* Define your other routes here */}
            <Route
              path="/expenses"
              element={
                <AuthLayout>
                  <Expense />
                </AuthLayout>
              }
            />
            {/* <Route path="/analytics" element={<Analytics />} /> */}
            <Route
              path="/profile"
              element={
                <AuthLayout>
                  <Profile />
                </AuthLayout>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
