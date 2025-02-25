const todoSchema = {
  kind: 'collectionType',
  collectionName: 'todos',
  info: {
    singularName: 'todo',
    pluralName: 'todos',
    displayName: 'Todo',
    description: 'A regular content-type',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: false,
    },
  },
  attributes: {
    title: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
    },
    description: {
      type: 'string',
      min: 1,
      max: 100,
      configurable: false,
    },
  },
};

export default todoSchema;
