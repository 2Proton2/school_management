/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_api', function (table) {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('api_key').unique().notNullable();
        table.string('token').notNullable();
        table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').index();
        table.timestamp('expires_at').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_api');
};
