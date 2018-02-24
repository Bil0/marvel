import { ServerRoute } from 'hapi';
import * as Joi from 'joi';
import * as https from 'https';

export const removeFromFavorites: ServerRoute = {
  method: 'DELETE',
  path: '/api/favorites/{heroId}',
  options: {
    validate: {
      headers: {
        sessionId: Joi.string().hex().optional()
      },
      params: {
        heroId: Joi.number().positive(),
      },
      options: {
        allowUnknown: true
      }
    }
  },
  handler: async (request, h) => {
    const sessionId = await request.server.methods['getSessionId'](request.headers.sessionid);
    const heroId = request.params['heroId'];
    await request.server.methods['removeFromFavorites'](heroId, sessionId);

    return { sessionId, favorites: await request.server.methods['getFavorites'](sessionId) };
  }
}
