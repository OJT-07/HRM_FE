import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Grid,
  Modal,
  Paper,
  Table,
  Radio,
  Button,
  TableRow,
  TextField,
  TableHead,
  TableBody,
  TableCell,
  InputLabel,
  Typography,
  RadioGroup,
  TableContainer,
  FormControlLabel
} from '@mui/material';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import SkillModal from './SkillModal';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { employeeApi } from '../../../apis/employee.api';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormEmployeeType, formEmployeeSchema } from '../../../utils/rules';

const MySwal = withReactContent(Swal);
interface Props {
  visible: boolean;
  initialValue?: any;
  dataEmployee?: any;
  onEditSuccess: () => void;
  onClose: () => void;
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

function EditEmployeeModel({ visible, onClose, dataEmployee, onEditSuccess }: Props) {
  const [visibleSkill, setVisibleSkill] = useState(false);
  const [skillList, setSkillList] = useState<any>([]);
  const [initSkill, setInitSkill] = useState<any>({});
  const [employeeData, setEmployeeData] = useState(dataEmployee);

  useEffect(() => {
    setEmployeeData(dataEmployee);
    setSkillList(employeeData.skills);
  }, [dataEmployee]);

  const handleOpenSkill = () => {
    setVisibleSkill(true);
  };

  const handleCloseSkill = () => {
    setVisibleSkill(false);
    setInitSkill({});
  };

  const methods = useForm<FormEmployeeType>({
    resolver: yupResolver(formEmployeeSchema),
    defaultValues: {
      name: employeeData.name,
      address: employeeData.address,
      phone: dataEmployee.phone,
      email: dataEmployee.email,
      skills: employeeData.skills,
      join_date: dayjs(employeeData.join_date),
      date_of_birth: dayjs(employeeData.date_of_birth),


      isManager: false
    }
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    trigger,
    setValue
  } = methods;

  const onSubmit = handleSubmit((data?: any) => {
    try {
      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, close it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await employeeApi.update(employeeData.id, data);
          await employeeApi.getAll({});
          onEditSuccess();
          toast.success('Edit Employee successfully');
          onClose();
        }
      });
    } catch (error) {
      console.error('Error updating user:', error);

      MySwal.fire({
        title: 'Error!',
        text: 'Failed to update user data. Please try again later.',
        icon: 'error'
      });
    }
  });

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

  const handleEditSkill = async (newSkill: any, index: number) => {
    const newSkillList = cloneDeep(skillList).toSpliced(index, 1, newSkill);
    setSkillList(newSkillList);
    setValue('skills', newSkillList);
    await trigger(['skills']);
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
          <form onSubmit={onSubmit}>
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
                  Join Date <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='join_date'
                  render={({ field }) => (
                    <div>
                      <div className='relative'>
                        <DatePicker
                          format='DD/MM/YYYY'
                          disableFuture={true}
                          defaultValue={dayjs(employeeData?.join_date)}
                          {...field}
                        />
                      </div>
                    </div>
                  )}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.join_date?.message}
                </div>
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
                      <div className='relative'>
                        <DatePicker
                          format='DD/MM/YYYY'
                          disableFuture={true}
                          defaultValue={dayjs(employeeData?.date_of_birth)}
                          {...field}
                        />
                      </div>
                    </div>
                  )}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.date_of_birth?.message}
                </div>
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
        {visibleSkill && (
          <SkillModal
            visible={visibleSkill}
            onClose={handleCloseSkill}
            onAdd={handleAddSkill}
            onUpdate={handleEditSkill}
            initialValues={initSkill}
            selectedSkillList={skillList}
          />
        )}
      </Box>
    </Modal>
  );
}

export default EditEmployeeModel;
