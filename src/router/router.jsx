import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import { rules } from "eslint-plugin-react-refresh";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Meals from "../pages/Meals/Meals";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AddMeal from "../pages/Dashboard/AddMeal/AddMeal";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import RequestedMeals from "../pages/Dashboard/RequestedMeals/RequestedMeals";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AllMeals from "../pages/Dashboard/AllMeals/AllMeals";
import AllReviews from "../pages/Dashboard/AllReviews/AllReviews";
import ServeMeals from "../pages/Dashboard/ServeMeals/ServeMeals";

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
            },
            {
                path: 'meals',
                Component: Meals
            },
            {
                path: 'upcoming-meals',
                Component: UpcomingMeals
            },
        ]

    },
    {
        path: 'dashboard',
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardHome
            },

            // User Routes
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'requested-meals',
                Component: RequestedMeals
            },
            {
                path: 'my-reviews',
                Component: MyReviews
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },

            //Admin Routes

            {
                path: 'admin-profile',
                Component: AdminProfile
            },
            {
                path: 'manage-users',
                Component: ManageUsers
            },
            {
                path: 'add-meal',
                Component: AddMeal
            },
            {
                path: 'all-meals',
                Component: AllMeals,
            },
            {
                path: 'all-reviews',
                Component: AllReviews,
            },
            {
                path: 'serve-meals',
                Component: ServeMeals,
            },
            {
                path: 'upcoming-meals',
                Component: UpcomingMeals
            },


        ]
    }
])

export default router;