import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import LoginPage from "./views/LoginPage";
import MiPerfil from "./components/Pages/MiPerfil";
import Dashboard from "./components/Pages/Dashboard";
import { ContextProvider } from "./context/ContextProvider";
import ChangePasswordPage from "./components/Pages/ChangePasswordPage";

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
          <Route path="/perfil" element={<MiPerfil />} />
          <Route path="/cambiar-contrasenia" element={<ChangePasswordPage />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
