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
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { expOption, projectTechnicalOption } from '../../../enum';
import { FormSkillType, formSkillSchema } from '../../../utils/rules';

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

function SkillModal({ visible, onClose, initialValues, onFinish }: Props) {
  const [skillValue, setSkillValue] = useState<any>(initialValues.member || '');
  const methods = useForm<FormSkillType>({
    resolver: yupResolver(formSkillSchema),
    defaultValues: {
      skill: initialValues?.skill,
      exp: initialValues?.exp
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
    const result = await trigger(['skill', 'exp']);
    if (!result) {
      Object.keys(errors).map((name: any) => {
        setError(name, { type: 'custom', message: errors[name as keyof FormSkillType]?.message || '' });
      });

      return;
    }

    const skill = getValues('skill');
    const exp = getValues('exp');

    // console.log({ member, position });
    onFinish({ skill: skillValue, exp });
    handleClose();
    reset();
  };

  return (
    <Modal open={visible} onClose={handleClose} disableEscapeKeyDown>
      <Box sx={{ ...style }}>
        <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {initialValues?.name ? 'Update Skill' : 'Add Skill'}
        </Typography>
        <FormProvider {...methods}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel id='project-status-label'>Skill</InputLabel>
                <Controller
                  control={control}
                  name='skill'
                  render={({ field }) => (
                    <Autocomplete
                      options={projectTechnicalOption.map((tech: any) => tech.value)}
                      renderInput={(params) => {
                        return <TextField {...params} {...field} variant='outlined' size='small' name='member' />;
                      }}
                      {...field}
                      onChange={(e) => {
                        console.log((e.target as any)?.innerText as any);
                        setSkillValue((e.target as any)?.innerText);
                        setValue('skill', `${(e.target as any)?.innerText as any}`);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.skill?.message}
                </div>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id='project-status-label'>Experience (year)</InputLabel>
                <Controller
                  control={control}
                  name='exp'  
                  render={({ field }) => (
                    <Select
                      size='small'
                      fullWidth
                      labelId='project-status-label'
                      id='project-status'
                      {...field}
                      onChange={field.onChange}
                    >
                      {expOption.map((status: any) => (
                        <MenuItem value={status.value}>{status?.label}</MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.exp?.message}
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

export default SkillModal;
