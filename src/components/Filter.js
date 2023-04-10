import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortByName, sortByStatus } from "../app/features/todoSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const [showIconClicked, setShowIconClicked] = useState("");
  const handleSortByStatus = (sortBy) => {
    if (sortBy === "active") {
      setShowIconClicked("active");
    } else if (sortBy === "hide") {
      setShowIconClicked("hide");
    }
    dispatch(sortByStatus(sortBy));
  };
  const handleSortByName = (sortBy) => {
    if (sortBy === "az") {
      setShowIconClicked("az");
    } else if (sortBy === "za") {
      setShowIconClicked("za");
    }
    dispatch(sortByName(sortBy));
  };
  return (
    <div className="fil">
      <div className="dropdown">
        <button
          className="btn btn-success "
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
        <span className="fa fa-caret-square-o-down mr-2 "></span> Filter
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li onClick={() => handleSortByName("az")}>
            <span className="dropdown-item  ">
              Name A - Z
              {showIconClicked === "az" ? (
                <i className="fa fa-check ms-2"></i>
              ) : (
                ""
              )}
            </span>
          </li>
          <li onClick={() => handleSortByName("za")}>
            <span className="dropdown-item">
              Name Z - A
              {showIconClicked === "za" ? (
                <i className="fa fa-check ms-2"></i>
              ) : (
                ""
              )}
            </span>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li onClick={() => handleSortByStatus("active")}>
            <span className="dropdown-item">
              Status : Done
              {showIconClicked === "active" ? (
                <i className="fa fa-check ms-4"></i>
              ) : (
                ""
              )}
            </span>
          </li>
          <li onClick={() => handleSortByStatus("hide")}>
            <span className="dropdown-item">
              Status : In progress
              {showIconClicked === "hide" ? (
                <i className="fa fa-check ms-4"></i>
              ) : (
                ""
              )}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
