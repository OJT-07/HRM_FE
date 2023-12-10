import * as yup from 'yup'

export const formProjectSchema = yup.object({
  name: yup.string().required('Please enter a project name'),
  status: yup.mixed().required('Please select status'),
  startDate: yup.date().required('Please enter a start date')
})

export type FormProjectType = yup.InferType<typeof formProjectSchema>

export const formMemberSchema = yup.object({
  member: yup.mixed().required('Please select member'),
  position: yup.mixed().required('Please select position')
})

export type FormMemberType = yup.InferType<typeof formMemberSchema>
