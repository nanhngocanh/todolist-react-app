import { configureStore } from "@reduxjs/toolkit";
import showFormSlice from "./features/showFormSlice";
import todoSlice from "./features/todoSlice";
export const store = configureStore({
  reducer: {
    todoList: todoSlice,
    showForm: showFormSlice,
  },
});
