import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/Utils/constants'

import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                console.log("Fetching companies...");
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                });
                
                if (res.data.success) {
                    console.log("Companies fetched successfully:", res.data.companies);
                    dispatch(setCompanies(res.data.companies || []));
                } else {
                    console.log("No success in response:", res.data);
                    dispatch(setCompanies([]));
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
                dispatch(setCompanies([]));
            }
        }
        
        fetchCompanies();
    }, [dispatch]);
}

export default useGetAllCompanies;