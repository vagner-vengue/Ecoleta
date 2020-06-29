import { Request, Response } from "express";
import Knex from '../database/connection';

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await Knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: process.env.SERVER_URL + 'uploads/' + item.image,
            };
        });
        
        return response.json(serializedItems);
    };
}

export default ItemsController;
