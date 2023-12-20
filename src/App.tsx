import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense, lazy, useEffect, useState } from 'react';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard/ChartEmployees';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const auth = localStorage.getItem('token');

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/auth/signin' element={<SignIn />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
