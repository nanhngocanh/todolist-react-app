import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByStatus, searchByName } from "../app/features/todoSlice";
import Item from "./Item";

let filterValue = "-1";
const Table = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList.value);
  const todoFilter = useSelector((state) => state.todoList.todoFilter);
  // load table when todolist change
  useEffect(() => {
    dispatch(filterByStatus(filterValue));
  }, [todoList]);
  const todos = todoFilter ? todoFilter : todoList;

  const handleFilterByStatus = (e) => {
    filterValue = e.target.value;
    dispatch(filterByStatus(e.target.value));
  };
  const handleChangeSearch = (e) => {
    dispatch(searchByName(e.target.value));
  };
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th className="text-center">No</th>
          <th className="text-center">Name</th>
          <th className="text-center">Status</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              placeholder="Type here to search ..."
              className="form-control"
              onChange={handleChangeSearch}
            />
          </td>
          <td>
            <select
              className="form-select"
              name="filterStatus"
              onChange={handleFilterByStatus}
            >
              <option value="-1">All</option>
              <option value="0">Done</option>
              <option value="1">In progress</option>
            </select>
          </td>
          <td></td>
        </tr>
        {todos.map((item, index) => (
          <Item item={item} key={index} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
