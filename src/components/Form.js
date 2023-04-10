import React, { useEffect, useRef } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowForm } from "../app/features/showFormSlice";
import { addTodoList, updateTodoList } from "../app/features/todoSlice";
import { getUuid } from "../utils/uuid";

const Form = (props) => {
  const dispatch = useDispatch();

  const name = useRef();
  const status = useRef();

  const showForm = useSelector((state) => state.showForm.value);
  const todoUpdate = useSelector((state) => state.todoList.todoUpdate);

  useEffect(() => {
    if (showForm.action === "add") {
      name.current.value = "";
      status.current.value = "1";
    }
  }, [showForm.action]);
  useEffect(() => {
    if (props.action === "update") {
      name.current.value = todoUpdate.name;
      status.current.value = todoUpdate.status;
    }
  }, [todoUpdate]);

  // close box form add
  const handleClickClose = () => {
    dispatch(setShowForm({ status: false, action: "" }));
  };
  //Reset form add
  const handleReset = () => {
    name.current.value = "";
    status.current.value = "1";
  };

  // Send data to app
  const handleSubmit = (e) => {
    e.preventDefault();

    if (showForm.action === "update") {
      const data = {
        id: todoUpdate.id,
        name: name.current.value,
        status: status.current.value,
      };
      // props.onUpdate(data);
      dispatch(updateTodoList(data));
    } else {
      const data = {
        id: getUuid(),
        name: name.current.value,
        status: status.current.value,
      };
      dispatch(addTodoList(data));

      handleReset();
    }
  };
  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <div className="panel panel-warning  p-3">
        <div className="panel-heading">
          <h3 className="panel-title d-flex justify-content-between px-3">
            <div>
              {showForm.action === "add"
                ? "Add task"
                : "Edit task"}
            </div>
            <div>
              <span
                className="fa fa-times-circle text-right hoverX"
                onClick={handleClickClose}
              ></span>
            </div>
          </h3>
        </div>
        <div className="panel-body">
          <form className="p-3" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-left">
                <b>Name :</b>
              </label>
              <input type="text" className="form-control" ref={name} />
            </div>
            <label className="text-left">
              <b>Status :</b>
            </label>
            <select className="form-control" ref={status} name="status">
              <option value={1}>In progress</option>
              <option value={0}>Done</option>
            </select>
            <br />
            <div className="text-center">
              <button className="btn btn-warning">
                <span className="fa fa-plus mr-2"></span>
                Save
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleReset}
              >
                <span className="fa fa-close mr-2"></span>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
