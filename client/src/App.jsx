import Layout from './components/Layout/Index';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Homepage';
import ProductPage from './pages/products/ProductPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<HomePage></HomePage>} path="/" />
        <Route element={<ProductPage></ProductPage>} path="/products/" />
      </Routes>
    </Layout>
  );
};

export { App };
