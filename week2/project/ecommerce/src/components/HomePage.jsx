import { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Error while fetching the categories.");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setCategoriesError(error.message);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        let url = "https://fakestoreapi.com/products";
        if (selectedCategory) {
          url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error while fetching the products.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProductsError(error.message);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <>
      <h1>Products</h1>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        loading={categoriesLoading}
        error={categoriesError}
      />
      <ProductList
        products={products}
        loading={productsLoading}
        error={productsError}
      />
    </>
  );
};

export default HomePage;
