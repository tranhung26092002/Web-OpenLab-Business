import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import {
  unstable_HistoryRouter as HistoryBrowser,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import { history } from './util/config';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';

import RoleGuard from './components/RoleGuard';
import AuthGuard from './components/AuthGuard';

import AdminPage from './pages/AdminPage/AdminPage';
import ContactPage from './pages/Home/Contact/Contact';
import AboutPage from './pages/Home/About/About';
import BlogPage from './pages/Home/Blog/Blog';
import ProductsPage from './pages/Home/Products/Products';
import MyLearningPage from './pages/Home/MyLearning/MyLearning';
import DashBoardPage from './pages/DashBoard/DashBoard';

import ProductsDetailPage from './pages/Home/Products/ProductsDetail/ProductsDetai';
import MyLearningDetailPage from './pages/Home/MyLearning/MyLearningDetail/MyLearningDetail';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryBrowser history={ history as any}>
      <Routes>

      {/* <Route path="/admin" element={<RoleGuard requiredRole="cutomer"><AdminPage /></RoleGuard>} /> */}

        <Route path="" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<RoleGuard requiredRole="admin"><AdminPage></AdminPage></RoleGuard>}></Route>

        <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
        <Route path='/about' element={<AboutPage></AboutPage>}></Route>
        <Route path='/blog' element={<BlogPage></BlogPage>}></Route>
        <Route path='/products' element={<ProductsPage></ProductsPage>}></Route>
        <Route path='/my-learning' element={<AuthGuard><MyLearningPage></MyLearningPage></AuthGuard>}></Route>

        <Route path='/my-learning/detail' element={<AuthGuard><MyLearningDetailPage></MyLearningDetailPage></AuthGuard>}></Route>
        <Route path='/products/detail' element={<ProductsDetailPage></ProductsDetailPage>}></Route>

        <Route path='/dashboard' element={<DashBoardPage></DashBoardPage>}></Route>

        <Route path='*' element={<Navigate to="" />}></Route>
      </Routes>
    </HistoryBrowser>
  </Provider >
);