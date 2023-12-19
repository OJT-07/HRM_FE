import { projectApi } from '../../../apis/project.api';
import { useMutation } from '@tanstack/react-query';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailIcon from '@mui/icons-material/Details';
import withReactContent from 'sweetalert2-react-content';
import UpdateProjectModal from './Update';;
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
  const [item, setItem] = useState<object>({});

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
    setItem(row.original);
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
        size: 100,
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

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://hrm-server-api.onrender.com/api/employees/${id}`);
      fetchData(); // Fetch updated data after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openDeleteConfirmModal = (row: MRT_Row<Project>) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteUser(row.original.id);
    }
  };
  const navigate = useNavigate();  
  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: 'modal',
    enableEditing: true,
    positionActionsColumn: 'last',
    initialState: {
      sorting: [
        {
          id: 'id', //sort by age by default on page load
          desc: true,
        },

      ],
    },
    renderTopToolbarCustomActions: ({ }) => (
      <Button variant='contained' onClick={handleOpenModalAddUpdate}>
        Create New Project
      </Button>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title='Edit'>
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Details'>
          <IconButton onClick={() => handleDetailsClick(row.original.id)}>
            <DetailIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  // Function to handle the "Details" icon click and navigate to the details page
  const handleDetailsClick = (projectId: number) => {
    // Replace this with your actual details page URL
    navigate(`/management/projects/details/${projectId}`);
  };

  return (
    <>
      <MaterialReactTable table={table} />
      {visibleModalAddUpdate && (
        <CreateProjectModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />
      )}
    </>
  );
};

export default ProjectsList;
