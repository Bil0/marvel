import { ServerRoute } from 'hapi';
import * as Joi from 'joi';
import * as https from 'https';

export const getHeroList: ServerRoute = {
  method: 'GET',
  path: '/api/characters',
  options: {
    validate: {
      query: {
        offset: Joi.number().min(0).default(0),
        limit: Joi.number().positive().default(20)
      }
    }
  },
  handler: async (request, h) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const { host, url } = request.server.app['remoteAPIConfig'];

    const auth = await request.server.methods['generateAuthParams']();
    const u = `${host.protocol}://${host.name}:${host.port}${url}`;
    const params = `limit=${limit}&offset=${offset}&${auth}`;

    return new Promise((resolve, reject) =>
      https.get(`${u}?${params}`, resp => resolve(resp)).on('error', err => reject(err)));
  }
}
