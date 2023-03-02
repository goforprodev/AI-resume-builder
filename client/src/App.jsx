import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";

function App() {
  const [result, setResult] = useState({});
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home setResult={setResult} />,
    },
    {
      path: "/resume",
      element: <Resume result={result} />,
    },
  ]);

  return <RouterProvider router={router}> </RouterProvider>;
}

export default App;
