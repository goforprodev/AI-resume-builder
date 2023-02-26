import { useState } from "react";
import Home from "./components/Home";
import Resume from "./components/Resume";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/resume",
    element: <Resume />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router}> </RouterProvider>;
}

export default App;
