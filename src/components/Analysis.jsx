// import React, { useState, useEffect } from "react";
// import Pie from "./Pie";

// const Analysis = ({ expenses }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [filteredExpenses, setFilteredExpenses] = useState([]);
//   const [pieData, setPieData] = useState([]);

//   useEffect(() => {
//     // Initially, show current month's data
//     const currentDate = new Date();
//     const firstDayOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );
//     const lastDayOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     );

//     setStartDate(firstDayOfMonth.toISOString().split("T")[0]);
//     setEndDate(lastDayOfMonth.toISOString().split("T")[0]);
//   }, []);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const filtered = expenses.filter((expense) => {
//         const expenseDate = new Date(expense.date);
//         return (
//           expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
//         );
//       });
//       setFilteredExpenses(filtered);

//       // Prepare data for Pie chart
//       const categoryTotals = filtered.reduce((acc, expense) => {
//         acc[expense.category] =
//           (acc[expense.category] || 0) + parseInt(expense.amount);
//         return acc;
//       }, {});

//       const pieData = Object.entries(categoryTotals).map(
//         ([category, total]) => ({
//           value: total,
//           label: category,
//         })
//       );

//       setPieData(pieData);
//     }
//   }, [expenses, startDate, endDate]);

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "startDate") {
//       setStartDate(value);
//     } else if (name === "endDate") {
//       setEndDate(value);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">Expense Analysis</h2>

//       <div className="mb-4 flex flex-wrap items-center gap-4">
//         <div>
//           <label
//             htmlFor="startDate"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Start Date
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             name="startDate"
//             value={startDate}
//             onChange={handleDateChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="endDate"
//             className="block text-sm font-medium text-gray-700"
//           >
//             End Date
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             name="endDate"
//             value={endDate}
//             onChange={handleDateChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-4">Expense Distribution</h3>
//         {pieData.length > 0 ? (
//           <Pie data={pieData} />
//         ) : (
//           <p>No data available for the selected date range.</p>
//         )}
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Expense Summary</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 text-left">Category</th>
//                 <th className="py-2 px-4 text-left">Total Amount</th>
//                 <th className="py-2 px-4 text-left">Percentage</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pieData.map(({ label, value }) => {
//                 const totalExpense = pieData.reduce(
//                   (sum, item) => sum + parseInt(item.value),
//                   0
//                 );
//                 const percentage = ((value / totalExpense) * 100).toFixed(2);
//                 return (
//                   <tr key={label} className="border-b">
//                     <td className="py-2 px-4">{label}</td>
//                     <td className="py-2 px-4">{value}</td>
//                     <td className="py-2 px-4">{percentage} %</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analysis;

import React, { useState, useEffect } from "react";
import Pie from "./Pie";

const Analysis = ({ expenses }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Initially, show current month's data
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    setStartDate(firstDayOfMonth.toISOString().split("T")[0]);
    setEndDate(lastDayOfMonth.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate)
        );
      });
      setFilteredExpenses(filtered);

      // Prepare data for Pie chart
      const categoryTotals = filtered.reduce((acc, expense) => {
        acc[expense.category] =
          (acc[expense.category] || 0) + parseInt(expense.amount);
        return acc;
      }, {});

      const pieData = Object.entries(categoryTotals).map(
        ([category, total], index) => ({
          value: total,
          label: category,
          color: `hsl(${
            (index * 360) / Object.keys(categoryTotals).length
          }, 70%, 50%)`,
        })
      );

      setPieData(pieData);
    }
  }, [expenses, startDate, endDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Expense Analysis</h2>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="w-full sm:w-auto">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full sm:w-auto">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Expense Distribution</h3>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px] max-w-full flex justify-center items-center">
            {pieData.length > 0 ? (
              <Pie data={pieData} />
            ) : (
              <p>No data available for the selected date range.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Expense Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Total Amount</th>
                <th className="py-2 px-4 text-left">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {pieData.map(({ label, value, color }) => {
                const totalExpense = pieData.reduce(
                  (sum, item) => sum + parseInt(item.value),
                  0
                );
                const percentage = ((value / totalExpense) * 100).toFixed(2);
                return (
                  <tr key={label} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <span
                        className="w-3 h-3 mr-2 inline-block"
                        style={{ backgroundColor: color }}
                      ></span>
                      {label}
                    </td>
                    <td className="py-2 px-4">{value.toFixed(2)}</td>
                    <td className="py-2 px-4">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
