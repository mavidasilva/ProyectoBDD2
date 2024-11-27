import { useState, useEffect } from "react";
import { getAllProducts } from "../controllers/product";
import ProductList from "../components/ProductList";
import FilterModal from "../components/FilterModal";
import NoProductsModal from "../components/NoProductsModal";
import SearchBar from "../components/SearchBar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showNoProductsModal, setShowNoProductsModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList = await getAllProducts();
      setProducts(productsList);
      setFilteredProducts(productsList);
    };
    fetchProducts();
  }, []);

  const applyFilters = ({ filterType, minPrice, maxPrice }) => {
    let filtered = products;

    if (filterType) {
      filtered = filtered.filter(
        (product) => product.type.toLowerCase() === filterType.toLowerCase()
      );
    }
    const min = minPrice !== "" ? parseFloat(minPrice) : 0;
    const max =
      maxPrice !== "" && maxPrice !== undefined
        ? parseFloat(maxPrice)
        : Number.MAX_VALUE;

    filtered = filtered.filter(
      (product) => product.price >= min && product.price <= max
    );

    if (filtered.length === 0) {
      setShowNoProductsModal(true);
      setFilteredProducts(products);
    } else {
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;
      if (search) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      setFilteredProducts(filtered);
    };
    filterProducts();
  }, [search, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 bg-gray-100 flex-grow">
        <SearchBar
          search={search}
          setSearch={setSearch}
          onFilterClick={() => setShowFilterModal(true)}
        />
        <div className="mt-4">
          <ProductList products={filteredProducts} />
        </div>
      </div>
      <FilterModal
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={applyFilters}
      />
      <NoProductsModal
        show={showNoProductsModal}
        onClose={() => {
          setShowNoProductsModal(false);
          setFilteredProducts(products);
        }}
      />
    </div>
  );
};

export default ProductsPage;
