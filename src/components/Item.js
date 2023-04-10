import React from "react";
import { useDispatch } from "react-redux";
import { setShowForm } from "../app/features/showFormSlice";
import {
  removeTodo,
  getTodoUpdate,
  changeStatus,
} from "../app/features/todoSlice";

const Item = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleChangeStatus = (id) => {
    dispatch(changeStatus(id));
  };
  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };
  const handleClickEdit = (id) => {
    dispatch(setShowForm({ status: true, action: "update" }));
    dispatch(getTodoUpdate(id));
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td className="text-center">
        <div onClick={() => handleChangeStatus(item.id)}>
          {item.status === "1" ? (
            <button className="btn btn-primary text-light py-1 px-4">
              In progress
            </button>
          ) : (
            <button className="btn btn-danger text-light py-1 px-4">Done</button>
          )}
        </div>
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => handleClickEdit(item.id)}
        >
          <span className="fa fa-pencil mr-2"></span>
          Edit
        </button>
        &nbsp;
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleRemove(item.id)}
        >
          <span className="fa fa-trash mr-2"></span>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Item;
