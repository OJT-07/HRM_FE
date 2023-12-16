import * as yup from 'yup';

const currentDate = new Date();

export const formProjectSchema = yup.object({
  name: yup.string().required('Please enter a project name').trim(''),
  status: yup.mixed().required('Please select status'),
  // start_date: yup
  //   .date()
  //   .required('Please enter a start date')
  //   .min(currentDate.setDate(currentDate.getDate() - 1), 'Start date is not in the past'),
  // end_date: yup.date().test({
  //   name: 'endDate is invalid',
  //   message: 'End date is larger than the start date',
  //   test: function (value: any) {
  //     const { start_date } = this.parent as any;

  //     if (start_date != null && value != null) {
  //       return start_date < value;
  //     }

  //     return start_date != null || value != null;
  //   }
  // }),
  technical: yup.array().required('Please enter technical').min(1, 'Please enter technical'),
  employeesInProject: yup.array().required('Please enter member').min(1, 'Please enter member'),
  description: yup.string()
});

export type FormProjectType = yup.InferType<typeof formProjectSchema>;

export const formMemberSchema = yup.object({
  member: yup.mixed().required('Please select member'),
  position: yup.mixed().required('Please select position')
});

export type FormMemberType = yup.InferType<typeof formMemberSchema>;

export const formEmployeeSchema = yup.object({
  name: yup.string().required('Please enter a full name').trim(''),
  address: yup.string().required('Please enter address').trim(''),
  phone: yup
    .string()
    .required('Please enter contact number')
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Invalid contact number'),
  email: yup
    .string()
    .required('Please enter email')
    .matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email!'),
  join_date: yup.date().required('Please select join date'),
  date_of_birth: yup
    .date()
    .required('Please select date of birth')
    .max(new Date(), 'Date of birth must be in the past'),
  isManager: yup.boolean().required('Please select is manager'),
  skills: yup.array().required('Please enter skill').min(1, 'Please enter skill'),
  description: yup.string()
});

export type FormEmployeeType = yup.InferType<typeof formEmployeeSchema>;

export const formSkillSchema = yup.object({
  name: yup.mixed().required('Please select skill'),
  exp: yup.mixed().required('Please select exp')
});

export type FormSkillType = yup.InferType<typeof formSkillSchema>;
