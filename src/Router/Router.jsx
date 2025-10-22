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
import Payment from "../Payment/Payment";
import AdminHome from "../Page/Admin/AdminHome";
import Dashboard from "../Page/Admin/Dashboard";
import ManageUser from "../Page/Admin/ManageUser";
import AddUniversity from "../Page/Admin/AddUniversity";
import AdmissionStatus from "../Page/Admin/AdmissionStatus";
import AdminRoute from "./AdminRoute";


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
        element: <PrivateRouter><Admission></Admission></PrivateRouter>,
      },
      {
        path: "/mycollege",
        element: <PrivateRouter> <MyCollege></MyCollege></PrivateRouter>,
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
        element: <PrivateRouter><Profile></Profile></PrivateRouter>,
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
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "admission-form",
        element: <AdmissionFrom></AdmissionFrom>,
      },


    ]
  },
  {
    path: "dashboard",
    element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "adminHome",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
      },
      {
        path: "manageUser",
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>,
      },
      {
        path: "studentStatus",
        element: <AdminRoute><AdmissionStatus></AdmissionStatus></AdminRoute>,
      },
      {
        path: "addClass",
        element: <AdminRoute><AddUniversity></AddUniversity></AdminRoute>,
      },
    ]
  }
]);

export default router;