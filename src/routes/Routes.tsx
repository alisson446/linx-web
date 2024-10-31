import ReactGA from "react-ga4";
import { Route, Routes, useLocation } from "react-router-dom";

import { ProtectedRoute } from "./RoutesProtected";

import { useGlobal } from "../contexts/UserContext";

// Pages Auth
import Home from "../pages/Home";
import Posts from "../pages/Posts";

// Pages No Auth
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PageNotFound from "../pages/PageNotFound";

export const AppRoutes = () => {
  const location = useLocation();
  const { user } = useGlobal();

  ReactGA.initialize("G-HMJ7F7DKB5");
  ReactGA.send({
    hitType: "pageview",
    page: location.pathname + location.search,
    title: location.pathname,
  });

  const homeElement = <Home />;
  return (
    <Routes>
      {/* Rotas para todos os perfis autenticados */}
      <Route element={<ProtectedRoute isAuth={!!user} />}>
        <Route path="/" element={<Posts />} />
        <Route path="/index.htm" element={homeElement} />
        <Route path="/index.html" element={homeElement} />

        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
