import Config from './config/config';

export default {
  connections: [{
    port: Config.port,
    routes: {
      cors: true
    }
  }],
  registrations: [{
      plugin: {
        register: './modules/api',
      },
      options: {
        routes: {
          prefix: '/api'
        }
      }
    },

    // plugins
    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                  response: '*',
                  log: ''
                }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      }
    },
    {
      plugin: {
        register: 'vision'
      }
    },
    {
      plugin: {
        register: 'inert'
      }
    },
    {
      plugin: {
        register: 'lout'
      }
    },
    {
      plugin: {
        register: 'hapi-auth-jwt2'
      }
    }
  ]
};