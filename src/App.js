// App.js
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Layout";
import Login from "./screens/Login";
import { HomeScreen } from "./screens/Home";
import { CustomerScreen } from "./screens/Customers";
import { ProductScreen } from "./screens/Products";
import { OrderScreen } from "./screens/Orders";
import { CatagoriesScreen } from "./screens/Categories/Catagories";
import { Setting } from "./screens/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<HomeScreen />} />
          <Route path="products" element={<ProductScreen />} />
          <Route path="catagories" element={<CatagoriesScreen />} />
          <Route path="orders" element={<OrderScreen />} />
          <Route path="users" element={<CustomerScreen />} />
          <Route path="settings" element={<Setting />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
