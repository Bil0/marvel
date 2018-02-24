import { Server } from 'hapi';
import * as path from 'path';

//import { getFavorites } from './api/get-favorites';
//import { getHero } from './api/get-hero';
//import { getHeroList } from './api/get-hero-list';

(async () => {

  const server = new Server({
    port: 3456,
    host: 'localhost',
    routes: {
      files: { relativeTo: path.normalize(path.join(__dirname, '../../')) }
    }
  });

  await server.register({ plugin: require('inert') });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'dist/',
        index: true
      }
    }
  })

  //server.route(getFavorites);
  //server.route(getHero);
  //server.route(getHeroList);

  try {
    await server.start();
    console.log('Server started');
  } catch (err) {
    console.error(err);
  }

})();
