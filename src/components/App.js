import { useState } from "react";
// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: true },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form ({ addItem }) {
	const [description, setDescription] = useState("");
	const [amt, setAmt] = useState(1);
	const isInputEmpty = description.trim().length === 0;

	function handleSubmit(event) {
		event.preventDefault();
	}

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

			<input type="text" value={description} onChange={(event) => setDescription(event.target.value)}
				placeholder="Input item..."/>
      <input type="number" value={amt} onChange={(event) => setAmt(parseInt(event.target.value))} 
				min={1} max={100}/>

			<button type="button" 
				onClick={() => {
					addItem(description, amt);
					setDescription("");
					}}
				disabled={isInputEmpty}
				>Add</button>

    </form>
  );
}

function PackingList({ packList }) {
  return (
    <div className="list">
      <ul>
        {packList.map((item, index) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item( {item} ) {
	return(
		<li className={item.packed ? "packed" : ""}>{`${item.description} (${item.quantity})`}</li>
	)
}


function Stats({ packList }) {
	const packedItems = packList.filter((item) => item.packed === true).length
	const percentPacked = Math.round(packedItems/packList.length * 100)
  return (
    <footer className="stats">
      <em>You have {packList.length} items in the list. You already packed {packedItems} ({percentPacked}%).</em>
    </footer>
  );
}

function App() {
	const [packList, setPackList] = useState(initialItems)

	function addItem(item, amt) {
		const newItem = {id: packList.length + 1, description: item, quantity: amt, packed: false }
		setPackList((prev) => [...prev, newItem ])
	} 

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList packList={packList} />
      <Stats packList={packList}/>
    </div>
  );
}

export default App;
