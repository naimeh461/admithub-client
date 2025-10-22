import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Authentication/useAuth";
import useStudent from "../Authentication/useStudent";


const StudentRoute = ({children}) => {
    let location = useLocation();
    const {user, loading} = useAuth();
    const [isStudent, isStudentLoading] = useStudent();
    if(loading || isStudentLoading){
        return <div className="text-center"><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user && isStudent){
        return children;
    }

    return <Navigate to="/"  state={{from : location}}></Navigate>
};

export default StudentRoute;