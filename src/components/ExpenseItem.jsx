import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  const { id, charge, amount } = expense;
  console.log("id" +id);
  return (
    <div>
      <li className="item">
        <div className="info">
          <span className="expense">{charge}</span>
          <span className="amount">${amount}</span>
        </div>
        <div>
          <button
            arai-label="edit button"
            className="edit-btn"
            onClick={() => handleEdit(id)}
          >
            <MdEdit />
          </button>
          <button
            arai-label="delete button"
            className="edit-btn"
            onClick={() => handleDelete(id)}
          >
            <MdDelete />
          </button>
        </div>
      </li>
    </div>
  );
};

export default ExpenseItem;
