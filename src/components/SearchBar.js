import React from "react";

const SearchBar = ({ sort, filter }) => {
  return (
    <div>
      <div onChange={sort}>
        <strong>Sort by:</strong>
        <label>
          <input
            name="sort"
            type="radio"
            value="Alphabetically"
            checked={null}
          />
          Alphabetically
        </label>
        <label>
          <input name="sort" type="radio" value="Price" checked={null} />
          Price
        </label>
      </div>
      <br />

      <label>
        <strong>Filter:</strong>
        <select onChange={filter}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
