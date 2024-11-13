import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";

import LoginPage from "./views/LoginPage";
import Home from "./views/Home";
import LoginPg from "./components/Pages/LoginPg";
import Dashboard from "./components/Pages/Dashboard";
import { ContextProvider } from "./context/ContextProvider";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ContextProvider>
                  <Dashboard />
                </ContextProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
