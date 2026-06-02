import {
  useState,
  useEffect,
} from "react";

function App() {
  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [
    transactions,
    setTransactions,
  ] = useState(() => {
    const saved =
      localStorage.getItem(
        "transactions"
      );

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(
        transactions
      )
    );
  }, [transactions]);

  const addTransaction = () => {
    if (!title || !amount) {
      alert("Fill all fields");
      return;
    }

    const newTransaction = {
      title,
      amount,
    };

    setTransactions([
      ...transactions,
      newTransaction,
    ]);

    setTitle("");
    setAmount("");
  };

  const deleteTransaction = (
    index
  ) => {
    const updated =
      transactions.filter(
        (_, i) => i !== index
      );

    setTransactions(updated);
  };

  const balance =
    transactions.reduce(
      (total, item) =>
        total +
        Number(item.amount),
      0
    );

  return (
    <div className="container">
      <h1>Expense Tracker 💸</h1>

      <h2>Balance: ₹{balance}</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={addTransaction}
      >
        Add Transaction
      </button>

      <h3>Transactions</h3>

      {transactions.map(
        (item, index) => (
          <div
            key={index}
            className="transaction"
          >
            <span>
              {item.title} - ₹
              {item.amount}
            </span>

            <button
              className="delete-btn"
              onClick={() =>
                deleteTransaction(
                  index
                )
              }
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default App;