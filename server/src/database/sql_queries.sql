-- SQLite
SELECT 
  DISTINCT PO.*
FROM points AS PO
  JOIN point_items AS PI 
    ON (PO.id = PI.point_id)
WHERE
  PI.item_id IN (1, 2);
