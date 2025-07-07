import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { rules } from "eslint-plugin-react-refresh";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'auth/login',
                Component: Login
            },
            {
                path: 'auth/register',
                Component: Register
            }
        ]

    }
])

export default router;