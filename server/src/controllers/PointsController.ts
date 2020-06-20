import { Request, Response } from "express";
import Knex from "../database/connection";

class PointsController {

    // Returns the list of points, based on the query parameters.
    async index(request: Request, response: Response){
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(i => Number(i.trim()));

        const points = await Knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', 'like', '%' + String(city).trimLeft().trimRight() + '%')
            .where('uf', 'like', '%' + String(uf).trimLeft().trimRight() + '%')
            .distinct()
            .select('points.*');
        
        const serializedPoints = points.map(p => {
            return(
                {
                    ...p,
                    image_url: `http://192.168.15.5:3333/uploads/${p.image}`,
                }
            )
        });

        console.log('http://192.168.15.5:3333/uploads');
        response.json( serializedPoints );
    }

    // Returns details of a specific point
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await Knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.15.5:3333/uploads/${point.image}`,
        };

        const items = await Knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint, items });
    }
    
    async create(request: Request, response: Response){
        // On the POST request header there should be: "Content-Type: application/json".

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        // JS short syntax was used here, but image file does not come with request body.
        // The image comes from the file attribute.
        const newPoint = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        
        const trx = await Knex.transaction();
        
        var trxCompleted = false;
        var point_id = 0;

        try {
            const insertedIds = await trx('points').insert(newPoint);
            point_id = insertedIds[0];

            const pointItems = items
                .split(',')
                .map((item: string) => Number(item.trim()))
                .map((item_id: number) => {
                    return {
                        item_id,
                        point_id
                    };
                });

            await trx('point_items').insert(pointItems);

            await trx.commit();
            trxCompleted = true;
        } catch (error) {
            await trx.rollback();
            console.log('** Rollback in transaction **');
            console.log('Error:' + error);
        }
        
        // If point was created with success, this funtion returns an object with the new poins + point id.
        return response.json(
            trxCompleted?
            { id: point_id, ...newPoint } :
            { success: false }
        );
    }
}

export default PointsController;
