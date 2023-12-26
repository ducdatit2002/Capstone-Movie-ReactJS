import { RouterProvider } from "react-router-dom";
import { Suspense } from "react"
import routes from "./routes/routes";
import "./App.scss";
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <RouterProvider router={routes} />
    </Suspense>

  );
}

export default App;
