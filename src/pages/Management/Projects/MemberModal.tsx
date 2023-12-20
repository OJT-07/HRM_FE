import { yupResolver } from '@hookform/resolvers/yup';
import SaveIcon from '@mui/icons-material/Save';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { projectMemberOption, projectPositionOption } from '../../../enum';
import { FormMemberType, formMemberSchema } from '../../../utils/rules';
import { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import employee from 'pages/Employees/employee.reducer';
const classNameError = 'mt-1 min-h-[1.25rem] text-red-500';
interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (newMember: any) => void;
  initialValues?: any;
  listEmployee: any;
  selectedMemberList: any;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  zIndex: 21
};
// interface Member {
//   id: number;
//   position: string;
//   name: string;
// }
// const [employeeData, setEmployeeData] = useState<Member | null>(null);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://hrm-server-api.onrender.com/api/employees');
//       const data = await response.json();
//       setEmployeeData(data.data);
//       console.log(data.data)
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   fetchData();
// }, []);
const findOption = (list: any, value: any) => {
  return list.find((item: any) => item?.value === value);
};
function MemberModal({ visible, onClose, initialValues, onAdd, listEmployee, selectedMemberList }: Props) {
  const [positionValues, setPositionValues] = useState<any>(initialValues.name || '');
  const methods = useForm<FormMemberType>({
    resolver: yupResolver(formMemberSchema),
    defaultValues: {
      member: findOption(projectMemberOption, initialValues?.name),
      position: findOption(projectPositionOption, initialValues?.position)
    }
  });
  const {
    formState: { errors },
    control,
    setError,
    trigger,
    getValues,
    reset,
    setValue,
    watch
  } = methods;
  const handleClose = () => {
    onClose();
  };

  const [employeeSelect, setEmployeeSelect] = useState([]);

  const onSubmit = async () => {
    const result = await trigger(['member', 'position']);
    if (!result) {
      Object.keys(errors).map((name: any) => {
        setError(name, { type: 'custom', message: errors[name as keyof FormMemberType]?.message || '' });
      });
      return;
    }

    const { member, position } = getValues();



    const submitData = {
      member: member as any,
      position: position as { label: string; value: string }
    };

    onAdd(submitData);
    handleClose();
    reset();
  };

  useEffect(() => {
    const results = listEmployee.filter(({ id }: any) => !selectedMemberList.some(({ employeeId }: any) => employeeId === id));
    setEmployeeSelect(results);
  }, [getValues()])

  return (
    <Modal open={visible} onClose={handleClose} disableEscapeKeyDown>
      <Box sx={{ ...style }}>
        <Typography
          id='modal-modal-title'
          variant='h5'
          component='h2'
          sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}
        >
          {initialValues?.name ? 'Update member' : 'Assign Member'}
        </Typography>
        <FormProvider {...methods}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel id='project-status-label'>Member</InputLabel>
                <Controller
                  control={control}
                  name='member'
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={listEmployee.filter((member: any) => {
                        const arrExistId = selectedMemberList.map((mem: any) => mem?.member?.id || mem?.employeeId);
                        return !arrExistId.includes(member.id);
                      })}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.member?.message}
                </div>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id='project-status-label'>Position</InputLabel>
                <Controller
                  control={control}
                  name='position'
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={projectPositionOption}
                      isMulti
                      // onChange={(val) => setPositionValues(val)}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.position?.message}
                </div>
              </Grid>
              <Button
                size='medium'
                type='button'
                style={{ margin: '1rem auto', display: 'flex', justifyContent: 'center', marginRight: 0 }}
                variant='contained'
                startIcon={<SaveIcon />}
                onClick={onSubmit}
              >
                Assign
              </Button>
            </Grid>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
export default MemberModal;
