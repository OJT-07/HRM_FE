import { toast } from 'react-toastify';
import { projectApi } from '../../../apis/project.api';
import { useMutation } from '@tanstack/react-query';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import Swal from 'sweetalert2';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailIcon from '@mui/icons-material/Details';
import withReactContent from 'sweetalert2-react-content';
import CreateProjectModal from './Create';
import UpdateProjectModal from './Update';
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
  }, [visibleModalAddUpdate, visibleModalUpdate]);

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
        accessorKey: 'name',
        header: 'Name',
        size: 100,
        enableGlobalFilter: true,
        enableSorting: false,


      },
      {
        accessorKey: 'start_date',
        header: 'Start Date',
        size: 100,
        Cell: ({ row }) => new Date(row.original.start_date).toLocaleDateString(),
        enableGlobalFilter: false,
        enableSorting: false,


      },
      {
        accessorKey: 'end_date',
        header: 'End Date',
        size: 100,
        Cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString(),
        enableGlobalFilter: false,
        enableSorting: false,


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
        ),
        enableSorting: false,
        enableGlobalFilter: false,

      }
    ],
    []
  );

  const deleteProjectMutation = useMutation({
    mutationFn: (id: any) => {
      return projectApi.delete(id);
    }
  });

  const onDelete = (row: MRT_Row<Project>) => {
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
        deleteProjectMutation.mutate(row.original.id, {
          onSuccess: (res) => {
            toast.success(res.data.message || 'Delete Project successfully');
            fetchData();
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || 'Delete Project failed');
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
    positionActionsColumn: 'last',
    enableColumnFilters: false,
    enableRowNumbers: true,
    initialState: {
      sorting: [
        {
          id: 'id',
          desc: true
        }
      ]
    },
    renderTopToolbarCustomActions: ({ }) => (
      <Button variant='contained' onClick={handleOpenModalAddUpdate}>
        Create New Project
      </Button>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title='Edit'>
          <IconButton onClick={() => updatedModalOpen(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Details'>
          <IconButton onClick={() => handleDetailsClick(row.original.id)}>
            <DetailIcon />
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

      {visibleModalUpdate && (
        <UpdateProjectModal visible={visibleModalUpdate} onClose={handleCloseModalUpdate} initialValue={dataProject} />
      )}
    </>
  );
};

export default ProjectsList;
