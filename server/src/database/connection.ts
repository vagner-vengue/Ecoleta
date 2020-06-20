import knex from 'knex';  // Installed lib.
import path from 'path';  // Standard lib from Node.

const connection = knex({
    client: 'sqlite3',
    connection: {
        // Resolve function adds the backslash. And __dirname is the current directory, where this file is.
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;
