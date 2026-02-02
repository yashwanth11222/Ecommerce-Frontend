// App.js
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Orders from "./Components/Orders/Orders";
import Register from "./Components/Users/Register";
import Login from "./Components/Users/Login";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import CategoryProducts from "./Components/Categories/CategoryProducts";
import ProtectedRoute from "./Components/ProtectRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BrandProducts from "./Components/Brand/BrandProducts";

// Routes without Navbar
const noNavbarRoutes = [
  { path: "/", element: <Register /> },
  { path: "/login", element: <Login /> },
];

// Routes with Navbar
const withNavbarRoutes = [
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/products",
    element: (
      <ProtectedRoute>
        <Navbar />
        <BrandProducts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Categories />
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories/:category",
    element: (
      <ProtectedRoute>
        <Navbar />
        <CategoryProducts />
      </ProtectedRoute>
    ),
  },
];


const router = createBrowserRouter([...noNavbarRoutes, ...withNavbarRoutes]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;