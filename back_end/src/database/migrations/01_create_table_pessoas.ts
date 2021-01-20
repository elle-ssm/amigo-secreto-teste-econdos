import Knex from 'knex';

export async function up(knex:Knex){ //variavel knex do tipo Knex
  return knex.schema.createTable('pessoas', table =>{
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
  })
}; 

export async function down(knex:Knex){
  return knex.schema.dropTable('pessoas');
}