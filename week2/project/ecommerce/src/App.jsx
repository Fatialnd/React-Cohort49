import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductCard from "./components/ProductCard";
import FavouritesPage from "./components/FavouritesPage";
import { FavouritesProvider } from "./context/FavouritesContext";
import HomePage from "./components/HomePage";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

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
    <FavouritesProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
                products={products}
                productsLoading={productsLoading}
                productsError={productsError}
              />
            }
          />
          <Route path="/product/:id" element={<ProductCard />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </Router>
    </FavouritesProvider>
  );
}

export default App;
