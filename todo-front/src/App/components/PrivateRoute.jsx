import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const res = useSelector((state)=>state.user.login);

    if(res && res.username && res.userId) {
        return (
            <div>
              {children}
            </div>
          )
    } else return <Navigate to="/login"/>

}

export default PrivateRoute;
