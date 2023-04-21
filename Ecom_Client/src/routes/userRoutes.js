// LoginRegisterRoutes.js

import { Navigate, Route, Routes } from "react-router-dom";
import SimpleLayout from "../layouts/simple/SimpleLayout";
import Page404 from "../pages/Page404";
import UserHome from "../pages/user/home";


export default function UserRoutes(){
    return(
        <>
            <Routes>
            <Route path="/" element={<SimpleLayout />}>
                <Route index element={<Navigate to="/app" />} />
                <Route path="app" element={<UserHome />} />

                <Route path="404" element={<Page404 />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Route>
            </Routes>
        </>
    )
}
