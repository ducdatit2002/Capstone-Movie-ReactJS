import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import UserProtected from "./UserProtected";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";



const Home = lazy(() => import("../modules/Home"));
const SignIn = lazy(() => import("../modules/Auth/SignIn"));
const SignUp = lazy(() => import("../modules/Auth/SignUp"));
const Auth = lazy(() => import("../modules/Auth/Auth"));
const Movie = lazy(() => import("../modules/Movie"));
const BookingMovie = lazy(() => import("../modules/BookingMovie"))

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <Home /> },

      { path: "/movie/:movieId", element: <Movie /> },

      { path: "/bookingMovie/:maLichChieu", element: <UserProtected> <BookingMovie /> </UserProtected> },
      
      { path: "", 
      element: <Auth />, 
      children: [
        { path: "/signIn", element: <SignIn />},
        { path: "/signUp", element: <SignUp />},
    ]},
    ],
  },
  {path: "/loading",element: <Loading />},
  { path: "*", element: <NotFound /> },
]);

export default routes;
