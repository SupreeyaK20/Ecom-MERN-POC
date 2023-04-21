/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/admin/BlogPage';
import UserPage from './pages/admin/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/admin/ProductsPage';
import DashboardAppPage from './pages/admin/DashboardAppPage';
import RegisterPage from './pages/RegisterPage';
import UserHome from './pages/user/home';
import Loader from './theme/overrides/loader';
import CategoryPage from './pages/admin/CategoryPage';
import Profile from './pages/Profile';

export default function Router() {

  const isAuthenticated = useSelector(state=>state.login.isAuthenticated)
  const token = sessionStorage.getItem('jwtToken');
  const { user , loading} = useSelector(state=>state.login)

  
  if (loading) {
    return <div><Loader/></div>;
  }


  return (
    <Routes>
      {isAuthenticated && token && user.role === 'admin' && (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/app" />} />
          <Route path="app" element={<DashboardAppPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="profile" element={<Profile />} />


          <Route path="404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      )}
      {isAuthenticated && token && user.role === 'user' && (
        <Route path="/" element={<SimpleLayout />}>
          <Route index element={<Navigate to="/app" />} />
          <Route path="app" element={<UserHome />} />

          <Route path="404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      )}
      {!isAuthenticated || !token ? (
        <>
          <Route path="/" element={<SimpleLayout />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="404" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/404" replace />} />
      )}
    </Routes>

  );

  
}
