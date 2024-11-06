import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./views/StudentDashboard";
import Home from "./views/Home";
import LoginPg from "./components/Pages/LoginPg";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <StudentDashboard/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/lg" element={<LoginPg />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
