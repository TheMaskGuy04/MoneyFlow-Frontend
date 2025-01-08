import React from "react";

const MonthSummary = ({ month, year, totalExpense, topCategory, onClick }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-2">{`${month} ${year}`}</h3>
      <p className="text-lg">Total Expense: {totalExpense.toFixed(2)}</p>
      <p className="text-sm text-gray-600">Top Category: {topCategory}</p>
      <p className="text-sm text-blue-600 mt-2">Click to view details</p>
    </div>
  );
};

export default MonthSummary;
