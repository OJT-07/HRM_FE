import api from './api';

const EMPLOYEES = '/employees';

export const employeeApi = {
  getAll: (params: any) => {
    return api.get(EMPLOYEES, {
      params
    });
  },

  getUser: (idUser: string | number) => {
    return api.get(`${EMPLOYEES}/${idUser}`);
  },

  add: (body: any) => {
    return api.post(EMPLOYEES, body);
  },
  update: (id: string | number, body: any) => {
    return api.patch(`${EMPLOYEES}/${id}`, body);
  },

  delete: (idUser: any) => {
    return api.delete(`${EMPLOYEES}/${idUser}`);
  }
};
