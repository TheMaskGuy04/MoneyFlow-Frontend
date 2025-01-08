import React from "react";
import { useForm } from "react-hook-form";
import { EXPENSE_CATEGORIES, PAYMENT_MODES } from "../utils/expenseConstants";

const ExpenseForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-wrap gap-4 p-4 bg-white shadow rounded-lg"
    >
      <div className="flex-grow">
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Expense Title"
          className={`w-full p-2 border rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="w-48">
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full p-2 border rounded border-gray-300"
        >
          <option value="">Select Category</option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>

      <div className="w-40">
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className={`w-full p-2 border rounded ${
            errors.date ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
        )}
      </div>

      <div className="w-40">
        <select
          {...register("paymentMode", { required: "Payment mode is required" })}
          className="w-full p-2 border rounded border-gray-300"
        >
          <option value="">Select Payment Mode</option>
          {PAYMENT_MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
        {errors.paymentMode && (
          <p className="text-red-500 text-xs mt-1">
            {errors.paymentMode.message}
          </p>
        )}
      </div>

      <div className="w-40">
        <input
          type="number"
          step="0.01"
          {...register("amount", { required: "Amount is required", min: 0 })}
          placeholder="Amount"
          className={`w-full p-2 border rounded ${
            errors.amount ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
