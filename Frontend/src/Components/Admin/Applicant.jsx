import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { APPLICATION_API_END_POINT } from '@/Utils/constants';
import { setAllApplicants } from '@/redux/application';
import ApplicantTable from './ApplicantTable';

const Applicant = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                console.log("Fetching applicants for job ID:", params.id);
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { 
                    withCredentials: true 
                });
                
                if (res.data.success) {
                    console.log("Applicants data received:", res.data.job);
                    dispatch(setAllApplicants(res.data.job));
                } else {
                    console.log("Failed to fetch applicants:", res.data);
                    dispatch(setAllApplicants(null));
                }
            } catch (error) {
                console.error("Error fetching applicants:", error);
                dispatch(setAllApplicants(null));
            }
        }
        
        if (params.id) {
            fetchAllApplicants();
        }
    }, [params.id, dispatch]);
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>
                    Applicants ({applicants?.applications?.length || 0})
                </h1>
                <ApplicantTable />
            </div>
        </div>
    )
}

export default Applicant