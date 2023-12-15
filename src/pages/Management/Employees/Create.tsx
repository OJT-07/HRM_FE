import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormEmployeeType, formEmployeeSchema } from '../../../utils/rules';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SkillModal from './SkillModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import withReactContent from 'sweetalert2-react-content';
import LineManagerModal from './LineManagerModal';


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
  const [visibleLineManager, setVisibleLineManager] = useState(false);
  const [visibleSkill, setVisibleSkill] = useState(false);
  const [skillList, setSkillList] = useState<any>([]);
  const [initSkill, setInitSkill] = useState<any>({});
  const [lineManagerList, setLineManagerList] = useState<any>([]);
  const [viewOnlyLineManager, setViewOnlyLineManager] = useState(false);

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
    defaultValues: {}
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

  const handleAddSkill = async (newSkill: any) => {
    const newSkillList = cloneDeep(skillList);
    newSkillList.push(newSkill);
    setSkillList(newSkillList);
    setValue('skill', newSkillList);
    await trigger(['skill']);
  };

  const handleRemoveSkill = async (index: number) => {
    const newSkillList = cloneDeep(skillList).toSpliced(index, 1);
    setSkillList(newSkillList);
    setValue('skill', newSkillList);
    await trigger(['skill']);
  };

  const handleOpenEditSkill = (skill: any) => {
    handleOpenSkill();
    setInitSkill(skill);
  };

  const handleApplyLineManagerList = async (newLineManagerList: any) => {
    setLineManagerList(newLineManagerList);
    handleCloseLineManager();
    setValue('lineManager', newLineManagerList);
    await trigger(['lineManager']);
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
                <InputLabel style={{ marginBottom: 3 }} id='employee-fullname'>
                  Fullname <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Controller
                  control={control}
                  name='fullName'
                  render={({ field }) => (
                    <TextField
                      placeholder='Enter full name'
                      size='small'
                      translate='no'
                      id='employee-fullname'
                      variant='outlined'
                      fullWidth
                      {...field}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.fullName?.message}
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
                  name='contactNumber'
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
                  {errors.contactNumber?.message}
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
                <InputLabel style={{ marginBottom: 3 }} id='employee-joindate-label'>
                  Join date <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='joinDate'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} />}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.joinDate?.message}
                </div>
              </Grid>
              {/* End Join Date */}

              {/* Start Date of birth */}
              <Grid item xs={3}>
                <InputLabel style={{ marginBottom: 3 }} id='employee-dateofbirth-label'>
                  Date of birth <span style={{ color: 'red' }}>*</span>
                </InputLabel>

                <Controller
                  control={control}
                  name='dateOfBirth'
                  render={({ field }) => <DatePicker format='DD/MM/YYYY' {...field} />}
                />

                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.dateOfBirth?.message}
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
                                {skill.skill}
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
                    {errors.skill?.message}
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
            {/* End Button */}
          </form>
        </FormProvider>

        {visibleSkill && (
          <SkillModal
            visible={visibleSkill}
            onClose={handleCloseSkill}
            onFinish={handleAddSkill}
            initialValues={initSkill}
          />
        )}

        {visibleLineManager && (
          <LineManagerModal
            visible={visibleLineManager}
            onClose={handleCloseLineManager}
            onFinish={handleApplyLineManagerList}
            defaultLineManagerList={lineManagerList}
            viewOnly={viewOnlyLineManager}
          />
        )}
      </Box>
    </Modal>
  );
}

export default CreateEmployeeModal;
