import { createSlice } from "@reduxjs/toolkit";
import {
  getTodoLocalStorage,
  setTodoLocalStorage,
} from "../../utils/localStorage";

const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    value: localStorage.getItem("todoList") ? getTodoLocalStorage() : [],
    todoUpdate: {},
    todoFilter: undefined,
  },
  reducers: {
    addTodoList(state, action) {
      const newTodoList = [...state.value, action.payload];
      state.value = newTodoList;
      setTodoLocalStorage(newTodoList);
    },
    getTodoUpdate(state, action) {
      const currentTodoUpdate = state.value.find(
        (item) => item.id === action.payload
      );
      state.todoUpdate = currentTodoUpdate;
    },
    updateTodoList(state, action) {
      const newTodoList = state.value.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.value = newTodoList;
      setTodoLocalStorage(newTodoList);
    },
    removeTodo(state, action) {
      const newTodoList = state.value.filter(
        (item) => item.id !== action.payload
      );
      state.value = newTodoList;
      setTodoLocalStorage(newTodoList);
    },
    changeStatus(state, action) {
      const currentTodoUpdate = state.value.find(
        (item) => item.id === action.payload
      );
      if (currentTodoUpdate.status === "1") {
        currentTodoUpdate.status = "0";
      } else {
        currentTodoUpdate.status = "1";
      }
      const newTodoList = state.value.map((item) =>
        item.id === action.payload ? currentTodoUpdate : item
      );
      state.value = newTodoList;
      setTodoLocalStorage(newTodoList);
    },
    filterByStatus(state, action) {
      const filterValue = action.payload;
      if (filterValue === "1") {
        const newTodoList = [...state.value].filter(
          (todo) => todo.status === "1"
        );
        state.todoFilter = newTodoList;
      } else if (filterValue === "0") {
        const newTodoList = [...state.value].filter(
          (todo) => todo.status === "0"
        );
        state.todoFilter = newTodoList;
      } else {
        state.todoFilter = state.value;
      }
    },
    searchByName(state, action) {
      const searchValue = action.payload;
      if (searchValue !== "") {
        const newTodoList = state.value.filter((todo) =>
          todo.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        state.todoFilter = newTodoList;
      } else {
        state.todoFilter = state.value;
      }
    },
    sortByStatus(state, action) {
      const sortBy = action.payload;
      if (sortBy === "active") {
        const newTodoList = [...state.value].sort((a, b) => {
          return a.status > b.status ? 1 : a.status < b.status ? -1 : 0;
        });
        state.value = newTodoList;
      } else if (sortBy === "hide") {
        const newTodoList = [...state.value].sort((a, b) => {
          return a.status > b.status ? -1 : a.status < b.status ? 1 : 0;
        });
        state.value = newTodoList;
      }
    },
    sortByName(state, action) {
      const sortBy = action.payload;

      if (sortBy === "az") {
        const newTodoList = [...state.value].sort((a, b) => {
          var alc = a.name.toLowerCase(),
            blc = b.name.toLowerCase();
          return alc > blc ? 1 : alc < blc ? -1 : 0;
        });
        state.value = newTodoList;
      } else if (sortBy === "za") {
        const newTodoList = [...state.value].sort((a, b) => {
          var alc = a.name.toLowerCase(),
            blc = b.name.toLowerCase();
          return alc > blc ? -1 : alc < blc ? 1 : 0;
        });
        state.value = newTodoList;
      }
    },
  },
});
export const {
  addTodoList,
  updateTodoList,
  removeTodo,
  getTodoUpdate,
  changeStatus,
  filterByStatus,
  searchByName,
  sortByStatus,
  sortByName,
} = todoSlice.actions;
export default todoSlice.reducer;
