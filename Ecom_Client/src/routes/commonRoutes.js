// LoginRegisterRoutes.js

import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SimpleLayout from "../layouts/simple";
import Page404 from "../pages/Page404";
import RegisterPage from "../pages/RegisterPage";


export default function CommonRoutes(){
    return(
        <>
        <Routes>
            <Route path="/" element={<SimpleLayout />}>
              <Route index element={<Navigate to="/login" />} />
              <Route path="404" element={<Page404 />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Routes>
        </>
    )
}
