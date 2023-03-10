/**
 * game service
 */
import { factories } from '@strapi/strapi';
const axios = require("axios")

async function getGameInfo(slug) {
  const jsdom = require("jsdom")
  const { JSDOM } = jsdom
  const body = await axios.get(`https://www.gog.com/game/${slug}`)
  const dom = new JSDOM(body.data)

  const description = dom.window.document.querySelector('.description')

  return {
    rating: "BR0",
    short_description: description.textContent.slice(0, 160),
    description: description.innerHTMl
  }
}

export default factories.createCoreService('api::game.game', () => ({
  populate: async (params) => {
    const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`
    const { data: { products } } = await axios.get(gogApiUrl)
    console.log(await getGameInfo(products))
  }
}));
