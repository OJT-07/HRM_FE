import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { getTokenFromLocalStorage } from './utils/authUtils'; // Replace with the actual path

import ECommerce from './pages/Dashboard/ChartProjects';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const token = getTokenFromLocalStorage();

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position='top-center' reverseOrder={false} containerClassName='overflow-auto' />
      <Routes>
        {token ? (
          <Route element={<DefaultLayout />}>
            <Route index element={<ECommerce />} />
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <Suspense fallback={<Loader />}>
                    <route.component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        ) : (
          <>
            <Route path='/auth/signin' element={<SignIn />} />
            <Route path='/auth/signup' element={<SignUp />} />
            <Route
              path='/'
              element={<Navigate to='/auth/signin' />} // Redirect to /auth/signin if no token
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
