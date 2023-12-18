import { projectApi } from '../../../apis/project.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import withReactContent from 'sweetalert2-react-content';
<<<<<<< HEAD
import EditProjectModal from './Update';
import CreateProjectModal from './Create';
=======
import UpdateProjectModal from './Update';;
>>>>>>> 5a89ae4929d95aa4006c652ffcd40d6d16f451f7

import Button from '@mui/material/Button';
import CreateProjectModal from './Create';
import axios from 'axios';
interface Project {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  description: string;
  technical: string[];
}

const MySwal = withReactContent(Swal);

const ProjectsList = () => {
  const [data, setData] = useState<Project[]>([]);
  const [visibleModalAddUpdate, setVisibleModalAddUpdate] = useState<boolean>(false);
  const [visibleModalUpdate, setVisibleModalUpdate] = useState<boolean>(false);
  const [dataProject, setdataProject] = useState<object>({});
  const [idProject, setIdProject] = useState<string | number>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://hrm-server-api.onrender.com/api/projects`);
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

  const updatedModalOpen = (row: any) => {
    setVisibleModalUpdate(true);
    setdataProject(row.original);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-server-api.onrender.com/api/projects');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Project>[]>(
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
        accessorKey: 'start_date',
        header: 'Start Date',
        size: 100,
        Cell: ({ row }) => new Date(row.original.start_date).toLocaleDateString()
      },
      {
        accessorKey: 'end_date',
        header: 'End Date',
        size: 100,
        Cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString()
      },
      {
        accessorKey: 'technical',
        header: 'Technical',
        size: 200,
        Cell: ({ row }) => (
          <ul>
            {row.original.technical.map((tech: string, index: number) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        )
      }
    ],
    []
  );

<<<<<<< HEAD
  // Call Api get Emp
  const getProject = useQuery({
    queryKey: ['project', idProject],
    queryFn: () => projectApi.getProject(idProject),
    enabled: Boolean(idProject),
    retry: 0
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: any) => {
      return projectApi.delete(id);
=======
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://hrm-server-api.onrender.com/api/employees/${id}`);
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
>>>>>>> 5a89ae4929d95aa4006c652ffcd40d6d16f451f7
    }
  };

  const openDeleteConfirmModal = (row: MRT_Row<Project>) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
    renderTopToolbarCustomActions: ({}) => (
      <Button variant='contained' onClick={handleOpenModalAddUpdate}>
        Create New Project
      </Button>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title='Edit'>
<<<<<<< HEAD
          <IconButton
            onClick={() => {
              updatedModalOpen(row);
              setIdProject(row.original.id as string | number);
            }}
          >
=======
          <IconButton onClick={() => table.setEditingRow(row)}>
>>>>>>> 5a89ae4929d95aa4006c652ffcd40d6d16f451f7
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => openDeleteConfirmModal(row)}>
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
        <CreateProjectModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />
      )}
<<<<<<< HEAD

      {visibleModalUpdate && getProject?.data?.data?.data && (
        <EditProjectModal visible={visibleModalUpdate} onClose={handleCloseModalUpdate} initialValue={dataProject} />
      )}
=======
>>>>>>> 5a89ae4929d95aa4006c652ffcd40d6d16f451f7
    </>
  );
};

export default ProjectsList;
