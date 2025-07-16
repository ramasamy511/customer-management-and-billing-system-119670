import React, { useState } from "react";

/**
 * Search/filter component for customer list.
 * @param {function} onSearch - Called with search query string.
 */
 // PUBLIC_INTERFACE
function CustomerSearch({ onSearch }) {
  const [query, setQuery] = useState("");
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
        placeholder="Search customers by name, company, or email…"
        style={{ padding: 8, minWidth: 250 }}
      />
    </div>
  );
}

export default CustomerSearch;
