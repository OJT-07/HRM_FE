import { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


type Person = {
  employee_ID: number
  code: string;
  name: string;
  phone: string;
  date_of_birth: string;
  skill_ID: number;
  position: string;
  manager: string;
  is_manager: number;
  description: string;


};
const data: Person[] = [
  {
    employee_ID: 1,
    code: "EMP001",
    name: "John Doe",
    phone: "123456789",
    date_of_birth: "1990-01-15",
    skill_ID: 1,
    position: "Developer",
    manager: 'Tuan',
    is_manager: 1,
    description: "Senior Developer",
  },

];

const EmployeesList = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'employee_ID',
        header: 'ID',
        size: 100,
      },

      {
        accessorKey: 'code',
        header: 'Code',
        size: 100,
      },
      {
        accessorKey: 'name',
        header: 'Full Name',
        size: 100,
      },
      {
        accessorKey: 'phone',
        header: 'Phone Number',
        size: 100,
      },
      {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        size: 100,
      },
      {
        accessorKey: 'skill_ID',
        header: 'Skill ID',
        size: 100,
      },
      {
        accessorKey: 'position',
        header: 'position',
        size: 100,
      },
      {
        accessorKey: 'manager',
        header: 'Manager',
        size: 100,
      },
      {
        accessorKey: 'is_manager',
        header: 'Is Manager',
        size: 100,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 100,
      },
    ],
    [],
  );
 
  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Person>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.employee_ID);
    }
  };
  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
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

  return <MaterialReactTable table={table} />
};
export default EmployeesList;

function openDeleteConfirmModal(row: MRT_Row<Person>): void {
  throw new Error('Function not implemented.');
}
function deleteUser(employee_ID: number) {
  throw new Error('Function not implemented.');
}

