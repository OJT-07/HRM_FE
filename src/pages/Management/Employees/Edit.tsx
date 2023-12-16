import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Input,
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
import { FormEmployeeType, formEmployeeSchema } from '../../../utils/rules';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { projectStatusOption } from '../../../enum';
import Swal from 'sweetalert2';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import withReactContent from 'sweetalert2-react-content';
import DeleteIcon from '@mui/icons-material/Delete';
import { cloneDeep } from 'lodash';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import LineManagerModal from './LineManagerModal';
import SkillModal from './SkillModal';
import { employeeApi } from '../../../apis/employee.api';
// import {
//   userApi
// } from '../../../apis/user.api'


const MySwal = withReactContent(Swal);


interface Props {
  visible: boolean;
  onClose: () => void;
  initialValue?: any;
  dataEmployee?: any;
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

function EditEmployeeModel({ visible, onClose, initialValue, dataEmployee }: Props) {
  const [visibleLineManager, setVisibleLineManager] = useState(false);
  const [visibleSkill, setVisibleSkill] = useState(false);
  const [skillList, setSkillList] = useState<any>([]);
  const [initSkill, setInitSkill] = useState<any>({});
  const [lineManagerList, setLineManagerList] = useState<any>([]);
  const [viewOnlyLineManager, setViewOnlyLineManager] = useState(false);
  const [employeeData, setEmployeeData] = useState(dataEmployee);

  useEffect(() => {
    setEmployeeData(dataEmployee);
    setSkillList(employeeData.skills)
    console.log("EMPLOYEE DATA ", employeeData);
  }, [dataEmployee]);


  const handleOpenSkill = () => {
    setVisibleSkill(true);
  };

  const handleCloseSkill = () => {
    setVisibleSkill(false);
    setInitSkill({});
  };

  const handleOpenLineManager = (view?: boolean) => {
    setVisibleLineManager(true);
    setViewOnlyLineManager(Boolean(view));
  };

  const handleCloseLineManager = () => {
    setVisibleLineManager(false);
  };

  const methods = useForm<FormEmployeeType>({
    resolver: yupResolver(formEmployeeSchema),
    defaultValues: {
      name: employeeData.name, address: employeeData.address, phone: dataEmployee.phone, email: dataEmployee.email, skills: employeeData.skills
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    getValues,
    setValue,
  } = methods;

  const onSubmit = async (data: any) => {
    const body = {
      ...employeeData,
      name: data.fullName,
      address: data.address,
      contactNumber: data.contactNumber,
      email: data.email,
      join_date: data.joinDate,
      date_of_birth: data.dateOfBirth,
      isManager: data.isManager,
      skills: skillList,
      description: data.description,

    }
    try {
      await employeeApi.update(employeeData.id, body);

      MySwal.fire({
        title: 'User Updated!',
        text: 'User data has been updated successfully.',
        icon: 'success',
      });

      onClose();
    } catch (error) {
      console.error('Error updating user:', error);


      MySwal.fire({
        title: 'Error!',
        text: 'Failed to update user data. Please try again later.',
        icon: 'error',
      });
    }
  }


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
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        onClose();
      }
    });
  };

  const handleAddSkill = async (newSkill: any) => {
    const newSkillList = cloneDeep(skillList);
    newSkillList.push(newSkill);
    setSkillList(newSkillList);
    setValue('skills', newSkillList);
    await trigger(['skills']);
  };

  const handleRemoveSkill = async (index: number) => {
    const newSkillList = cloneDeep(skillList).toSpliced(index, 1);
    setSkillList(newSkillList);
    setValue('skills', newSkillList);
    await trigger(['skills']);
  };

  const handleOpenEditSkill = (skill: any) => {
    handleOpenSkill();
    setInitSkill(skill);
  };

  const handleApplyLineManagerList = async (newLineManagerList: any) => {
    setLineManagerList(newLineManagerList);
    handleCloseLineManager();
    setValue('isManager', newLineManagerList);
    await trigger(['isManager']);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
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
          Edit Employee
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={() => {
            // const value = getValues()
            // onSubmit(value)
          }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-fullname'>
                  Fullname <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Controller
                  control={control}
                  name='name'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter full name'
                      size='small'
                      translate='no'
                      id='employee-fullname'
                      defaultValue={employeeData.name}
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
                <InputLabel style={{ marginBottom: 3 }} id='employee-address'>
                  Address <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Controller
                  control={control}
                  name='address'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter address'
                      size='small'
                      translate='no'
                      id='employee-address'
                      defaultValue={employeeData.address}
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.address?.message}
                </div>
              </Grid>

              <Grid item xs={6}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-contact'>
                  Contact number <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter contact number'
                      size='small'
                      translate='no'
                      id='employee-contact'
                      defaultValue={employeeData.phone}
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.phone?.message}
                </div>
              </Grid>

              <Grid item xs={6}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-name'>
                  Email <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter email'
                      size='small'
                      translate='no'
                      id='employee-name'
                      defaultValue={employeeData.email}
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.email?.message}
                </div>
              </Grid>

              <Grid item xs={3}>
                <InputLabel style={{ marginBottom: 3 }} id='project-startdate-label'>
                  Start Date <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='join_date'
                  render={({ field }) => (
                    <div>
                      <div className="relative">
                        <Input
                          type="date"
                          defaultValue={formatDate(employeeData?.join_date)}
                          className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full"
                          {...field}
                        />
                      </div>
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                <InputLabel style={{ marginBottom: 3 }} id='project-startdate-label'>
                  Date of birth <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => (
                    <div>
                      <div className="relative">
                        <Input
                          type="date"
                          defaultValue={formatDate(employeeData?.date_of_birth)}
                          className="border border-gray-300 rounded px-4 py-2 bg-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full"
                          {...field}
                        />
                      </div>
                    </div>
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel id='employee-is-manager-label'>Is Manager</InputLabel>

                <Controller
                  control={control}
                  name='isManager'
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      defaultValue={employeeData?.isManager || false} // Set the default value based on the received data
                      style={{ display: 'flex', gap: '1rem', flexDirection: 'row' }}
                    >
                      <FormControlLabel value={true} control={<Radio />} label='True' />
                      <FormControlLabel value={false} control={<Radio />} label='False' />
                    </RadioGroup>
                  )}
                />
              </Grid>


              <Grid item xs={12}>
                <fieldset>
                  <legend>
                    Skill <span style={{ color: 'red' }}>*</span>
                  </legend>
                  <Button
                    size='medium'
                    type='button'
                    style={{ margin: '0.5rem 0' }}
                    variant='contained'
                    startIcon={<AddCircleIcon />}
                    onClick={handleOpenSkill}
                  >
                    Add skill
                  </Button>

                  {skillList.length ? (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell>Skill</TableCell>
                            <TableCell align='center'>Experience (year)</TableCell>
                            <TableCell align='center'>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {skillList.map((skill: any, index: number) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component='th' scope='row'>
                                {index + 1}
                              </TableCell>
                              <TableCell component='th' scope='row'>
                                {skill.name}
                              </TableCell>
                              <TableCell align='center'>{skill.exp}</TableCell>
                              <TableCell align='center'>
                                <Box>
                                  <IconButton color='error' size='medium' onClick={() => handleRemoveSkill(index)}>
                                    <DeleteIcon />
                                  </IconButton>
                                  {/* <IconButton
                                    color='primary'
                                    size='medium'
                                    onClick={() => handleOpenEditSkill(skill)}
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
                    {errors.skills?.message}
                  </div>
                </fieldset>
              </Grid>

              <Grid item xs={12}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-description-label'>
                  Description
                </InputLabel>
                <TextareaAutosize
                  name='description'
                  placeholder='Description something about the employee...'
                  defaultValue={employeeData.description}
                  minRows={2}
                  style={{
                    width: '100%',
                    border: '1px solid rgb(100, 116, 139)',
                    borderRadius: '5px',
                    padding: '8px 14px'
                  }}
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
                // type='submit'
                style={{ marginRight: 0 }}
                variant='contained'
                startIcon={<SaveIcon />}
                color='primary'
                onClick={() => {
                  const value = getValues()
                  onSubmit({ ...employeeData, ...value })
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
        {/* {visibleSkill && (
          // <SkillModal
            visible={visibleSkill}
            onClose={handleCloseSkill}
            onFinish={handleAddSkill}
            initialValues={initSkill}
          />
        )} */}

        {/* {visibleLineManager && (
            <LineManagerModal
              visible={visibleLineManager}
              onClose={handleCloseLineManager}
              onFinish={handleApplyLineManagerList}
              defaultLineManagerList={lineManagerList}
              viewOnly={viewOnlyLineManager}
            />
          )} */}
      </Box>
    </Modal>
  );
}

export default EditEmployeeModel;



