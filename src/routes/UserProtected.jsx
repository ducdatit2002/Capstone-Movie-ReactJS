import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'

const UserProtected = ({children}) => {
  const {user} = useSelector(state => state.authSlice);

  //useLocation trả về một object chưa thông tin URL hiện tại 
  const location = useLocation();

  if(!user){
    const url = `/signIn?redirectURL=${location.pathname}`
    return <Navigate to={url} />;
  }

  return children;

};

export default UserProtected;