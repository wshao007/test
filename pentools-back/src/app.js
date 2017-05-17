import Glue from 'glue';
import manifest from './manifest';
import Config from './config/config';
import { Database } from './models';

const options = {
  relativeTo: __dirname
};

Glue.compose(manifest, options, (err, server) => {

  if (err) {
    throw err;
  }

  server.start(() => {

    console.log('Server Starts on ' + Config.port + '!');
  });
});