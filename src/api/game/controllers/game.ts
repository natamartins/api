/**
 * game controller
 */
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::game.game', () => ({
  populate: async (ctx) => {
    try {
      console.log("Start to populate...")
      await strapi.api.game.services.game.populate()
      ctx.body = 'Finished populating!';
    } catch (err) {
      ctx.body = err
    }
  }
}));
