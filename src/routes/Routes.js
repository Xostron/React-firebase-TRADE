import { Navigate } from "react-router";
import { AboutPage } from "../pages/AboutPage";
import { DetailTradePage } from "../pages/DetailTradePage";
import { TradesPage } from "../pages/TradesPage";

export const PublicRoutes = [
    { path: '/', element: <TradesPage /> },
    { path: '/trades/:id', element: <DetailTradePage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '*', element: <Navigate replace to='/' /> }
]

export const PrivateRoutes = [
    { path: '/about', element: <AboutPage /> },
    { path: '*', element: <Navigate replace to='/about' /> }
]
