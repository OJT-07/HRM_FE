import {
  Box,
  Grid,
  Modal,
  Radio,
  Paper,
  Table,
  Button,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  TableHead,
  InputLabel,
  RadioGroup,
  Typography,
  TableContainer,
  FormControlLabel
} from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { employeeApi } from '../../../apis/employee.api';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormEmployeeType, formEmployeeSchema } from '../../../utils/rules';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SkillModal from './SkillModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import withReactContent from 'sweetalert2-react-content';

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

function CreateEmployeeModal({ visible, onClose }: Props) {
  const [visibleSkill, setVisibleSkill] = useState(false);
  const [skillList, setSkillList] = useState<any>([]);
  const [initSkill, setInitSkill] = useState<any>({});

  // Hook của react-query dùng để gọi api những method post, put, delete
  const createEmpMutation = useMutation({
    mutationFn: (body: any) => {
      return employeeApi.add(body);
    }
  });

  const handleOpenSkill = () => {
    setVisibleSkill(true);
  };

  const handleCloseSkill = () => {
    setVisibleSkill(false);
    setInitSkill({});
  };

  // useForm là hook của react-hook-form
  // userForm sẽ tạo ra 1 đối tượng có nhiều methods dùng để controll form value
  const methods = useForm<FormEmployeeType>({
    resolver: yupResolver(formEmployeeSchema),
    defaultValues: {
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
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        const submitData = {
          ...data,
          join_date: data.join_date.toISOString(),
          date_of_birth: data.date_of_birth.toISOString()
        };
        createEmpMutation.mutate(submitData, {
          onSuccess: (res) => {
            const data = res.data;
            toast.success(data.message || 'Create employee successfully');
            onClose();
          },
          onError: (err: any) => {
            console.log(err);
            toast.error(err?.response?.data?.message || 'Create employee failed');
          }
        });
      }
    });
  });

  const handleAddSkill = async (newSkill: any) => {
    const newSkillList = cloneDeep(skillList);
    newSkillList.push(newSkill);
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

  const handleRemoveSkill = async (index: number) => {
    const newSkillList = cloneDeep(skillList).toSpliced(index, 1);
    setSkillList(newSkillList);
    setValue('skills', newSkillList);
    await trigger(['skills']);
  };

  const handleOpenEditSkill = (skill: any, index: number) => {
    handleOpenSkill();
    setInitSkill({ ...skill, indexSkill: index });
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
          Create New Employee
        </Typography>
        {/* End Header */}

        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {/* Start Full Name */}
              <Grid item xs={6}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-name'>
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
                      id='employee-name'
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
              {/* End Full Name */}

              {/* Start Address */}
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
              {/* End Address */}

              {/* Start Contact number */}
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
              {/* End Contact number */}

              {/* Start Email */}
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
              {/* End Email */}

              {/* Start Join Date */}
              <Grid item xs={3}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-join_date-label'>
                  Join date <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='join_date'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} disableFuture={true} />}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.join_date?.message}
                </div>
              </Grid>
              {/* End Join Date */}

              {/* Start Date of birth */}
              <Grid item xs={3}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-date_of_birth-label'>
                  Date of birth <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} disableFuture={true} />}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.date_of_birth?.message}
                </div>
              </Grid>
              {/* End Date of birth */}

              {/* Start Is Manager */}
              <Grid item xs={6}>
                <InputLabel id='emplyee-is-manager-label'>Is Manager</InputLabel>

                <Controller
                  control={control}
                  name='isManager'
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      defaultValue={false}
                      style={{ display: 'flex', gap: '1rem', flexDirection: 'row' }}
                    >
                      <FormControlLabel value={true} control={<Radio />} label='True' />
                      <FormControlLabel value={false} control={<Radio />} label='False' />
                    </RadioGroup>
                  )}
                />
              </Grid>
              {/* End Is Manager */}

              {/* Start Skill */}
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
                                  <IconButton
                                    color='primary'
                                    size='medium'
                                    onClick={() => handleOpenEditSkill(skill, index)}
                                  >
                                    <ModeEditIcon />
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
              {/* End Skill */}

              {/* Start Description */}
              <Grid item xs={12}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-description-label'>
                  Description
                </InputLabel>
                <TextareaAutosize
                  name='description'
                  placeholder='Description something about the employee...'
                  minRows={2}
                  style={{
                    width: '100%',
                    border: '1px solid rgb(100, 116, 139)',
                    borderRadius: '5px',
                    padding: '8px 14px'
                  }}
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
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
            {/* End Button */}
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

export default CreateEmployeeModal;
