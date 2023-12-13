import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CardBody } from "@material-tailwind/react";

interface Skills {
  exp: string;
  name: string;
}

interface Manager {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  name: string;
  phone: string;
  date_of_birth: Date;
  skills: Skills[];
  manager: Manager[];
  image: string;
}

const RenderInformation = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hrm-server-api.onrender.com/api/employees/${id}`);
        setEmployee(response.data.data);
        console.log(response.data.data);
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
        <div className="gap-5 flex justify-between flex-col">
          <div>
            <b> <label className="mb-3 block text-black dark:text-white"> Employee Name </label> </b>
            <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ">
              {employee.name}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <b> <label className="mb-3 block text-black dark:text-white"> Phone </label> </b>
              <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                {employee.phone}
              </div>
            </div>
            <div>
              <b> <label className="mb-3 block text-black dark:text-white"> Date_of_birth </label> </b>
              <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                {formatDate(employee.date_of_birth)}
              </div>
            </div>
          </div>
          <div>
            <b> <label className="mb-3 block text-black dark:text-white"> Skills</label> </b>
            {employee.skills.map((skill: Skills, index: number) => (
              <div key={index} className='border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary    '>
                {skill.name} - {skill.exp} years
              </div>
            ))}
          </div>
          <div>
            <b> <label className="mb-3 block text-black dark:text-white"> Manager</label> </b>
            <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ">
              {employee.manager.map((mgr: Manager, index: number) => (
                <div key={index}>{mgr.name}</div>
              ))}
            </div>
          </div>
          <div>
            <b> <label className="mb-3 block text-black dark:text-white"> Image </label> </b>
            <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ">
              {employee.image}
            </div>
          </div>
        </div>
      )}
    </CardBody>
  );
}

export default RenderInformation;
