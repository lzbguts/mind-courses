import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

const routes = createBrowserRouter([
    {
        path: '/',
        Component: Home
    },
    {
        path: '/about',
        Component: About
    },
    {
        path: '/admin',
        Component: Admin
    },
    {
        path: '*',
        element: <div><p>Not Found</p></div>
    }
]);

export default routes;