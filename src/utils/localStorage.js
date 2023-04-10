export const setTodoLocalStorage = (data) => {
  localStorage.setItem("todoList", JSON.stringify(data));
};
export const getTodoLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todoList"));
};
