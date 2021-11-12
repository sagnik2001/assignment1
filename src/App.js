import AuthContextProvider, { useAuth } from "./AuthContext/AuthContext";
import './App.css';
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';
import Home from "./Components/Home/Home"
import { BrowserRouter, Routes, Route, Link ,  Navigate,} from 'react-router-dom';
import Forgot from './Components/ForgotPass/Forgot';
import ProtectedRoute from "./ProtectedRoute";
import ResetPass from "./Components/ResetPass/ResetPass";
function App() {
  const {currentUser}=useAuth()
  return (
    <AuthContextProvider>
    <BrowserRouter>
        <div className="App">
          <Routes>
        
          <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
         
          <Route path="/" element={<Register/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/reset" element={<ResetPass/>} />
          </Routes> 
        </div>
    </BrowserRouter>
    </AuthContextProvider>
  );
}


export default App;
