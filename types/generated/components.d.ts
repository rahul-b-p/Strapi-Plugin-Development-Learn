import type { Schema, Struct } from '@strapi/strapi';

export interface NameTechnology extends Struct.ComponentSchema {
  collectionName: 'components_name_technologies';
  info: {
    description: '';
    displayName: 'Technology';
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<'rcwfchqa;bjcwenk'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'name.technology': NameTechnology;
    }
  }
}
