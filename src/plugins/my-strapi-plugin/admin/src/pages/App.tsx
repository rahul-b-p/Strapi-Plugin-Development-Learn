import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import SecondPage from './SecondPage';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="second-page" element={<SecondPage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
