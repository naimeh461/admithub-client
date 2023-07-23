import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Admission from "../Page/Admission/Admission";
import MyCollege from "../Page/MyCollege/MyCollege";
import Colleges from "../Page/Colleges/Colleges";
import LogIn from "../Page/login/login";
import Register from "../Page/Register/Register";
import Forget from "../Page/ForgetPage/Forget";
import Profile from "../Page/Profile/Profile";
import UniversityDetails from "../Layout/Share/UniversityDetails";
import PrivateRouter from "./PrivateRouter";
import AdmissionFrom from "../Page/Admission/AdmissionFrom";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/admission",
          element:  <PrivateRouter><Admission></Admission></PrivateRouter> ,
        },
        {
          path: "/mycollege",
          element: <MyCollege></MyCollege>,
        },
        {
          path: "/colleges",
          element: <Colleges></Colleges>,
        },
        {
          path: "/login",
          element: <LogIn></LogIn>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
        {
          path: "/forget",
          element: <Forget></Forget>,
        },
        {
          path: "/profile",
          element: <Profile></Profile>,
        },
        {
          path: "/unidetail/:id",
          element: <PrivateRouter><UniversityDetails></UniversityDetails></PrivateRouter>,
          loader: ({params}) => fetch(`http://localhost:3000/universityDetails/${params.id}`)
        },
        {
          path: "/admissionfrom/:id",
          element: <AdmissionFrom></AdmissionFrom>,
          loader: ({params}) => fetch(`http://localhost:3000//admissionData/${params.id}`)
        },
      ],
    },
  ]);

  export default router;