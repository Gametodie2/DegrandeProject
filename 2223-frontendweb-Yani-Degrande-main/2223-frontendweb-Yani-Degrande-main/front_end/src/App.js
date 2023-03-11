import { Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

import Layout from "./components/Layout";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Reservation from "./scenes/Reservations";
import NotFound from "./scenes/NotFound";
import AuthLanding from "./components/authentication/AuthLanding";
import RequireAuth from "./components/authentication/RequireAuth";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";
import DashboardHome from "./scenes/DashboardHome";

import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1250);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <HashLoader color={"#959393"} loading={loading} size={50} />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="reservation"
              element={
                <RequireAuth>
                  <Reservation />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          <Route path="/login" element={<AuthLanding />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
