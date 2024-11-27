import { FaSearch, FaChevronDown } from "react-icons/fa";

const SearchBar = ({ search, setSearch, onFilterClick }) => {
  return (
    <div className="search-bar flex items-center bg-gray-300 p-2 rounded-full">
      <FaSearch className="text-red-600 mr-2 fa-search" />
      <input
        type="text"
        placeholder="Buscar"
        className="flex-grow p-2 bg-gray-300 outline-none rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={onFilterClick}
        className="flex items-center space-x-2 p-2 bg-gray-300 rounded-full ml-2"
      >
        <span>Filtros</span>
        <FaChevronDown className="text-black fa-chevron-down" />
      </button>
    </div>
  );
};

export default SearchBar;
