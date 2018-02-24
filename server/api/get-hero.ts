import { ServerRoute } from 'hapi';
import * as Joi from 'joi';
import * as https from 'https';

export const getHero: ServerRoute = {
  method: 'GET',
  path: '/api/characters/{heroId}',
  options: {
    validate: {
      params: {
        heroId: Joi.number().positive()
      }
    }
  },
  handler: async (request, h) => {
    const heroId = request.params.heroId;
    const { host, url } = request.server.app['remoteAPIConfig'];

    const auth = await request.server.methods['generateAuthParams']();
    const u = `${host.protocol}://${host.name}:${host.port}${url}`;

    return new Promise((resolve, reject) =>
      https.get(`${u}/${heroId}?${auth}`, resp => resolve(resp)).on('error', err => reject(err)));
  }
}
