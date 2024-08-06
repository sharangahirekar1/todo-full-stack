import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    let res = useSelector((state)=>state.user.login);

    const user = JSON.parse(localStorage.getItem("user"));

    if (!res) res = user

    if(res && res.token ) {
        return (
            <div>
              {children}
            </div>
          )
    } else return <Navigate to="/login"/>

}

export default PrivateRoute;
