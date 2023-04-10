import React, { createContext, useReducer, useState, useEffect } from "react";

const reducer = (state, action) => {
  let newItems;
  let storingCurrentItem = state.items;
  switch (action.type) {
    case "ADD_TASK":
      newItems = {
        ...state,
        items: [...storingCurrentItem, action.payload],
      };

      localStorage.setItem("todos", JSON.stringify(newItems.items));
      return {
        ...state,
        items: newItems.items,
      };
    case "EDIT_TASK":
      storingCurrentItem.forEach((item, key) => {
        if (action.payload.id === item.id) {
          item.name = action.payload.name;
          item.level = action.payload.level;
        }
      });
      localStorage.setItem("todos", JSON.stringify(storingCurrentItem));
      return {
        ...state,
        items: storingCurrentItem,
      };
    case "DELETE_TASK":
      newItems = {
        ...state,
        items: storingCurrentItem.filter((item) => item.id !== action.payload),
      };
      localStorage.setItem("todos", JSON.stringify(newItems.items));
      return newItems;
    case "SEARCH_TASK":
      if (action.payload === "") {
        newItems = {
          ...state,
          items: storingCurrentItem,
        };
      } else {
        newItems = {
          ...state,
          items: storingCurrentItem.filter((element) =>
            element.name.includes(action.payload.toLowerCase().trim())
          ),
        };
      }
      return newItems;
    case "SORT_TASK":
      if (parseInt(action.payload) === 0) {
        newItems = {
          ...state,
          items: storingCurrentItem.sort((a, b) =>
            a.name === b.name ? 0 : a.name > b.name ? 1 : -1
          ),
        };
      } else if (parseInt(action.payload) === 1) {
        newItems = {
          ...state,
          items: storingCurrentItem.sort((a, b) =>
            a.name === b.name ? 0 : a.name > b.name ? -1 : 1
          ),
        };
      } else if (parseInt(action.payload) === 2) {
        newItems = {
          ...state,
          items: storingCurrentItem.sort((a, b) => a.level - b.level),
        };
      } else if (parseInt(action.payload) === 3) {
        newItems = {
          ...state,
          items: storingCurrentItem.sort((a, b) => b.level - a.level),
        };
      } else {
        newItems = {
          ...state,
          items: storingCurrentItem,
        };
      }
      localStorage.setItem("todos", JSON.stringify(newItems.items));
      return newItems;
    default:
      throw new Error("Action Invalid");
  }
};
export const GlobalText = createContext([]);
export const GlobalProvider = ({ children, items }) => {
  const [idEdit, setIdEdit] = useState("");
  const initState = {
    items,
  };
  const [state, dispatch] = useReducer(reducer, initState);

  state.items = JSON.parse(localStorage.getItem("todos"));
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(initState.items));
  }, []);
  function submitTask(task) {
    return task;
  }
  function addTask(task) {
    dispatch({
      type: "ADD_TASK",
      payload: task,
    });
  }
  function deleteTask(id) {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }
  function getIdEdit(id) {
    setIdEdit(id);
  }
  function editTask(newTask) {
    dispatch({
      type: "EDIT_TASK",
      payload: newTask,
    });
  }
  function searchTask(keyword) {
    dispatch({
      type: "SEARCH_TASK",
      payload: keyword,
    });
  }
  function sortTask(key) {
    dispatch({
      type: "SORT_TASK",
      payload: key,
    });
  }
  return (
    <GlobalText.Provider
      value={{
        items: state.items,
        deleteTask,
        editTask,
        searchTask,
        sortTask,
        addTask,
        submitTask,
        idEdit,
        getIdEdit,
        setIdEdit,
      }}
    >
      {children}
    </GlobalText.Provider>
  );
};
