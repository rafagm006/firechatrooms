// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./components/Chat";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Login from "./pages/Login";
import Auth from "./hoc/Auth";
import Restricted from "./pages/auth/Restricted";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className="min-h-screen min-w-screen bg-gray-100 flex flex-col">
          <Navbar />
          <div className="w-full h-full flex justify-center">
            <div className="container flex text-white p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat/:chatId" element={<Auth><Chat /></Auth>} />
                <Route
                  element={
                    <Auth>
                      <Outlet />
                    </Auth>
                  }
                >
                  <Route path="/restricted" element={<Restricted />} />
                </Route>
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
