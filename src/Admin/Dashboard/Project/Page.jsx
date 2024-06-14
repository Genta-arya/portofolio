import React, { useState, useEffect } from "react";

import CardListProduk from "./components/CardListProduk";
import SearchProduk from "./components/SearchProduk";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountDown,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";

import SkeletonGrid from "./components/SkeletonGrid";
import useProjects from "../../../Hooks/project/useProjects";

const Produk = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchProjects, loading, projects, setProjects } =
    useProjects();
  const [sortByPriceDescending, setSortByPriceDescending] = useState(false);

  const filteredData = projects.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortProductsByPriceDescending = () => {
    let sortedProducts;
    if (sortByPriceDescending) {
      sortedProducts = [...projects].sort((a, b) => a.price - b.price);
      setSortByPriceDescending(false);
    } else {
      sortedProducts = [...projects].sort((a, b) => b.price - a.price);
      setSortByPriceDescending(true);
    }
    setProjects(sortedProducts);
  };

  return (
    <>
      <div className="flex   lg:justify-between md:justify-between justify-between flex-row lg:flex-row md:flex-row  items-center mb-4 ">
        <p className="lg:text-lg md:text-lg text-sm font-semibold">
          Project Saya
        </p>
        <button
          onClick={sortProductsByPriceDescending}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FontAwesomeIcon
            icon={sortByPriceDescending ? faSortAmountUp : faSortAmountDown}
            className="mr-1"
          />
          <p className="text-xs">
            {sortByPriceDescending ? "Post Terbaru" : "Post Terlama"}
          </p>
        </button>
      </div>
      <hr className="border-b mb-8"></hr>
      <SearchProduk
        data={projects}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        refresh={fetchProjects}
      />
      {loading ? (
        <SkeletonGrid />
      ) : (
        <CardListProduk
          dataList={filteredData}
          refresh={fetchProjects}
        />
     
      )}
    </>
  );
};

export default Produk;
