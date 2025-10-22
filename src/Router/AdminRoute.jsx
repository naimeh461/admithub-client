import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Authentication/useAdmin";
import useAuth from "../Authentication/useAuth";

const AdminRoute = ({children}) => {
    let location = useLocation();
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    if(loading || isAdminLoading){
        return <div className="text-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user && isAdmin){
        return children;
    }

    return <Navigate to="/"  state={{from : location}}></Navigate>
};

export default AdminRoute;