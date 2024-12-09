import Layout from './components/Layout/Index';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/Homepage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<HomePage></HomePage>} path="/" />
      </Routes>
    </Layout>
  );
};

export { App };
