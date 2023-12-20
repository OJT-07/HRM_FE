import * as yup from 'yup';

const currentDate = new Date();
const minDate = new Date(currentDate);
minDate.setDate(currentDate.getDate() - 1);

// ====================== Project Schema ======================
export const formProjectSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter a project name')
    .trim('')
    .max(30, 'The name of the project must not exceed 30 characters'),
  status: yup.mixed().required('Please select status'),
  start_date: yup.object().required('Please enter a start date'),
  end_date: yup.object().test({
    name: 'endDate is invalid',
    message: 'The end date must be greater than the start date',
    test: function (value: any) {
      const { start_date } = this.parent as any;

      if (start_date != null && value != null) {
        return start_date < value;
      }

      return start_date != null || value != null;
    }
  }),
  technical: yup.array().required('Please enter technical').min(1, 'Please enter technical'),
  members: yup.array(),
  startDate: yup.date(),
  endDate: yup.date()
});

export type FormProjectType = yup.InferType<typeof formProjectSchema>;

export const formMemberSchema = yup.object({
  member: yup.mixed().required('Please select member'),
  position: yup.mixed().required('Please select position')
});

export type FormMemberType = yup.InferType<typeof formMemberSchema>;

// ====================== Employee Schema ======================
export const formEmployeeSchema = yup.object({
  name: yup
    .string()
    .required('Please enter a full name')
    .trim('')
    .max(25, 'The name of the employee must not exceed 25 characters'),
  address: yup.string().required('Please enter address').trim('').max(25, 'The address must not exceed 25 characters'),
  phone: yup
    .string()
    .required('Please enter contact number')
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Invalid contact number'),
  email: yup
    .string()
    .required('Please enter email')
    .matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email!'),
  join_date: yup.object().required('Please select join date'),
  date_of_birth: yup
    .object()
    .required('Please select date of birth')
    .test('is-at-least-18', 'You must be at least 18 years old', function (value: any) {
      const today = new Date();
      const minDate = new Date(today);
      minDate.setFullYear(minDate.getFullYear() - 18);
      return value <= minDate;
    }),
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
