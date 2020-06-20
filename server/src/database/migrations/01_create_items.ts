import Knex from 'knex';

// On this file, it's mandatory to have two exported functions: "up" and "down".

export async function up(knex: Knex){
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('items');
}
