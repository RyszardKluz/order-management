import Layout from './components/Layout/Index';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ProductPage from './pages/products/ProductPage';
import ClientsPage from './pages/clients/ClientsPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<HomePage></HomePage>} path="/" />
        <Route element={<ProductPage></ProductPage>} path="/products" />
        <Route element={<ClientsPage></ClientsPage>} path="/clients" />
      </Routes>
    </Layout>
  );
};

export { App };
