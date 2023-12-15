import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable,useMaterialReactTable,type MRT_ColumnDef, MRT_Row} from 'material-react-table';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
const TAB_KEYS = {
    INFORMATION: "INFORMATION",
    MEMBERS: "MEMBERS",
};

const dataTabs = [
    {
        label: "Information",
        value: TAB_KEYS.INFORMATION,
    },
    {
        label: "Members",
        value: TAB_KEYS.MEMBERS,
    },
];
interface Member {
  id: number;
  join_date: Date;
  end_date: Date;
  name: string;
}
const EmployeesList = () => {
  const [data, setData] = useState<Member[]>([]);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {
      const response = await axios.get(`https://hrm-server-api.onrender.com/api/projects/${id}`);
      setData(response.data.data.employeeInProject);
      console.log("🚀 ~ file: Details.tsx:49 ~ fetchData ~ response.data.data.employeeInProject:", response.data.data.employeeInProject)
     
      const formattedData = response.data.data.map((member: Member) => ({
        ...member,
       
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  // Columns definition
  const columns = useMemo<MRT_ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No.',
        size: 10,
      },
      {
        accessorKey: 'employee.name',
        header: 'Name',
        size: 10,
      },
      {
        accessorKey: 'position',
        header: 'Position',
        size: 10,
      },
      {
        accessorKey: 'join_date',
        header: 'Join Date',
        size: 10,
        Cell: ({ row }) => new Date(row.original.join_date).toLocaleDateString(),
      },
      {
        accessorKey: 'end_date',
        header: 'End Date',
        size: 10,
        Cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString(),

      },
     
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data
  });

  return <MaterialReactTable table={table}  />;
};
interface Project {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
    technical: string[];

}
const getStatusColorClass = (status: string) => {
    switch (status) {
        case 'pending':
            return 'text-gray-500';
        case 'active':
            return 'text-red-500';
        case 'done':
        default:
            return 'text-blue-gray-600';
    }
};

const renderInformation = () => {
    const [project, setProject] = useState<Project[]>([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://hrm-server-api.onrender.com/api/projects/${id}`);
                setProject(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const formatDate = (dateString: string) => {
        const formattedDate = new Date(dateString).toLocaleDateString('en-US');
        return formattedDate;
    };
    return (

<CardBody>                      
<div className="gap-5 flex justify-between flex-col">
    <div>
        <b> <label className="mb-3 block text-black dark:text-white"> Project Name</label> </b>
        <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ">
            {project?.name}
        </div>
    </div>
    <div className="grid grid-cols-2 gap-5">
      <div>
       <b> <label className="mb-3 block text-black dark:text-white">Start Date</label> </b>
        <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
          {formatDate(project?.start_date)}
        </div>
      </div>
      <div>
      <b> <label className="mb-3 block text-black dark:text-white"> End Date</label> </b>
        <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
          {formatDate(project?.end_date)}
        </div>
      </div>
    </div>
    <div>
       <b> <label className="mb-3 block text-black dark:text-white"> Status</label> </b>
        <div className='border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary    '>
        {/* {getStatusColor(project?.status)} */}
            {project?.status}
        </div>
    </div>
    <div>
       <b> <label className="mb-3 block text-black dark:text-white"> Description</label> </b>
        <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ">
           {project?.description}
        </div>
    </div>
    <div>
       <b> <label className="mb-3 block text-black dark:text-white"> Technical</label> </b>
        <div className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ">
            {project?.technical}
        </div>
    </div>

</div>
</CardBody>
    )
}
const TabKey = () => {
    return (
        <Card>
            <CardHeader className="dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" color="amber">
                <CardBody>
                    <Tabs value={TAB_KEYS.INFORMATION}>

                        <TabsHeader>
                            {dataTabs.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    <div className="flex items-center gap-2">{label}</div>
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel value={TAB_KEYS.INFORMATION}>
                                {renderInformation()}
                            </TabPanel>
                            <TabPanel value={TAB_KEYS.MEMBERS}>
                                {EmployeesList()}
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </CardHeader>
        </Card>
    );
};

export default TabKey;