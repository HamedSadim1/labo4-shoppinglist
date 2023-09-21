import React, { FC, useState, Fragment } from "react";
import { generate } from "shortid";

interface ShoppongListProps {
  id: string;
  name: string;
  amount: number;
}

const ShoppongList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppongListProps[]>([]);
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const addShoppingItem: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    if (name.length === 0) {
      setError("Name must be not empty");
      return;
    }

    setShoppingList([
      ...shoppingList,
      { id: generate(), name: name, amount: amount },
    ]);
    setName("");
    setAmount(0);
    setSuccess("Item added");
  };
  const handleRemove = (index: string) => {
    const removedArray = shoppingList.filter((id) => id.id !== index);
    setShoppingList(removedArray);
    setSuccess("Item removed");
  };

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <form>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <br />
        <button type="submit" onClick={addShoppingItem}>
          Add
        </button>
      </form>

      <ul>
        {shoppingList.map((item, index) => (
          <div>
            <div key={item.id}>
              <li> {item.name}</li>
              <li> {item.amount} </li>
              <button onClick={() => handleRemove(item.id)}> Remove</button>
            </div>
          </div>
        ))}
      </ul>
    </Fragment>
  );
};

export default ShoppongList;
