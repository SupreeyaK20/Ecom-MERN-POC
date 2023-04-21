// LoginRegisterRoutes.js

import { Navigate, Route, Routes } from "react-router-dom";
import BlogPage from "../pages/admin/BlogPage";
import DashboardAppPage from "../pages/DashboardAppPage";
import ProductsPage from "../pages/ProductsPage";
import UserPage from "../pages/UserPage";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

export default function AdminRoutes(){
    return(
        <>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="/app" />} />
                    <Route path="app" element={<DashboardAppPage />} />
                    <Route path="user" element={<UserPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="blog" element={<BlogPage />} />
                </Route>
            </Routes>
        </>
    )
}
