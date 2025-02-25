export default [
  {
    method: 'GET',
    path: '/',
    // name of the controller file & the method.
    handler: 'controller.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/todo',
    // name of the controller file & the method.
    handler: 'todoController.find',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/todo',
    // name of the controller file & the method.
    handler: 'todoController.create',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/todo/:id',
    // name of the controller file & the method.
    handler: 'todoController.update',
    config: {
      policies: [],
    },
  },
  {
    method: 'DELETE',
    path: '/todo/:id',
    // name of the controller file & the method.
    handler: 'todoController.delete',
    config: {
      policies: [],
    },
  },
];
