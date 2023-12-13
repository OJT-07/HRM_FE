
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CreateEmployeeModal from './Create'

import axios from 'axios';

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

const EmployeesList = () => {
  const [data, setData] = useState<Person[]>([]);
  const [visibleModalAddUpdate, setVisibleModalAddUpdate] = useState<boolean>(false)

  // Fetch data from your API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  const handleCloseModalAddUpdate = () => {
    setVisibleModalAddUpdate(false)
  }

  const handleOpenModalAddUpdate = () => {
    setVisibleModalAddUpdate(true)
  }
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
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 100,
      },
      {
        accessorKey: 'phone',
        header: 'Phone Number',
        size: 100,
      },  {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        size: 100,
        Cell: ({ row }) => new Date(row.original.date_of_birth).toLocaleDateString(),
      },  {
        accessorKey: 'skills[name]',
        header: 'Skill',
        size: 100,
        Cell: ({ row }) => (
          <ul>
            {row.original.skills.map((skill: Skill) => (
              <li key={skill.name}>{skill.name} - {skill.exp} years</li>
             

            ))}
          </ul>
        ),
      },  
    ],
    [],
  );

  // DELETE action
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://hrm-server-api.onrender.com/api/employees/${id}`);
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openDeleteConfirmModal = (row: MRT_Row<Person>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
    renderTopToolbarCustomActions: ({  }) => (
        <Button
           variant="contained"
          onClick={handleOpenModalAddUpdate}
        >
          Create New Project
        </Button>
      ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {visibleModalAddUpdate && <CreateEmployeeModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />}
    </>
  );
};

export default EmployeesList;
