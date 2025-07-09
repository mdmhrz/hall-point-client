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
import PrivateRoutes from "../routes/PrivateRoutes";
import MealDetails from "../pages/MealDetails/MealDetails";
import Checkout from "../pages/Checkout/Checkout";
import Forbidden from "../components/Forbidden";
import AdminRoutes from "../routes/AdminRoutes";
import UserRoutes from "../routes/UserRoutes";

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
            {
                path: 'meal-details/:id',
                Component: MealDetails
            },
            {
                path: 'checkout/:selectedPlan',
                element: <PrivateRoutes><Checkout></Checkout></PrivateRoutes>
            },
            {
                path: 'forbidden',
                element: <Forbidden></Forbidden>
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

            // User Only routes
            {
                path: 'my-profile',
                element: <UserRoutes><MyProfile></MyProfile></UserRoutes>
            },
            {
                path: 'requested-meals',
                element: <UserRoutes><RequestedMeals></RequestedMeals></UserRoutes>
            },
            {
                path: 'my-reviews',
                element: <UserRoutes><MyReviews></MyReviews></UserRoutes>
            },
            {
                path: 'payment-history',
                element: <UserRoutes><PaymentHistory></PaymentHistory></UserRoutes>
            },


            //Admin only Routes

            {
                path: 'admin-profile',
                element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
            },
            {
                path: 'manage-users',
                element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
            },
            {
                path: 'add-meal',
                element: <AdminRoutes><AddMeal></AddMeal></AdminRoutes>
            },
            {
                path: 'all-meals',
                element: <AdminRoutes><AllMeals></AllMeals></AdminRoutes>
            },
            {
                path: 'all-reviews',
                element: <AdminRoutes><AllReviews></AllReviews></AdminRoutes>
            },
            {
                path: 'serve-meals',
                element: <AdminRoutes><ServeMeals></ServeMeals></AdminRoutes>
            },
            {
                path: 'upcoming-meals',
                element: <AdminRoutes><UpcomingMeals></UpcomingMeals></AdminRoutes>
            }
        ]
    },
    {
        path: '/*',
        element: <p>Wrong Place</p>
    }
])

export default router;