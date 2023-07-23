import { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
   const {user,loading}= useContext(AuthContext);
   const location = useLocation();
   if(loading){
     return <span className="loading loading-dots loading-lg"></span>
   }
   if(user){
     return children;   
    }
    else{
        return <Navigate to="/login" state={{from: location}} ></Navigate>
    }
};

export default PrivateRouter;