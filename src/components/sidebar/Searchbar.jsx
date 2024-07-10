import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../../lib/utils";
import { Search } from "lucide-react";

const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();

  const updateSearchParams = (value) => {
    setSearchParams({ q: value });
  };

  const debouncedUpdateSearchParams = useDebounce(updateSearchParams, 500);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    debouncedUpdateSearchParams(e.target.value);
  };
  return (
    <div className="search-bar-wrapper">
      <Search className="search-icon" />
      <input
        placeholder="Search"
        onFocus={() => navigate("/search")}
        onChange={handleSearchChange}
        value={inputValue}
        onBlur={() => setInputValue("")}
      />
    </div>
  );
};

export default Searchbar;
