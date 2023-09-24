import React, { useState, useEffect } from "react";
import List from "./components/List";

function App() {
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editFlag, setEditFlag] = useState(false);
  const [editID, setEditID] = useState(0);
  console.log(list);

  // <<=======<<   get local storage    >>=======>>
  function getLocalStorage() {
    let items = JSON.parse(localStorage.getItem("list"));
    // console.log(items);
    if (items == null) {
      return (items = []);
    }
    // console.log(items);
    return (items = [...items]);
  }
  console.log(list);
  // <<=======<<   Handle Submit   >>=======>>

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return showAlert("danger", "cannot add");
    } else if (name && editFlag) {
      const id = editID;
      console.log(id);
      let items = list.find((item) => item.id === id);
      const { title } = items;
      setName(title);
      items.title = name;
      console.log(items);
      const newItems = [...list, items];
      // setList([...list, items]);
      console.log(newItems);
      localStorage.setItem("list", JSON.stringify(list));
      setName("");
      showAlert("success", "edit successfull");
      setEditFlag(false);
    } else {
      const newItem = { id: new Date().getTime(), title: name };
      // console.log(newItem);
      // setList([...list, newItem]);
      list.push(newItem);
      console.log(list);
      localStorage.setItem("list", JSON.stringify(list));
      showAlert("success", "item added");
      setName("");
    }
  }
  // <<=======<<  Show Alert Function   >>=======>>

  function showAlert(type, msg) {
    return setAlert({ show: true, type: `${type}`, msg: `${msg}` });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ show: false, type: "", msg: "" });
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [alert.show]);
  // <<=======<<  Remove item Function   >>=======>>
  const removeItem = (id) => {
    showAlert("danger", "item deleted");
    const newItems = list.filter((item) => item.id !== id);
    setList(newItems);
    localStorage.setItem("list", JSON.stringify(newItems));
  };

  // <<=======<<  edit item Function   >>=======>>

  function editItem(id) {
    setEditFlag(true);
    setEditID(id);
    let items = list.find((item) => item.id === id);
    const { title } = items;
    setName(title);
  }

  return (
    <>
      <section className="container">
        <div className="static">
          {alert.show && <h4 className={`${alert.type}`}>{alert.msg} </h4>}
          <h2> Grocery Bud</h2>
          <input
            id="input"
            type="text"
            placeholder="eg. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn-submit" onClick={handleSubmit}>
            {editFlag ? "Edit" : "submit"}
          </button>
          {list.length < 1 ? (
            <div className="Nocontainer">
              <h2>Nothing to show here! </h2>
            </div>
          ) : (
            list.map((listItem) => {
              // console.log(listItem);
              return (
                <List
                  key={listItem.id}
                  {...listItem}
                  remove={removeItem}
                  edit={editItem}
                />
              );
            })
          )}
        </div>
      </section>
    </>
  );
}

export default App;
