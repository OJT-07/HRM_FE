import {
  Box,
  Button,
  Grid,
  InputLabel,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { formatStatus } from '../../../utils/formatValue';
import { employeeApi } from '../../../apis/employee.api';
import { projectApi } from '../../../apis/project.api';
import { projectStatusOption, projectTechnicalOption } from '../../../enum';
import { FormProjectType, formProjectSchema } from '../../../utils/rules';
import MemberModal from './MemberModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MySwal = withReactContent(Swal);
interface Props {
  visible: boolean;
  onClose: () => void;
  initialValue?: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  maxHeight: '90vh'
};

function CreateProjectModal({ visible, onClose, initialValue }: Props) {
  const [visibleMember, setVisibleMember] = useState(false);
  const [memberList, setMemberList] = useState<any>([]);
  const [initMember, setInitMember] = useState<any>({});
  //Hook cura react-query dufng cho method get
  const { data: dataEmployee } = useQuery({
    queryKey: ['employee'],
    queryFn: () => employeeApi.getAll({})
  });

  const listEmployee =
    dataEmployee?.data?.data.map((emp: any) => ({
      ...emp,
      label: emp?.name,
      value: emp?.id
    })) || [];

  const handleOpenMember = () => {
    setVisibleMember(true);
  };

  const handleCloseMember = () => {
    setVisibleMember(false);
    setInitMember({});
  };
  const {
    formState: { errors },
    handleSubmit,
    control,
    trigger,
    setValue,
    getValues
  } = useForm<FormProjectType>({
    mode: 'onBlur',
    resolver: yupResolver(formProjectSchema),
    defaultValues: {
      name: initialValue.name,
      status: { value: initialValue.status, label: formatStatus(initialValue.status).toString() },
      end_date: dayjs(initialValue.end_date),
      start_date: dayjs(initialValue.start_date),
      technical: initialValue.technical.map((item: any) => ({ value: item, label: item })),
      members: initialValue.memberList.map((member: any) => ({
        employeeId: member.member.id,
        position: member.position.map((item: any) => ({ value: item, label: item }))
      }))
    }
  });

  const onSubmit = handleSubmit(async (data?: any) => {
    console.log(data);
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(data);
        const submitData = {
          ...data,
          start_date: data?.start_date?.toISOString(),
          end_date: data?.end_date?.toISOString() || null,
          technical: data.technical.map((tech: any) => tech.value),
          members: memberList.map((member: any) => ({
            employeeId: member.member.id,
            position: member.position
          })),
          status: data.status.value
        };
        try {
          const projectId = initialValue?.id;
          await projectApi.update(projectId, submitData);
          await projectApi.getAll({});
          toast.success('Edit project successfully');
          onClose();
        } catch (error) {
          console.error('Error updating project:', error);
          MySwal.fire('Error', 'An error occurred while updating the project', 'error');
        }
      }
    });
  });

  const handleAddMember = async (newMember: any) => {
    const newMemberList = cloneDeep(memberList);
    newMemberList.push(newMember);
    setMemberList(newMemberList);
    setValue('employeesInProject', newMemberList);
    await trigger(['employeesInProject']);
  };

  const handleRemoveMember = async (index: number) => {
    const newMemberList = cloneDeep(memberList).toSpliced(index, 1);
    setMemberList(newMemberList);
    setValue('employeesInProject', newMemberList);
    await trigger(['employeesInProject']);
  };

  return (
    <Modal
      open={visible}
      onClose={onClose}
      disableScrollLock
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ ...style }}>
        {/* Start Header */}
        <Typography
          id='modal-modal-title'
          variant='h4'
          component='h2'
          sx={{ textAlign: 'center', fontWeight: '700', margin: '1.5rem 0' }}
        >
          Update Project
        </Typography>
        {/* End Header */}

        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {/* Start Name */}
            <Grid item xs={6}>
              <InputLabel style={{ marginBottom: 3 }} id='project-name'>
                Name <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Controller
                control={control}
                name='name'
                render={({ field }) => (
                  <TextField
                    placeholder='Enter project name'
                    size='small'
                    translate='no'
                    id='project-name'
                    variant='outlined'
                    fullWidth
                    {...field}
                  />
                )}
              />
              <div style={{ color: 'red' }}>{errors.name?.message}</div>
            </Grid>
            {/* End Name */}

            {/* Start Status */}
            <Grid item xs={6}>
              <InputLabel style={{ marginBottom: 3 }} id='project-status-label'>
                Status
              </InputLabel>
              <Controller
                control={control}
                name='status'
                render={({ field }) => (
                  <ReactSelect
                    id='project-status'
                    {...field}
                    options={projectStatusOption}
                    isDisabled={!initialValue?.name}
                  />
                )}
              />
              <div style={{ color: 'red' }}>{errors.status?.message}</div>
            </Grid>
            {/* End Status */}

            {/* Start Start Date */}
            <Grid item xs={3}>
              <InputLabel style={{ marginBottom: 3 }} id='project-startdate-label'>
                Start Date <span style={{ color: 'red' }}>*</span>
              </InputLabel>

              <Controller
                control={control}
                name='start_date'
                render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} disablePast={true} />}
              />

              <div style={{ color: 'red' }}>{errors.start_date?.message}</div>
            </Grid>
            {/* End Start Date */}

            {/* Start End Date */}
            <Grid item xs={3}>
              <InputLabel style={{ marginBottom: 3 }} id='project-enddata-label'>
                End Date
              </InputLabel>

              <Controller
                control={control}
                name='end_date'
                render={({ field }) => <DatePicker {...field} disablePast={true} />}
              />

              <div style={{ color: 'red' }}>{errors.end_date?.message}</div>
            </Grid>
            {/* End End Date */}

            {/* Start Technical */}
            <Grid item xs={6}>
              <InputLabel style={{ marginBottom: 3 }} id='project-technical-label'>
                Technical <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Controller
                control={control}
                name='technical'
                render={({ field }) => <ReactSelect {...field} options={projectTechnicalOption} isMulti />}
              />
              <div style={{ color: 'red' }}>{errors.technical?.message}</div>
            </Grid>
            {/* End Technical */}

            {/* Start Assign Member */}
            <Grid item xs={12}>
              <fieldset>
                <legend>Members</legend>
                <Button
                  size='medium'
                  type='button'
                  style={{ margin: '0.5rem 0' }}
                  variant='contained'
                  startIcon={<AddCircleIcon />}
                  onClick={handleOpenMember}
                >
                  Assign member
                </Button>

                {memberList.length ? (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell>No.</TableCell>
                          <TableCell>Member</TableCell>
                          <TableCell align='center'>Position</TableCell>
                          <TableCell align='center'>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {memberList.map((member: any, index: number) => (
                          <TableRow key={member.member} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                              {index + 1}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                              {member.member.name}
                            </TableCell>
                            <TableCell align='center'>{member.position}</TableCell>
                            <TableCell align='center'>
                              <Box>
                                <IconButton color='error' size='medium' onClick={() => handleRemoveMember(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}

                <div style={{ color: 'red' }}>{errors.employeesInProject?.message}</div>
              </fieldset>
            </Grid>
            {/* End Assign Member */}

            {/* Start Description */}
            <Grid item xs={12}>
              <InputLabel style={{ marginBottom: 3 }} id='project-status-label'>
                Description
              </InputLabel>
              <Controller
                control={control}
                name='description'
                render={({ field }) => (
                  <TextareaAutosize
                    {...field}
                    placeholder='Description something about this project...'
                    minRows={2}
                    style={{
                      width: '100%',
                      border: '1px solid rgb(100, 116, 139)',
                      borderRadius: '5px',
                      padding: '8px 14px'
                    }}
                  />
                )}
              />
            </Grid>
            {/* End Description */}
          </Grid>

          {/* Start Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button
              size='medium'
              type='submit'
              style={{ marginRight: 0 }}
              variant='contained'
              startIcon={<SaveIcon />}
              color='primary'
              onClick={() => onSubmit({ ...initialValue, ...getValues() })}
            >
              Submit
            </Button>
          </div>
          {/* End Button */}
        </form>

        {visibleMember && (
          <MemberModal
            visible={visibleMember}
            onClose={handleCloseMember}
            onAdd={handleAddMember}
            initialValues={initMember}
            listEmployee={listEmployee}
            selectedMemberList={memberList}
          />
        )}
      </Box>
    </Modal>
  );
}

export default CreateProjectModal;
