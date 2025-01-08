import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../../backend-url";
import { login } from "../store/authSlice";
import { add } from "../store/expenseSlice";
import { processFetchedData } from "../utils/expenseConstants";

function Protected({ children }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const isExpenseDataPresent = useSelector((state) => state.expense.status);
  const expenseData = useSelector((state) => state.expenseData);

  useEffect(() => {
    // console.log("AuthLayout UseEffect");

    async function getDataFromCookie() {
      if (isExpenseDataPresent) {
        return;
      }

      const cookieData = document.cookie.split("; ");

      if (cookieData.length == 2) {
        const temp = cookieData[1].split("=");

        if (temp[0] == "data" && temp[1].length !== 0) {
          // console.log("Data present");
          const data = JSON.parse(temp[1]);
          // console.log("data dispatched");
          dispatchData(data);
        } else {
          await fetchData();
        }
      } else {
        await fetchData();
      }
    }

    async function check() {
      // console.log("check called");

      const response1 = await axios.get(`${baseUrl}/user/checkAuth`, {
        withCredentials: true, // Important for sending cookies
      });

      if (response1.data.success) {
        getDataFromCookie();
        dispatch(login(response1.data.user));
      }
    }

    async function getData() {
      const response2 = await axios.get(`${baseUrl}/expenses`, {
        withCredentials: true, // Important for sending cookies
      });

      const isLoggedIn = response2.data.success;

      // console.log("getData called");

      if (response2.data.success && response2.data.StatusCode == 200) {
        const data = JSON.parse(response2.data.data);
        return data;
      } else {
        return null;
      }
    }

    async function dispatchData(data) {
      if (data) {
        dispatch(add(data));

        // console.log(data);

        document.cookie = "data = " + JSON.stringify(data) + ";max-age=600";
      }
    }

    async function fetchData() {
      if (!isExpenseDataPresent) {
        const data = await getData();

        if (data) {
          const processedData = await processFetchedData(data);

          // console.log(processedData);
          dispatchData(processedData);
        }
      }
    }

    if (!isAuthenticated) {
      check();
    } else {
      getDataFromCookie();
    }

    setLoader(false);
  }, [isAuthenticated, expenseData]);

  // useEffect(() => {
  //   if (authentication && authStatus !== authentication) {
  //     navigate("/login");
  //   } else if (!authentication && authStatus !== authentication) {
  //     navigate("/");
  //   }

  //   setLoader(false);
  // }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
