import { request } from '@strapi/helper-plugin';

const todoRequests = {
  getAllTodos: async () => {
    return await request('/api/my-strapi-plugin/todo', {
      method: 'GET',
    });
  },
};

export default todoRequests;
