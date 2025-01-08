import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/expenseSlice";

import { baseUrl } from "../../backend-url";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import MonthSummary from "./MonthSummary";
import Analysis from "./Analysis";
import { processFetchedData } from "../utils/expenseConstants";

const Expense = () => {
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState([]);

  const [monthSummaries, setMonthSummaries] = useState([]);
  const [activeTab, setActiveTab] = useState("expenses");

  const expenseData = useSelector((state) => state.expense.expenseData);
  const expenseDataStatus = useSelector((state) => state.expense.status);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (expenseData != null) {
      const newExpenseData = expenseData.expenses;
      const newMonthSummaries = expenseData.monthSummaries;

      setExpenses(newExpenseData);
      setMonthSummaries(newMonthSummaries);
    }
  }, [expenseData, navigate, currentMonth]);

  async function dispatchData(data) {
    if (data) {
      dispatch(add(data));

      document.cookie = "data = " + JSON.stringify(data) + ";max-age=600";
    }
  }

  const handleAddExpense = async (newExpense) => {
    const res = await axios.post(`${baseUrl}/expenses/add`, newExpense, {
      withCredentials: true,
    });

    // console.log(res);

    if (res.data.success) {
      const data = JSON.parse(res.data.data);

      const processedData = await processFetchedData(data);

      await dispatchData(processedData);
    }
  };

  const currentMonthExpenses =
    expenses.length == 0
      ? []
      : expenses.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === currentMonth &&
            expenseDate.getFullYear() === currentYear
          );
        });

  const handleMonthClick = (month, year) => {
    const monthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === new Date(`${month} 1, ${year}`).getMonth() &&
        expenseDate.getFullYear() === parseInt(year)
      );
    });

    setSelectedMonth({ month, year, expenses: monthExpenses });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("expenses")}
          className={`px-4 py-2 rounded ${
            activeTab === "expenses" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-4 py-2 rounded ${
            activeTab === "analysis" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Analysis
        </button>
      </div>

      {activeTab === "expenses" && (
        <>
          <ExpenseForm onSubmit={handleAddExpense} />

          {selectedMonth ? (
            <ExpenseList
              expenses={selectedMonth.expenses}
              title={`Expenses for ${selectedMonth.month} ${selectedMonth.year}`}
            />
          ) : (
            <ExpenseList
              expenses={currentMonthExpenses}
              title="Current Month Expenses"
            />
          )}

          {monthSummaries.length == 0 ? (
            <h2 className="text-2xl font-bold mb-4">No Expenses</h2>
          ) : (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Previous Months</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthSummaries.map((summary, index) => (
                  <MonthSummary
                    key={index}
                    {...summary}
                    onClick={() =>
                      handleMonthClick(summary.month, summary.year)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {selectedMonth && (
            <button
              onClick={() => setSelectedMonth(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Back to Current Month
            </button>
          )}
        </>
      )}

      {activeTab === "analysis" && <Analysis expenses={expenses} />}
    </div>
  );
};

export default Expense;
