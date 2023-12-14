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
import { useState } from 'react';
import ReactSelect from 'react-select';

const classNameError = 'mt-1 min-h-[1.25rem] text-red-500';

interface Props {
  visible: boolean;
  onClose: () => void;
  onFinish: (newMember: any) => void;
  initialValues?: any;
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

const findOption = (list: any, value: any) => {
  return list.find((item: any) => item?.value === value);
};

function MemberModal({ visible, onClose, initialValues, onFinish }: Props) {
  const [memberValue, setMemberValue] = useState<any>(initialValues.member || '');
  const methods = useForm<FormMemberType>({
    resolver: yupResolver(formMemberSchema),
    defaultValues: {
      member: findOption(projectMemberOption, initialValues?.member),
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

  const onSubmit = async () => {
    const result = await trigger(['member', 'position']);
    if (!result) {
      Object.keys(errors).map((name: any) => {
        setError(name, { type: 'custom', message: errors[name as keyof FormMemberType]?.message || '' });
      });

      return;
    }

    const member = getValues('member');
    const position = getValues('position');

    // console.log({ member, position });
    onFinish({ member: (member as any)?.value as any, position: (position as any)?.value as any });
    handleClose();
    reset();
  };

  console.log(watch());

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
                  render={({ field }) => <ReactSelect {...field} options={projectMemberOption} />}
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
                  render={({ field }) => <ReactSelect {...field} options={projectPositionOption} />}
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
