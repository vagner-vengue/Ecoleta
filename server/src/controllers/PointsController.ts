import { Request, Response, request } from "express";
import Knex from "../database/connection";

class PointsController {

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
        // ** No POST: deve ter no header "Content-Type: application/json"  */

        // Estrutura Javascript
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

        // Imagem é campo obrigatório.
        // Short syntax, poderia ser name: name
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

            // const pointItems = items.map((item_id: number) => {
            //     return {
            //         item_id,
            //         point_id
            //     };
            // });

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
        
        return response.json(
            trxCompleted?
            { id: point_id, ...newPoint } :
            { success: false }
        );
    }
}

export default PointsController;
