import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Markets from "./pages/markets/Markets";
import Wallet from "./pages/wallet/Wallet";
import Profile from "./pages/profile/Profile";
import MainLayout from "./layouts/mainlayout/MainLayout";
import GravatarAuth from "./pages/auth/GravatarAuth";
import GravatarProfile from "./pages/gravatar-profile/GravatarProfile";
import ProtectedRoute from "./hooks/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <GravatarAuth /> },
  { path: "/gravatar-profile", element: <GravatarProfile /> },

  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "markets", element: <Markets /> },
      { path: "wallet", element: <Wallet /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
