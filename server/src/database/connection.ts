import knex from 'knex';
import path from 'path';  //Biblioteca padrão do Node.

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),  // Adiciona barra. O __dirname é o diretório do arquivo sendo executado.
    },
    useNullAsDefault: true,
});

export default connection;
