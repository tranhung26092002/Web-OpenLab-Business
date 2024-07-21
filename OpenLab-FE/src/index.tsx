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
import DashBoardPage from './pages/DashBoard/DashBoard';

import AuthGuard from './components/AuthGuard';
import AdminPage from './pages/AdminPage/AdminPage';
import ContactPage from './pages/Home/Contact/Contact';
import AboutPage from './pages/Home/About/About';
import BlogPage from './pages/Home/Blog/Blog';
import ProductsPage from './pages/Home/Products/Products';
import MyLearningPage from './pages/Home/MyLearning/MyLearning';
import ProductsDetailPage from './pages/Home/Products/ProductsDetail/ProductsDetai';
import MyLearningDetailPage from './pages/Home/MyLearning/MyLearningDetail/MyLearningDetail';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryBrowser history={ history as any}>
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="/home" element={<AuthGuard><Home /></AuthGuard>}></Route>
        <Route path='/admin' element={<AuthGuard><AdminPage /></AuthGuard>}></Route>
        <Route path='/dashboard' element={<DashBoardPage></DashBoardPage>}></Route>

        <Route path='/contact' element={<AuthGuard><ContactPage></ContactPage></AuthGuard>}></Route>
        <Route path='/about' element={<AuthGuard><AboutPage></AboutPage></AuthGuard>}></Route>
        <Route path='/my-learning' element={<AuthGuard><MyLearningPage></MyLearningPage></AuthGuard>}></Route>
        <Route path='/blog' element={<AuthGuard><BlogPage></BlogPage></AuthGuard>}></Route>
        <Route path='/products' element={<AuthGuard><ProductsPage></ProductsPage></AuthGuard>}></Route>

        <Route path='/my-learning/detail' element={<AuthGuard><MyLearningDetailPage></MyLearningDetailPage></AuthGuard>}></Route>
        <Route path='/products/detail' element={<AuthGuard><ProductsDetailPage></ProductsDetailPage></AuthGuard>}></Route>

        <Route path='*' element={<Navigate to="" />}></Route>
      </Routes>
    </HistoryBrowser>
  </Provider >
);