import { Request, Response } from "express";
import Knex from '../database/connection';

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await Knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.15.5:3333/uploads/${item.image}`,  // IP of your API server, with door 3333.
            };
        });
        
        return response.json(serializedItems);
    };
}

export default ItemsController;
