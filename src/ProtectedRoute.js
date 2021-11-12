import React from 'react'
import{ useAuth } from "./AuthContext/AuthContext";
import { BrowserRouter, Routes, Route, Link ,Redirect} from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
   
        const { currentUser } = useAuth()
       
  
  return (
  
  currentUser ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: '/login',
       
      }}
    />

  
    )
  )
  
}

export default ProtectedRoute
