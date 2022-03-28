import React from "react";

const SearchBar = (props) => {
  return (
    <>
      <div className={props.searchWrapper}>
        <label>
          <div className={props.iconWrapper}>
            <a>
              <i className={props.icon}></i>
            </a>
            <input
              type="search"
              name="search"
              placeholder={props.placeholder}
            />
          </div>
        </label>
      </div>
    </>
  );
};

export default SearchBar;
