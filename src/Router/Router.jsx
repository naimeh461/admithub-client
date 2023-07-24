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
import Error from "../Page/Error/Error";
import ProfileEdit from "../Page/Profile/ProfileEdit";
import GiveReview from "../Layout/Share/GiveReview";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
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
          element:<PrivateRouter> <MyCollege></MyCollege></PrivateRouter>,
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
          path: "/universityDetails/:id",
          element: <PrivateRouter><UniversityDetails></UniversityDetails></PrivateRouter>,
        },
        {
          path: "/admissionfrom/:id",
          element: <PrivateRouter><AdmissionFrom></AdmissionFrom></PrivateRouter>,
          
        },
        {
          path: "/profileEdit/:email",
          element: <PrivateRouter><ProfileEdit></ProfileEdit></PrivateRouter>,
          
        },
        {
          path: "/review/:id",
          element: <PrivateRouter><GiveReview></GiveReview></PrivateRouter>,
          
        },
      ],
    },
  ]);

  export default router;