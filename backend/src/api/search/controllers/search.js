
'use strict'

module.exports = {
  async find(ctx) {
    const { q } = ctx.request.query
    
    if (!q) {
      return ctx.badRequest('Search query is required')
    }
    
    try {
      // Поиск по категориям
      const categories = await strapi.entityService.findMany('api::category.category', {
        filters: {
          $or: [
            { name: { $containsi: q } },
            { description: { $containsi: q } }
          ]
        },
        populate: '*'
      })
      
      // Поиск по подкатегориям
      const subcategories = await strapi.entityService.findMany('api::subcategory.subcategory', {
        filters: {
          $or: [
            { name: { $containsi: q } },
            { description: { $containsi: q } }
          ]
        },
        populate: '*'
      })
      
      // Поиск по типам
      const types = await strapi.entityService.findMany('api::type.type', {
        filters: {
          $or: [
            { name: { $containsi: q } },
            { description: { $containsi: q } }
          ]
        },
        populate: '*'
      })
      
      // Объединяем результаты
      const results = [
        ...categories.map(item => ({ ...item, type: 'category' })),
        ...subcategories.map(item => ({ ...item, type: 'subcategory' })),
        ...types.map(item => ({ ...item, type: 'type' }))
      ]
      
      return results
    } catch (error) {
      ctx.throw(500, 'Search failed')
    }
  }
}