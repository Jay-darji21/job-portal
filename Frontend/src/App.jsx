import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import Jobs from './Components/Jobs'
import Browse from './Components/Browse'
import Profile from './Components/Profile'
import JobDescription from './Components/JobDescription'
import Company from './Components/Admin/Company'
import CompanyCreate from './Components/Admin/CompanyCreate'
import CompanySetup from './Components/Admin/CompanySetup'
import AdminJobs from './Components/Admin/adminJobs'
import JobPost from './Components/Admin/JobPost'
import Applicant from './Components/Admin/Applicant'
import ProtectRoute from './Components/Admin/ProctectedRoute'


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/jobs/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  // Admin pages
  {
    path : "/admin/companies",
    element : <ProtectRoute><Company/></ProtectRoute>
  },
  {
    path : "/admin/companies/create",
    element : <ProtectRoute><CompanyCreate/></ProtectRoute>
  },
  {
    path : "/admin/company/:id",
    element : <ProtectRoute><CompanySetup/></ProtectRoute>
  },
  {
    path : "/admin/jobs",
    element : <ProtectRoute><AdminJobs/></ProtectRoute>
  },
  {
    path : "/admin/job/create",
    element : <ProtectRoute><JobPost/></ProtectRoute>
  },
  {
    path : "/admin/jobs/:id/applicants",
    element : <ProtectRoute><Applicant/></ProtectRoute>
  }
])

function App() {
  

  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
