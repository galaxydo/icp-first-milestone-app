import { h } from 'preact';

export default function SearchBar({ searchText, styleClass, placeholderText, setSearchText }) {
  return (
    <div className={`inline-block ${styleClass}`}>
      <div className="input-group relative flex flex-wrap items-stretch w-full">
        <input
          type="search"
          value={searchText}
          placeholder={placeholderText || "Search"}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-sm input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
}
