import { Server } from 'hapi';
import * as path from 'path';
import { createHash, randomBytes } from 'crypto';

import { getFavorites } from './api/get-favorites';
import { getHero } from './api/get-hero';
import { getHeroList } from './api/get-hero-list';
import { addToFavorites } from './api/add-to-favorites';
import { removeFromFavorites } from './api/remove-from-favorites';
import * as fs from 'fs';

interface RemoteAPIConfig {
  host: { protocol: 'http' | 'https', name: string, port: number };
  url: string;
};

(async () => {

  const config = JSON.parse(
    fs.readFileSync(path.normalize(path.join(__dirname, '../../package.json')) , 'utf8'))['config'];

  const { privateKey, publicKey } = JSON.parse(
    fs.readFileSync(path.normalize(path.join(__dirname, '../../api-keys.json')) , 'utf8'));

  const server = new Server({
    port: config.port,
    host: config.host,
    routes: {
      files: { relativeTo: path.normalize(path.join(__dirname, '../../')) }
    }
  });

  server.app['dataSource'] = config.dataSource as RemoteAPIConfig;
  server.app['favorites'] = {};

  server.method('generateAuthParams', async function(): Promise<string>  {
    const ts = new Date().getTime();
    const hash = createHash('md5').update(ts + privateKey + publicKey).digest('hex');
    return await `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }, { bind: server.app['dataSource'] });

  server.method('getFavorites', async function(sessionId: string): Promise<number[]>  {
    return this[sessionId];
  }, { bind: server.app['favorites'] });

  server.method('addToFavorites', async function(heroId: number, sessionId: string) {
    if (!this['favorites'][sessionId].find(f => f === heroId)) {
      const old = await server.methods['getFavorites'](sessionId);
      this['favorites'][sessionId] = [ heroId ].concat(old).slice(0, this['dataSource'].maxFavorites);
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
