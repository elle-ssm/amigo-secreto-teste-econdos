import Knex from 'knex';

const connection = Knex( {
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'docker',
    database : 'bd_amigo_secreto_econdos'
  },
  searchPath: ['knex', 'public'],
  useNullAsDefault: true
});

export default connection;
