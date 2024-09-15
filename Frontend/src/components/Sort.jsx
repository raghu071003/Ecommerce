import React from 'react';

const Sort = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex justify-center items-center gap-4 m-3">
      <label htmlFor="sort" className="text-lg font-semibold">Sort By:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
};

export default Sort;
