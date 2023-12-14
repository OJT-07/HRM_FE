import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormProjectType, formProjectSchema } from '../../../utils/rules';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import MemberModal from './MemberModal';
import SaveIcon from '@mui/icons-material/Save';
import { projectStatusOption, projectTechnicalOption } from '../../../enum';
import Swal from 'sweetalert2';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import withReactContent from 'sweetalert2-react-content';
import DeleteIcon from '@mui/icons-material/Delete';
import { cloneDeep } from 'lodash';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TechnicalModal from './TechnicalModal';
import ReactSelect from 'react-select';

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

const classNameError = 'mt-1 min-h-[1.25rem] text-red-500';

function CreateProjectModal({ visible, onClose, initialValue }: Props) {
  const [visibleTechnical, setVisibleTechnical] = useState(false);
  const [visibleMember, setVisibleMember] = useState(false);
  const [memberList, setMemberList] = useState<any>([]);
  const [initMember, setInitMember] = useState<any>({});
  const [technicalList, setTechnicalList] = useState<any>([]);
  const [viewOnlyTech, setViewOnlyTech] = useState(false);

  const handleOpenMember = () => {
    setVisibleMember(true);
  };

  const handleCloseMember = () => {
    setVisibleMember(false);
    setInitMember({});
  };

  const handleOpenTechnical = (view?: boolean) => {
    setVisibleTechnical(true);
    setViewOnlyTech(Boolean(view));
  };

  const handleCloseTechnical = () => {
    setVisibleTechnical(false);
  };

  const methods = useForm<FormProjectType>({
    resolver: yupResolver(formProjectSchema),
    defaultValues: {
      status: { label: 'Pending', value: 'Pending' }
    }
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    getValues,
    setValue
  } = methods;

  const onSubmit = handleSubmit((data?: any) => {
    console.log(data);
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
        onClose();
      }
    });
  });

  const handleClose = (event?: any, reason?: string) => {
    // if (reason === 'escapeKeyDown' || reason === 'backdropClick') return;

    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
      }
    });
  };

  const handleAddMember = async (newMember: any) => {
    const newMemberList = cloneDeep(memberList);
    newMemberList.push(newMember);
    setMemberList(newMemberList);
    setValue('member', newMemberList);
    await trigger(['member']);
  };

  const handleRemoveMember = async (index: number) => {
    const newMemberList = cloneDeep(memberList).toSpliced(index, 1);
    setMemberList(newMemberList);
    setValue('member', newMemberList);
    await trigger(['member']);
  };

  const handleOpenEditMember = (member: any) => {
    console.log(member);
    handleOpenMember();
    setInitMember(member);
  };

  const handleApplyTechnicalList = async (newTechList: any) => {
    setTechnicalList(newTechList);
    handleCloseTechnical();
    setValue('technical', newTechList);
    await trigger(['technical']);
  };

  return (
    <Modal
      open={visible}
      onClose={onClose}
      disableScrollLock
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ ...style }}>
        <Typography
          id='modal-modal-title'
          variant='h4'
          component='h2'
          sx={{ textAlign: 'center', fontWeight: '700', margin: '1.5rem 0' }}
        >
          Create New Project
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
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
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.name?.message}
                </div>
              </Grid>

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
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.status?.message}
                </div>
              </Grid>

              <Grid item xs={3}>
                <InputLabel style={{ marginBottom: 3 }} id='project-startdate-label'>
                  Start Date <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='startDate'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} />}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.startDate?.message}
                </div>
              </Grid>

              <Grid item xs={3}>
                <InputLabel style={{ marginBottom: 3 }} id='project-enddata-label'>
                  End Date <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Controller
                  control={control}
                  name='endDate'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} />}
                />
              </Grid>

              {/* <Grid item xs={6}>
                <InputLabel style={{ marginBottom: 3 }} id='project-technical-label'>
                  Technical
                </InputLabel>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                  <div>
                    <IconButton
                      sx={{ width: 'fit-content', background: 'none' }}
                      size='medium'
                      color='primary'
                      onClick={() => handleOpenTechnical()}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </div>
                  <div>
                    {technicalList.length ? (
                      <AvatarGroup
                        sx={{ width: '100%' }}
                        total={technicalList.length}
                        onClick={() => handleOpenTechnical(true)}
                      >
                        {technicalList.map((tech: any) => (
                          <Avatar alt={tech.label} src='/static/images/avatar/1.jpg' sizes='small' />
                        ))}
                      </AvatarGroup>
                    ) : null}
                  </div>
                </Box>
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.technical?.message}
                </div>
              </Grid> */}

              <Grid item xs={6}>
                <InputLabel style={{ marginBottom: 3 }} id='project-technical-label'>
                  Technical <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Controller
                  control={control}
                  name='technical'
                  render={({ field }) => <ReactSelect {...field} options={projectTechnicalOption} isMulti />}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.technical?.message}
                </div>
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <legend>
                    Members <span style={{ color: 'red' }}>*</span>
                  </legend>
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
                                {member.member}
                              </TableCell>
                              <TableCell align='center'>{member.position}</TableCell>
                              <TableCell align='center'>
                                <Box>
                                  <IconButton color='error' size='medium' onClick={() => handleRemoveMember(index)}>
                                    <DeleteIcon />
                                  </IconButton>
                                  {/* <IconButton
                                    color='primary'
                                    size='medium'
                                    onClick={() => handleOpenEditMember(member)}
                                  >
                                    <ModeEditIcon />
                                  </IconButton> */}
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : null}

                  <div className={classNameError} style={{ color: 'red' }}>
                    {errors.member?.message}
                  </div>
                </fieldset>
              </Grid>

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
            </Grid>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button
                type='submit'
                style={{ marginRight: '1rem' }}
                variant='contained'
                color='error'
                onClick={handleClose}
                size='medium'
              >
                Cancel
              </Button>

              <Button
                size='medium'
                type='submit'
                style={{ marginRight: 0 }}
                variant='contained'
                startIcon={<SaveIcon />}
                color='primary'
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
        {visibleMember && (
          <MemberModal
            visible={visibleMember}
            onClose={handleCloseMember}
            onFinish={handleAddMember}
            initialValues={initMember}
          />
        )}

        {visibleTechnical && (
          <TechnicalModal
            visible={visibleTechnical}
            onClose={handleCloseTechnical}
            onFinish={handleApplyTechnicalList}
            defaultTechnicalList={technicalList}
            viewOnly={viewOnlyTech}
          />
        )}
      </Box>
    </Modal>
  );
}

export default CreateProjectModal;
