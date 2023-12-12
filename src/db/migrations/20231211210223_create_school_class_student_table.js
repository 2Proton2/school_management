/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public');

    return knex.schema.createTable('school_class_student', function (table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('school_id').unsigned().references('id').inTable('schools');
        table.uuid('class_id').unsigned().references('id').inTable('school_class');
        table.uuid('user_id').unsigned().references('id').inTable('users');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('school_class_student');
};
