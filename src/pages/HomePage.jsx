import React, { useDebugValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DollarSign, PieChart, Mail } from "lucide-react";
import { useSelector } from "react-redux";

const FeatureCard = ({ icon, title, description, link }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={link} className="text-blue-600 hover:text-blue-800 font-medium">
      Learn more &rarr;
    </Link>
  </div>
);

const QuickStat = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md text-center">
    <p className="text-gray-600 mb-1">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const HomePage = () => {
  const expenseData = useSelector((state) => state.expense.expenseData);
  const expenseDataStatus = useSelector((state) => state.expense.status);

  const [quickStats, setQuickSets] = useState({
    totalExpenses: "--",
    topCategory: "--",
    lastExpense: "--",
  });

  useEffect(() => {
    if (expenseDataStatus) {
      const currentMonthSummary = expenseData.currentMonthSummary;

      const newQuickStats = {
        totalExpenses: currentMonthSummary.totalExpense,
        topCategory: currentMonthSummary.topCategory,
        lastExpense: currentMonthSummary.lastExpense,
      };

      setQuickSets(newQuickStats);
    }
  }, [expenseData, expenseDataStatus]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to MoneyFlow
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon={<DollarSign className="w-6 h-6 text-blue-600" />}
          title="Track Expenses"
          description="Easily log and categorize your daily expenses."
          link="/expenses"
        />
        <FeatureCard
          icon={<PieChart className="w-6 h-6 text-blue-600" />}
          title="Analyze Spending"
          description="Visualize your spending habits with interactive charts."
          link="/expenses"
        />
        <FeatureCard
          icon={<Mail className="w-6 h-6 text-blue-600" />}
          title="Monthly Reports"
          description="Receive detailed monthly expense reports via email."
          link="/profile"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Quick Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickStat
          label="Total Expenses (This Month)"
          value={quickStats.totalExpenses}
        />
        <QuickStat
          label="Top Spending Category"
          value={quickStats.topCategory}
        />
        <QuickStat
          label="Last Recorded Expense"
          value={quickStats.lastExpense}
        />
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/expenses"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          Start Tracking Expenses
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
