process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim();

import path     from 'path';
import { argv } from 'yargs';

const config = new Map();

// ------------------------------------
// Environment
// ------------------------------------
config.set('env', process.env.NODE_ENV);
config.set('globals', {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.get('env'))
  },
  'NODE_ENV'     : config.get('env'),
  '__DEV__'      : config.get('env') === 'development',
  '__PROD__'     : config.get('env') === 'production',
  '__DEBUG__'    : !!argv.debug,
  '__DEBUG_NW__' : !!argv.nw
});

// ------------------------------------
// Server
// ------------------------------------
config.set('server_host', 'localhost');
config.set('server_port', process.env.PORT || 4000);

// ------------------------------------
// Webpack
// ------------------------------------
config.set('webpack_port', 3000);
config.set('webpack_public_path',
  `http://${config.get('server_host')}:${config.get('webpack_port')}/`
);

// ------------------------------------
// Project
// ------------------------------------
config.set('path_project', path.resolve(__dirname, '../'));
config.set('dir_src',  'client');
config.set('dir_dist', 'dist');

config.set('vendor_dependencies', [
  'immutable',
  'react',
  'react-redux',
  'react-router',
  'redux',
  'redux-devtools',
  'redux-devtools/lib/react'
]);

// ------------------------------------
// Utilities
// ------------------------------------
const paths = (() => {
  const base    = [config.get('path_project')],
        resolve = path.resolve;

  const project = (...args) => resolve.apply(resolve, [...base, ...args]);

  return {
    project : project,
    src     : project.bind(null, config.get('dir_src')),
    dist    : project.bind(null, config.get('dir_dist'))
  };
})();

config.set('utils_paths', paths);
config.set('utils_aliases', [
  'actions',
  'components',
  'constants',
  'containers',
  'dispatchers',
  'layouts',
  'models',
  'reducers',
  'routes',
  'services',
  'stores',
  'styles',
  'utils',
  'views'
].reduce((acc, x) => ((acc[x] = paths.src(x)) && acc), {}));

export default config;
