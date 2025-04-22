import React from "react";
import { BiSearch } from "react-icons/bi";
import { Button } from "@mui/material";

export default function Searchbar({ onSearch, onSubmit, color }) {
  const [searched, setSearched] = React.useState("");
  return (
    <form
      id="search__bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e, searched);
      }}
      style={{ width: "100%" }}
    >
      <div className="search__bar-input">
        <input
          type="text"
          placeholder="Search..."
          style={{ width: "100%", backgroundColor: color ? color : "#fff" }}
          onChange={(e) => {
            onSearch(e, e.target.value);
            setSearched(e.target.value);
          }}
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="icon_search"
        style={{ minWidth: "40px" }}
      >
        <BiSearch />
      </Button>
    </form>
  );
}
