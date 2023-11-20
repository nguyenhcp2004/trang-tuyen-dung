import { Navigate } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layouts/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Search from "../pages/Search";
import Job from "../pages/Job";
import Admin from "../pages/Admin";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import CvManage from "../pages/CvManage";
import CreateJob from "../pages/JobManage/CreateJob";
import DetailJob from "../pages/JobManage/DetailJob";
import DetailCv from "../pages/CvManage/DetailCv";


export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "job/:id",
                element: <Job />
            },
            {
                path: "*",
                element: <Navigate to = "/"/>
            },
            {
                element: <PrivateRoutes/>,
                children: [
                    {
                        path: "admin",
                        element: <Admin/>,   
                    },
                    {
                        path: "info-company",
                        element: <InfoCompany/>
                    }, 
                    {
                        path: "job-manage",
                        element: <JobManage/>
                    }, 
                    {
                        path: "cv-manage",
                        element: <CvManage/>
                    },
                    {
                        path: "create-job",
                        element: <CreateJob/>
                    },
                    {
                        path: "detail-job/:id",
                        element: <DetailJob/>
                    },
                    {
                        path: "detail-cv/:id",
                        element: <DetailCv/>
                    }                       
                ]
            }
        ]
    }
];