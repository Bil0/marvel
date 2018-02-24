import { Server } from 'hapi';
import * as path from 'path';
import { createHash, randomBytes } from 'crypto';

import { getFavorites } from './api/get-favorites';
import { getHero } from './api/get-hero';
import { getHeroList } from './api/get-hero-list';
import { addToFavorites } from './api/add-to-favorites';
import { removeFromFavorites } from './api/remove-from-favorites';

interface RemoteAPIConfig {
  host: { protocol: 'http' | 'https', name: string, port: number };
  url: string;
  publicKey: string;
  privateKey: string;
};

(async () => {

  const server = new Server({
    port: 3456,
    host: 'localhost',
    routes: {
      files: { relativeTo: path.normalize(path.join(__dirname, '../../')) }
    }
  });

  server.app['remoteAPIConfig'] = {
    host: { protocol: 'https', name: 'gateway.marvel.com', port: 443 },
    publicKey: 'f6ef908792f697973acc37c5f0f89c4d',
    url: '/v1/public/characters',
    maxFavorites: 5
  } as RemoteAPIConfig;

  server.app['favorites'] = {};

  server.method('generateAuthParams', async function(): Promise<string>  {
    const ts = new Date().getTime();
    const hash = createHash('md5').update(ts + this.privateKey + this.publicKey).digest('hex');
    return await `ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
  }, { bind: server.app['remoteAPIConfig'] });

  server.method('getFavorites', async function(sessionId: string): Promise<number[]>  {
    return this[sessionId];
  }, { bind: server.app['favorites'] });

  server.method('addToFavorites', async function(heroId: number, sessionId: string) {
    if (!this['favorites'][sessionId].find(f => f === heroId)) {
      const old = await server.methods['getFavorites'](sessionId);
      this['favorites'][sessionId] = [ heroId ].concat(old).slice(0, this['remoteAPIConfig'].maxFavorites);
    }
  }, { bind: server.app });

  server.method('removeFromFavorites', async function(heroId: number, sessionId: string) {
    this['favorites'][sessionId] = this['favorites'][sessionId].filter(f => f !== heroId);
  }, { bind: server.app });

  server.method('getSessionId', async function(sessionId: string): Promise<string>  {
    return this[sessionId] ? sessionId : server.methods['createSessionId']();
  }, { bind: server.app['favorites'] });

  server.method('createSessionId', async function() {
    const sessionId = createHash('sha')
      .update(new Date().getTime() + randomBytes(256).toString('hex'))
      .digest('hex');
    this[sessionId] = [];
    return sessionId;
  }, { bind: server.app['favorites'] });

  await server.register({ plugin: require('inert') });

  server.route(getHero);
  server.route(getHeroList);
  server.route(getFavorites);
  server.route(addToFavorites);
  server.route(removeFromFavorites);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'dist/',
        index: true
      }
    }
  });

  [ '/', '/heroes/{page*}', '/favorites' ].forEach(p => {
    server.route({
      method: 'GET',
      path: p,
      handler: {
        file: 'dist/index.html'
      }
    })
  });

  try {
    await server.start();
    console.log('Server started');
  } catch (err) {
    console.error(err);
  }

})();
