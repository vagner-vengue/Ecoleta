import express, { request } from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes'; // importa o arquivo com as rotas, criado por mim.
import { errors } from 'celebrate';

const app = express();

// Usado para permitir que a aplicação ReactJS possa acessar o servidor
app.use(cors());

// Define o tipo de formato que será utilizado para 'Request Body' (GET).
app.use(express.json());

// Adiciona as rotas ao servidor.
app.use(routes);

// Adiciona uma rota estática ao servidor. Tudo o que está neste diretório ficará acessível com GET. O '..' volta um diretório.
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Para validação dos dados.
app.use(errors());

app.listen(3333); /// Door to listen
