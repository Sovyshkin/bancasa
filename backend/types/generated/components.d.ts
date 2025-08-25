import type { Schema, Struct } from '@strapi/strapi';

export interface HomePageBlock1 extends Struct.ComponentSchema {
  collectionName: 'components_home_page_block_1s';
  info: {
    displayName: 'Block_1';
  };
  attributes: {
    promo: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'FOR A LIMITED TIME'>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'BANCASA'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home-page.block-1': HomePageBlock1;
    }
  }
}
