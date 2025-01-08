export const EXPENSE_CATEGORIES = [
  "Groceries",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Sports",
  "Shopping",
  "Utilities & Bills",
  "Health",
  "Education",
  "Personal Care",
  "Other",
];

export const PAYMENT_MODES = ["Online", "Cash"];

export const processFetchedData = async (expenseData) => {
  const newExpenseData = [];
  const newMonthSummaries = [];
  let newCurrentMonthSummaries = {};
  const date = new Date();
  const currentMonth = date.getMonth();

  for (let key in expenseData) {
    const monthsData = expenseData[key].months;
    for (let key2 in monthsData) {
      let lastExpense = 0;
      const currentMonthData = monthsData[key2].data;
      for (let i = 0; i < currentMonthData.length; i++) {
        const data = currentMonthData[i];
        lastExpense = data.amount;
        const temp = {
          id: data._id,
          date: data.date,
          title: data.title,
          category: data.category,
          amount: data.amount,
          paymentMode: data.paymentMode,
        };

        newExpenseData.push(temp);
      }

      const monthSummary = monthsData[key2].summary;
      const temp = {
        month: monthSummary.month,
        year: monthSummary.year,
        totalExpense: monthSummary.totalExpense,
        topCategory: monthSummary.topCategory,
      };

      newMonthSummaries.push(temp);

      if (key2 == currentMonth) {
        const monthSummary = monthsData[key2].summary;
        const temp = {
          month: monthSummary.month,
          year: monthSummary.year,
          totalExpense: monthSummary.totalExpense,
          topCategory: monthSummary.topCategory,
          lastExpense: lastExpense,
        };

        newCurrentMonthSummaries = temp;
      }
    }
  }

  newMonthSummaries.reverse();

  const obj = {
    expenses: newExpenseData,
    currentMonthSummary: newCurrentMonthSummaries,
    monthSummaries: newMonthSummaries,
  };

  return obj;
};
