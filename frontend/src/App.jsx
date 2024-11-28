import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import Home from "./views/Home";
import LoginPage from "./views/LoginPage";
import Dashboard from "./components/Pages/Dashboard";
import { ContextProvider } from "./context/ContextProvider";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<ContextProvider>
                  <Home />
                </ContextProvider>} />
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
