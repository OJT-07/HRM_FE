import api from './api';

const PROJECTS = '/projects';

export const projectApi = {
  getAll: (params: any) => {
    return api.get(PROJECTS, {
      params: params
    });
  },

  getProject: (id: string | number) => {
    return api.get(`${PROJECTS}/${id}`);
  },

  add: (body: any) => {
    return api.post(PROJECTS, body);
  },
  update: (id: string | number, body: any) => {
    return api.patch(`${PROJECTS}/${id}`, body);
  },

  delete: (id: any) => {
    return api.delete(`${PROJECTS}/${id}`);
  }
};
