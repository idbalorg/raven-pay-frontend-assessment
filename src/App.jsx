import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Markets from "./pages/markets/Markets";
import Wallet from "./pages/wallet/Wallet";
import Profile from "./pages/profile/Profile";
import MainLayout from "./layouts/mainlayout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "markets", element: <Markets /> },
      { path: "wallet", element: <Wallet /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
