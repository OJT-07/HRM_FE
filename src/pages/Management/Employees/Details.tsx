import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CardBody, Input } from "@material-tailwind/react";

interface Skills {
  exp: string;
  name: string;
}

interface Employee {
  id: number;
  name: string;
  phone: string;
  date_of_birth: Date;
  skills: Skills[];
  image: string;
  join_date: Date;
  address: string;
  email: string;
  description: string;
}

const EmployeesDetail = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hrm-server-api.onrender.com/api/employees/${id}`);
        setEmployee(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const formatDate = (date: Date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  };

  return (
    <CardBody>
      {employee && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-1">
            {/* <div className="mb-4 mx-auto mb-4 w-32 rounded-lg-center"> */}
            <b>
              <label className="mb-3 block text-black dark:text-white"> Image </label>
            </b>
            <img src={`https://hrm-server-api.onrender.com/${employee?.image}`} alt={employee?.name} className="rounded-full w-48 h-48 mx-auto" />
            <div className="mb-4 mx-auto mb-4 w-32 rounded-lg-center">
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <b>
                  <label className="mb-2 block text-black dark:text-white"> Name </label>
                </b>
                <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {employee.name}
                </div>
              </div>
              <div>
                <b>
                  <label className="mb-2 block text-black dark:text-white"> Phone </label>
                </b>
                <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {employee.phone}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <b>
                  <label className="mb-2 block text-black dark:text-white"> DOB </label>
                </b>
                <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {formatDate(employee.date_of_birth)}
                </div>
              </div>
              <div>
                <b>
                  <label className="mb-2 block text-black dark:text-white"> Join Date </label>
                </b>
                <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {formatDate(employee.join_date)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <b>
                  <label className="mb-2 block text-black dark:text-white"> Email </label>
                </b>
                <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {employee.email}
                </div>
              </div>
              <div>
                <b>
                  <label className="mb-2 block text-black dark:text-white"> Address </label>
                </b>
                <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  {employee.address}
                </div>
              </div>
            </div>

            {/* Other fields and sections go here */}
          </div>

          <div className="col-span-2">
            <div>
              <b>
                <label className="mb-2 block text-black dark:text-white"> Skills </label>
              </b>
              {employee.skills.map((skill: Skills, index: number) => (
                <div key={index} className='border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mb-2'>
                  {skill.name} - {skill.exp} years
                </div>
              ))}
            </div>

            <div>
              <b>
                <label className="mb-2 block text-black dark:text-white"> Description </label>
              </b>
              <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                {employee.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </CardBody>
  );
}

export default EmployeesDetail;
