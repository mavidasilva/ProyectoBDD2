import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "./layout/LayoutPublic";
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import DashBoardPage from "./pages/DashBoardPage";

export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutPublic />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/productos",
        element: <ProductsPage />,
      },
      {
        path: "/productos/:id",
        element: <ProductDetails />,
      },
      {
        path: "/carrito",
        element: <Cart />,
      },
      {
        path: "/perfil", // Nueva ruta
        element: <ProfilePage />,
      },
      {
        path: "/dashboard", // Nueva ruta del DashBoard
        element: (
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
