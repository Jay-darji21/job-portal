import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompanyTable() {
  const { companies = [], searchCompanyByText = "" } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState([]);
  const navigate = useNavigate();
  
  console.log("Companies in table:", companies);
  
  useEffect(() => {
    if (!companies || !Array.isArray(companies)) {
      console.log("No companies data or invalid format");
      setFilterCompany([]);
      return;
    }
    
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    
    console.log("Filtered companies:", filteredCompany);
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany && filterCompany.length > 0 ? (
            filterCompany.map((company, index) => (
              <TableRow key={company?._id || index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage 
                      src={company?.logo} 
                      style={{ height: '40px', width: '5rem' }}
                      alt={company?.name || "Company logo"}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name || "N/A"}</TableCell>
                <TableCell>{company?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 cursor-pointer">
                      <div 
                        onClick={() => navigate(`/admin/company/${company?._id}`)} 
                        className="flex items-center gap-4 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompanyTable;
