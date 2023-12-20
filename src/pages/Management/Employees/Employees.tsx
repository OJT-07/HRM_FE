import DeleteIcon from '@mui/icons-material/Delete';
import DetailIcon from '@mui/icons-material/Details';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MRT_Row, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { employeeApi } from '../../../apis/employee.api';
import CreateEmployeeModal from './Create';
import EditModal from './Edit';
import EditEmployeeModel from './Edit';

import { getTokenFromLocalStorage } from '../../../utils/authUtils';

interface Skill {
  exp: string;
  name: string;
}
interface Person {
  id: number;
  name: string;
  phone: string;
  date_of_birth: string;
  skills: Skill[];
}

const MySwal = withReactContent(Swal);

const EmployeesList = () => {
  const [data, setData] = useState<Person[]>([]);
  const [visibleModalAddUpdate, setVisibleModalAddUpdate] = useState<boolean>(false);
  const [visibleModalUpdate, setVisibleModalUpdate] = useState<boolean>(false);
  const [dataEmployee, setDataEmployee] = useState();

  const isAuthenticated = () => {
    const token = getTokenFromLocalStorage();
    return !!token;
  };
  // Fetch data from your API when the component mounts
  useEffect(() => {
    // if (!isAuthenticated()) {
    //   console.log('Người dùng chưa được xác thực. Chuyển hướng đến trang đăng nhập.');

    //   return;
    // }
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hrm-server-api.onrender.com/api/employees`);
        setData(response.data.data);
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

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-server-api.onrender.com/api/employees');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 100,
        enableSorting: false,


      },
      {
        accessorKey: 'phone',
        header: 'Phone Number',
        size: 100,
        enableSorting: false,
        enableGlobalFilter: false,


      },
      {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        size: 100,
        Cell: ({ row }) => new Date(row.original.date_of_birth).toLocaleDateString(),
        enableSorting: false,
        enableGlobalFilter: false,


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
        ),
        enableSorting: false,
        enableGlobalFilter: false,


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
            toast.success(res.data.message || 'Delete Employee successfully');
            fetchData();
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Delete Employee failed');
          }
        });
      }
    });
  };
  const navigate = useNavigate();
  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'modal',
    enableEditing: true,
    enableColumnFilters: false,
    enableRowNumbers: true,
    initialState: {
      sorting: [
        {
          id: 'id', //sort by age by default on page load
          desc: true
        }
      ]
    },
    positionActionsColumn: 'last',
    renderTopToolbarCustomActions: ({ }) => [
      <Button variant='contained' onClick={handleOpenModalAddUpdate}>
        Create New Employee
      </Button>
    ],
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title='Edit'>
          <IconButton onClick={() => handleOpenModalUpdate(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => onDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Details'>
          <IconButton onClick={() => handleDetailsClick(row.original.id)}>
            <DetailIcon />
          </IconButton>
        </Tooltip>
      </Box>
    )
  });

  const onEditSuccess = async () => {
    try {
      const response = await axios.get(`https://hrm-server-api.onrender.com/api/employees`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDetailsClick = (employeeId: number) => {
    // Replace this with your actual details page URL
    navigate(`/management/employees/${employeeId}/detail`);
  };
  return (
    <>
      <MaterialReactTable table={table} />
      {visibleModalAddUpdate && (
        <CreateEmployeeModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />
      )}

      {visibleModalUpdate && (
        <EditEmployeeModel
          visible={visibleModalUpdate}
          onClose={handleCloseModalUpdate}
          dataEmployee={dataEmployee}
          onEditSuccess={onEditSuccess}
        />
      )}
    </>
  );
};

export default EmployeesList;
