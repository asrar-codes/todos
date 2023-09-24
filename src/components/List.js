import React from "react";

import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

const List = ({ title, id, remove, edit }) => {
  //   console.log(name);
  //   console.log(id);

  return (
    <div className="list">
      <p>{title}</p>
      <div className="btn-container">
        <button className="btn edit-btn" onClick={() => edit(id)}>
          <BiEdit />
        </button>
        <button className="btn delete-btn" onClick={() => remove(id)}>
          <AiTwotoneDelete />
        </button>
      </div>
    </div>
  );
};

export default List;
