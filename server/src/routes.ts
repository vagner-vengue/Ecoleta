import express, { request, response } from 'express';
import { celebrate, Joi } from 'celebrate';

import PointsController from "./controllers/PointsController";
import ItemsController from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';

// Creates an instance of Routers, as if it was an alias for: "const app = express()"
const routes = express.Router();

// Creates an instance of a multer, which will capture the file on the POST request.
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// Defines the routes and functions to be called.
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// Defines the route for Points POST request. And 'celebrate' component contains validation rules.
routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    pointsController.create);

export default routes;
