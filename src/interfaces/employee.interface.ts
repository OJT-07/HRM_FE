import { GetListParams } from './common.interface';

export interface GetEmployeeParams extends GetListParams {}

export interface CreateEmployeeInterface {
  name: string;
  email: string;
  phoneNumber: string;
  storeIds: string[];
  roleIds: string[];
  dateOfBirth: string;
  fileUpload: File;
}
export interface UpdateEmployeeInterface {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  storeIds: string[];
  roleIds: string[];
  dateOfBirth: string;
  fileUpload: File;
}

export interface EmployeeInterface {
  id: string;
  status: string;
  name: string;
  roles: [];
  phoneNumber: string;
  dateOfBirth: string;
  imageUrl: string;
}
