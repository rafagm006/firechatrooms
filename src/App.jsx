import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Restricted from "./pages/auth/Restricted";
import { Toaster } from 'react-hot-toast';
import Principal from './pages/Principal';
import SignIn from './pages/SignIn';
import Loader from './common/Loader';
import Rutas from './routes';

const DefaultLayout = lazy(() => import('./pages/DefaultLayout'));

function App() {
  //const salasChat = Rutas();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  /*
  if(!loadingSession && !user) {
    return <Navigate to="/auth/signin" replace={true} />
  }
*/
  return(
    loading ? (
      <Loader />
    ) : (
      <>
        <Toaster
          position="top-right"
          reverseOrder={false}
          containerClassName="overflow-auto"
        />
        <Provider store={store}>
          <BrowserRouter>
          <Routes>
              <Route path="/auth/signin" element={<SignIn />} />
              <Route element={<DefaultLayout />}>
                <Route index element={<Principal />} />
                {Rutas.map((routes, index) => {
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
                <Route path="/restricted" element={<Restricted />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </>
    )
  )
}

export default App;
