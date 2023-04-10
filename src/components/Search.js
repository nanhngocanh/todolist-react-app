import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../app/features/todoSlice";


const Search = () => {
  const dispatch = useDispatch();
  const keyword = useRef();
  const handleClickSearch = () => {
    dispatch(searchByName(keyword.current.value));
  };
  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="input-group">
        <input
          type="text"
          className="form-control search"
          placeholder="Nhập từ khóa..."
          ref={keyword}
        />
        <span className="input-group-btn ">
          <button className="btn btn-primary search2" onClick={handleClickSearch}>
            <i className="fa fa-search mr-2"></i>
            Tìm
          </button>
        </span>
      </div>
    </div>
  );
};

export default Search;
