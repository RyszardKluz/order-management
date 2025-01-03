import Layout from './components/Layout/Index';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ProductPage from './pages/products/ProductPage';
import ClientsPage from './pages/clients/pages/ClientsPage';
import OrdersPage from './pages/orders/pages/OrdersPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProductPage />} path="/products" />
        <Route element={<ClientsPage />} path="/clients" />
        <Route element={<OrdersPage />} path="/orders" />
      </Routes>
    </Layout>
  );
};

export { App };
