import { Core } from '@strapi/strapi';

const todoController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx) {
    try {
      const response = await strapi
        .plugin('my-strapi-plugin')
        .service('todoService')
        .find(ctx.query);
      if (response == null) ctx.throw(404, 'Todos Not Found');
      else return response;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async create(ctx) {
    try {
      if (!ctx.request.body) ctx.throw(400, 'Request Body Required');
      const { title, description } = ctx.request.body;

      if (!title || typeof title !== 'string' || !description || typeof description !== 'string') {
        ctx.throw(400, 'Invalid request body');
      }

      return await strapi
        .plugin('my-strapi-plugin')
        .service('todoService')
        .create(ctx.request.body);
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async update(ctx) {
    try {
      const { body, params } = ctx.request;
      if (!body) ctx.throw(400, 'Request Body Required');
      const { title, description } = body;
      if (
        (!title || typeof title !== 'string') &&
        (!description || typeof description !== 'string')
      ) {
        ctx.throw(400, 'Invalid request body');
      }
      const { id } = params;
      if (!id) ctx.throw(400, 'Id is Required');

      return await strapi.plugin('my-strapi-plugin').service('todoService').update(id, body);
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.request.params;
      if (!id) ctx.throw(400, 'Id is Required');

      return await strapi.plugin('my-strapi-plugin').service('todoService').delete(id);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
});

export default todoController;
