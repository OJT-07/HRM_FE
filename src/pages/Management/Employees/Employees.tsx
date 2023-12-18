<<<<<<< HEAD
import { toast } from 'react-toastify';
import { employeeApi } from '../../../apis/employee.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import Swal from 'sweetalert2';
import axios from 'axios';
=======
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
>>>>>>> 5a89ae4929d95aa4006c652ffcd40d6d16f451f7
import Button from '@mui/material/Button';
import { MRT_Row, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import CreateEmployeeModal from './Create';
import EditModal from './Edit';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { employeeApi } from '../../../apis/employee.api';
import { showToast } from '../../../components/ToastCustom';
interface Skill {
  exp: string;
  name: string;
}
interface Person {
  id: number;
  name: string;
  phone: string;
  join_date: Date;
  date_of_birth: Date;
  skills: Skill[];
}

const MySwal = withReactContent(Swal);

const EmployeesList = () => {
  const [data, setData] = useState<Person[]>([]);
  const [visibleModalAddUpdate, setVisibleModalAddUpdate] = useState<boolean>(false);
  const [visibleModalUpdate, setVisibleModalUpdate] = useState<boolean>(false);
  const [dataEmployee, setDataEmployee] = useState();
  const [idEmp, setIdEmp] = useState<string | number>('');

  // Fetch data from your API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch employee data from the server
        const response = await axios.get(`https://hrm-server-api.onrender.com/api/employees`);
        setData(response.data.data);
        console.log('🚀 ~ file: Employees.tsx:37 ~ fetchData ~ response:', response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [visibleModalAddUpdate]);
  const handleCloseModalAddUpdate = () => {
    setVisibleModalAddUpdate(false);
  };

  const handleOpenModalAddUpdate = () => {
    setVisibleModalAddUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setVisibleModalUpdate(false);
  };

  const handleOpenModalUpdate = (row: any) => {
    setVisibleModalUpdate(true);
    setDataEmployee(row.original);
  };

  // Call Api get Emp
  const getEmployee = useQuery({
    queryKey: ['employee', idEmp],
    queryFn: () => employeeApi.getEmp(idEmp),
    enabled: Boolean(idEmp),
    retry: 0
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-server-api.onrender.com/api/employees');
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Columns definition
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 100
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 100
      },
      {
        accessorKey: 'phone',
        header: 'Phone Number',
        size: 100
      },
      {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        size: 100,
        Cell: ({ row }) => new Date(row.original.date_of_birth).toLocaleDateString()
      },
      {
        accessorKey: 'skills[name]',
        header: 'Skill',
        size: 100,
        Cell: ({ row }) => (
          <ul>
            {row.original.skills.map((skill: Skill) => (
              <li key={skill.name}>
                {skill.name} - {skill.exp} years
              </li>
            ))}
          </ul>
        )
      }
    ],
    []
  );

  const deleteEmployeeMutation = useMutation({
    mutationFn: (id: any) => {
      return employeeApi.delete(id);
    }
  });

  const onDelete = (row: MRT_Row<Person>) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployeeMutation.mutate(row.original.id, {
          onSuccess: (res) => {
            showToast('Delete Employee successfully', 'success');
            // toast.success(res.data.message || 'Delete Employee successfully');
            fetchData();
          },
          onError: (err: any) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'Delete Employee failed');
          }
        });
      }
    });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
    renderTopToolbarCustomActions: ({}) => (
      <Button variant='contained' onClick={handleOpenModalAddUpdate}>
        Create New Employee
      </Button>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title='Edit'>
          <IconButton
            onClick={() => {
              handleOpenModalUpdate(row);
              setIdEmp(row.original.id as string | number);
            }}
          >
            {/* Use an arrow function to wrap the function call */}
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => onDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    )
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {visibleModalAddUpdate && (
        <CreateEmployeeModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />
      )}

<<<<<<< HEAD
      {visibleModalUpdate && getEmployee?.data?.data?.data && (
        <EditEmployeeModel
          visible={visibleModalUpdate}
          onClose={handleCloseModalUpdate}
          // initData={getEmployee?.data?.data?.data}
          initData={dataEmployee}
        />
=======
      {visibleModalUpdate && (
        <EditModal visible={visibleModalUpdate} onClose={handleCloseModalUpdate} dataEmployee={dataEmployee} />
>>>>>>> 5a89ae4929d95aa4006c652ffcd40d6d16f451f7
      )}
    </>
  );
};

export default EmployeesList;
