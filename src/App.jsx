import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Homepage } from "./layouts/Homepage";
import { Loginpage } from "./layouts/Loginpage";
import { Registerpage } from "./layouts/Registerpage";
import { NoFoundpage } from "./layouts/NoFoundpage";
import { Documentspage } from "./layouts/Documentspage";
import { Documentpage } from "./layouts/Documentpage";
import { AddCollaboratorpage } from "./layouts/AddCollaboratorpage";

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
    path: "/documents",
    children: [
      { path: "", element: <Documentspage /> },
      { path: ":documentId", element: <Documentpage /> },
      { path: "sharing/:token", element: <AddCollaboratorpage /> },
    ],
  },
  {
    path: "*",
    element: <NoFoundpage />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
