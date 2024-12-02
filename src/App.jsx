import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Homepage } from "./layouts/Homepage";
import { Loginpage } from "./layouts/Loginpage";
import { Registerpage } from "./layouts/Registerpage";
import { NoFoundpage } from "./layouts/NoFoundpage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Homepage />,
  },
  {
    path: "/auth",
    children: [
      { path: "", element: <NoFoundpage /> },
      { path: "login", element: <Loginpage /> },
      { path: "register", element: <Registerpage /> },
    ],
  },
  {
    path: "*",
    element: <NoFoundpage />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
