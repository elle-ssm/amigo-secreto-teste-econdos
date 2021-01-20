import path from 'path';

module.exports = {
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'docker',
    database : 'bd_amigo_secreto_econdos'
  },
  searchPath: ['knex', 'public'], //substituicao do client sqlite pelo pg do knexjs.org
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
};
