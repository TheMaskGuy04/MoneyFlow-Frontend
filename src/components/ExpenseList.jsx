import React from "react";
import { format } from "date-fns";

const ExpenseList = ({ expenses, title }) => {
  return expenses.length == 0 ? (
    <h2 className="text-2xl font-bold mb-4">No Expenses</h2>
  ) : (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">
                  {format(new Date(expense.date), "dd/MM/yyyy")}
                </td>
                <td className="py-2 px-4">{expense.title}</td>
                <td className="py-2 px-4">{expense.category}</td>
                <td className="py-2 px-4">{expense.amount}</td>
                <td className="py-2 px-4">{expense.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
