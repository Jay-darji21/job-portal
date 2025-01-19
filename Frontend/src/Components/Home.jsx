import React, { useEffect } from 'react'
import Navbar from './Shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCareosal from './CategoryCareosal'
import LatestJob from './LatestJob'
import Footer from './Shared/Footer'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  console.log("Call function");
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user?.role=='recruiter'){
      navigate("/admin/companies")
    }
  },[])
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCareosal/>
      <LatestJob/>
      <Footer/>
    </div>
  )
}

export default Home
