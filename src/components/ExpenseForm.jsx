import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  amount,
  charge,
  handleCharge,
  handleAmount,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge" className="form-group">
            charge
          </label>
          <input
            type="text"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            className="form-control"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="form-group">
            amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="e.g. 100"
            className="form-control"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        submit
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
