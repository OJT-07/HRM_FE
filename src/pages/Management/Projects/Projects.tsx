import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import Button from '@mui/material/Button';
import CreateProjectModal from './Create'
import UpdateProjectModal from './Update'
import axios from 'axios';
import TabKey from './Details';
import { useMutation } from '@tanstack/react-query';
import { projectApi } from '../../../apis/project.api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from 'react-hot-toast';
import { showToast } from '../../../components/ToastCustom';

const MySwal = withReactContent(Swal);
interface Project {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  description: string
  technical: string[];
}

const ProjectList = () => {
  const [data, setData] = useState<Project[]>([]);
  const [visibleModalAddUpdate, setVisibleModalAddUpdate] = useState<boolean>(false)
  const [visibleModalUpdate, setVisibleModalUpdate] = useState<boolean>(false)
  const [item, setItem] = useState<object>({})

  // Fetch data from your API when the component mounts
  useEffect(() => {
    fetchData();
  }, [visibleModalAddUpdate]);

  const handleCloseModalAddUpdate = () => {
    setVisibleModalAddUpdate(false)
  }
  const handleOpenModalAddUpdate = () => {
    setVisibleModalAddUpdate(true)
  }
  const handleCloseModalUpdate = () => {
    setVisibleModalUpdate(false)
  }
  const fetchData = async () => {
    try {
      const response = await axios.get('https://hrm-server-api.onrender.com/api/projects');
    setData(response.data.data);
    console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Columns definition
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
        size: 100,
      },
      {
        accessorKey: 'start_date',
        header: 'Start Date',
        size: 100,
        Cell: ({ row }) => new Date(row.original.start_date).toLocaleDateString(),
      },  {
        accessorKey: 'end_date',
        header: 'End Date',
        size: 100,
        Cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString(),
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
          }
    ],
    [],
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
            // showToast('Delete project successfully', 'success');
            toast['success']('Delete project successfully');
            fetchData();
          },
          onError: (err: any) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'Delete project failed');
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
    renderTopToolbarCustomActions: ({  }) => (
        <Button
           variant="contained"
          onClick={handleOpenModalAddUpdate}
        >
          Create New Project
        </Button>
      ),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '.5em' }}>
        <Tooltip title="Edit">
          <IconButton onClick={()=> updatedModalOpen(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Delete'>
          <IconButton color='error' onClick={() => onDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Detail">
          <IconButton onClick={()=> TabKey()}>
            <DetailsIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });
  return (
    <>
      <MaterialReactTable table={table} />
      {visibleModalAddUpdate && <CreateProjectModal visible={visibleModalAddUpdate} onClose={handleCloseModalAddUpdate} />}
      {visibleModalUpdate && <UpdateProjectModal visible={visibleModalUpdate} onClose={handleCloseModalUpdate} initialValue={item}/>}

    </>
  );
};

export default ProjectList;
