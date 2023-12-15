import baseAxios from '@app/configs/api';
import { API_URL } from '@app/constants';
import { CreateEmployeeInterface, GetEmployeeParams, UpdateEmployeeInterface } from '@app/interfaces';

export const getEmployeesApi = async (params: GetEmployeeParams) => await baseAxios.get(API_URL.EMPLOYEES, { params });

export const GetEmployeeApi = async (id: string) => await baseAxios.get(`${API_URL.EMPLOYEES}/${id}`);

export const EmployeeCreateApi = (user: CreateEmployeeInterface) =>
  baseAxios.post(API_URL.EMPLOYEES, user, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000
  });

export const EmployeeUpdateApi = (params: UpdateEmployeeInterface) =>
  baseAxios.put(`${API_URL.EMPLOYEES}/${params.id}`, params);
