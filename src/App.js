// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Table from "./components/Table";
import Filter from "./components/Filter";
import Search from "./components/Search";
import { useDispatch, useSelector } from "react-redux";
import { setShowForm } from "./app/features/showFormSlice";
function App() {
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.showForm.value);

  const handleClickOpen = () => {
    if (showForm.status && showForm.action === "update") {
      dispatch(setShowForm({ status: true, action: "add" }));
    } else {
      dispatch(setShowForm({ status: !showForm.status, action: "add" }));
    }
  };
  return (
    <div className="App">
      <div className="container">
        <Header />
        <main>
          <div className="row main">
            {showForm.status && <Form action={showForm.action} />}
            <div className={showForm.status ? "col-8" : "col-8"}>
              <div>
                <button
                  onClick={handleClickOpen}
                  type="button"
                  className=" btn btn-primary canchinh"
                >
                  <i className="fa fa-plus mr-2 "></i> Add task
                </button>
              
                  {/* <Search /> */}
                  <Filter />
                
              </div>

              <div className="mt-4">
                <Table />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
