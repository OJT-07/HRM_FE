import { employeeApi } from '../../../apis/employee.api';
import { useMutation } from '@tanstack/react-query';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CreateEmployeeModal from './Create';
import EditModal from './Edit'
import axios from 'axios';
import { employeeApi } from '../../../apis/employee.api';
import toast from 'react-hot-toast';
import { showToast } from '../../../components/ToastCustom';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditEmployeeModel from './Edit';
import CreateEmployeeModal from './Create';

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

  // Fetch data from your API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hrm-server-api.onrender.com/api/employees`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title='Edit'>
          <IconButton onClick={() => handleOpenModalUpdate(row)}>
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

  const onEditSuccess = async () => {
    try {
      const response = await axios.get(`https://hrm-server-api.onrender.com/api/employees`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      <MaterialReactTable table={table} />
      {visibleModalAddUpdate && (
        <CreateEmployeeModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />
      )}

      {visibleModalUpdate && (
        <EditEmployeeModel visible={visibleModalUpdate} onClose={handleCloseModalUpdate} dataEmployee={dataEmployee} onEditSuccess={onEditSuccess} />
      )}
    </>
  );
};

export default EmployeesList;
