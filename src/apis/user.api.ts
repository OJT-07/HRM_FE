import api from "./api"

const params = {
    page: 1,
    limit: 10
}

export const userApi = {
    getAllUser: (params: any) => {
        return api.get('/users/all', { // https://some-domain.com/api/users/all?page=1&limit=10
            params: params
        })
    },

    getOneUser: (idUser: any) => {
        return api.get(`/users/${idUser}`);
    },

    addUser: (body: any) => {
        return api.post('/users', {
            body: body
        })
    },

    updateUser: (body: any) => {
        return api.put('/users', {
            body: body
        })
    },

    deleteUser: (idUser: any) => {
        return api.delete(`/users/${idUser}`)
    }
}