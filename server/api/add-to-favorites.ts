import { ServerRoute } from 'hapi';
import * as Joi from 'joi';
import * as https from 'https';

export const addToFavorites: ServerRoute = {
  method: 'POST',
  path: '/api/favorites',
  options: {
    validate: {
      headers: {
        sessionId: Joi.string().hex().optional()
      },
      payload: {
        heroId: Joi.number().positive(),
      },
      options: {
        allowUnknown: true
      }
    }
  },
  handler: async (request, h) => {
    const sessionId = await request.server.methods['getSessionId'](request.headers.sessionid);
    const heroId = request.payload['heroId'];
    await request.server.methods['addToFavorites'](heroId, sessionId);

    return { sessionId, favorites: await request.server.methods['getFavorites'](sessionId) };
  }
}
