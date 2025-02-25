import type { Core } from '@strapi/strapi';

const todoService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(query) {
    try {
      const data = await strapi.entityService.findMany('plugin::my-strapi-plugin.todo', query);
      if (data.length <= 0) return null;
      else
        return {
          Message: 'Fetched All Todos',
          data,
        };
    } catch (error) {
      throw error;
    }
  },

  async create(data) {
    try {
      return await strapi.entityService.create('plugin::my-strapi-plugin.todo', {
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  async update(id, data) {
    try {
      return await strapi.entityService.update('plugin::my-strapi-plugin.todo', id, {
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      return await strapi.entityService.delete('plugin::my-strapi-plugin.todo', id);
    } catch (error) {
      throw error;
    }
  },
});

export default todoService;
