import React from "react";

const SearchBar = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={props.searchWrapper}>
      <label>
        <div className={props.iconWrapper}>
          <a>
            <i className={props.icon}></i>
          </a>
          <input
            type="search"
            name="search"
            onChange={props.onChange}
            placeholder={props.placeholder}
          />
        </div>
      </label>
    </form>
  );
};

export default SearchBar;
