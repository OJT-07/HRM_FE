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
import ReactSelect from 'react-select';

const classNameError = 'mt-1 min-h-[1.25rem] text-red-500';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (newMember: any) => void;
  initialValues?: any;
  onUpdate: (newSkill: any, index: number) => void;
  selectedSkillList: any;
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

function SkillModal({ visible, onClose, initialValues, onAdd, onUpdate, selectedSkillList }: Props) {
  const [skillValue, setSkillValue] = useState<any>(initialValues.member || '');
  const methods = useForm<FormSkillType>({
    resolver: yupResolver(formSkillSchema),
    defaultValues: {
      name: findOption(projectTechnicalOption, initialValues?.name),
      exp: findOption(expOption, initialValues?.exp)
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
    const result = await trigger(['name', 'exp']);
    if (!result) {
      Object.keys(errors).map((name: any) => {
        setError(name, { type: 'custom', message: errors[name as keyof FormSkillType]?.message || '' });
      });

      return;
    }

    const name = getValues('name');
    const exp = getValues('exp');

    // console.log({ member, position });
    const submitData = { name: (name as any)?.value as any, exp: (exp as any)?.value as any };
    if (initialValues?.name) {
      onUpdate(submitData, initialValues?.indexSkill as number);
    } else {
      onAdd(submitData);
    }
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
                  name='name'
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      options={projectTechnicalOption.filter((skill: any) => {
                        const techArr = selectedSkillList.map((tech: any) => tech.name);
                        return !techArr.includes(skill.value);
                      })}
                    />
                  )}
                />
                <div className={classNameError} style={{ color: 'red' }}>
                  {errors.name?.message}
                </div>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id='project-status-label'>Experience (year)</InputLabel>
                <Controller
                  control={control}
                  name='exp'
                  render={({ field }) => <ReactSelect {...field} options={expOption} />}
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
