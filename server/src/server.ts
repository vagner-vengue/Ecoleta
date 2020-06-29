import dotenv from 'dotenv';
import express, { request } from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

// Initializes the component for environment variables. 
dotenv.config();

const app = express();

// This allows the ReactJS application domain to access the server. Specific domains could be set if needed.
app.use(cors());

// Defines the 'Request Body' format to be used. (GET)
app.use(express.json());

// Adds the routes to the server.
app.use(routes);

// Adds a static route on the server for 'uploads' folder. Everything on the folder will be acessible for GET requests.
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// Used for data validation.
app.use(errors());

// Door to listen
app.listen(process.env.SERVER_PORT);
