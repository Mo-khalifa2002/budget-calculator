import "./App.css";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 600 },
//   { id: uuidv4(), charge: "car payment", amount: 300 },
//   { id: uuidv4(), charge: "the house", amount: 1200 },
// ];

// local storage
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  console.log(expenses);

  // states
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  // local storage useEffect
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, []);

  //functions
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });

    // clear the alert after 7 seconds

    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);

    //we didn't do the spread operator because the filter method already
    // gets the whole list back anyway.
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item delted" });
  };
  
  const handleClear = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items delted" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      // edit the item
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited successfully" });

        // add the item to the list
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };

        setExpenses([...expenses, singleExpense]);

        //in case the charge is not empty, and the amount is bigger than 0
        // display the success alert
        handleAlert({ type: "success", text: "item added successfully" });
      }

      setCharge("");
      setAmount("");

      //in case the charge is empty, and the amount is less than 0
      // display the danger alert
    } else {
      handleAlert({
        type: "danger",
        text: "the charge can't be empty value, and the amount has to be bigger than zero",
      });
    }
  };

  return (
    <>
      {alert.show && <Alert text={alert.text} type={alert.type} />}
      <Alert />
      {/* <h1 className="budgett">Budget Calculator</h1> */}
      <main className="App">
        <ExpenseForm
          amount={amount}
          charge={charge}
          handleSubmit={handleSubmit}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
        />
        <ExpenseList
          expenses={expenses}
          handleClear={handleClear}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </main>
      <div className="total-spending">

      <h1>
        total spending:
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
      </div>
    </>
  );
}

export default App;
