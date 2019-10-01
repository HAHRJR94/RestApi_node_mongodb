import { Router } from 'express';
import { connect } from '../database';
import { ObjectID } from 'mongodb';
const router = Router();

router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('tasks').find({}).toArray();

    res.json(result);
});

router.post('/', async (req, res) => {
    //Nos conectamos a la db
    const db = await connect();

    //Creamos un objeto que contiene los datos
    const task = {
        title: req.body.title,
        description: req.body.description
    }

    //Insertamos los datos en la db
    const result = await db.collection('tasks').insert(task);

    //Muestra el dato insertado
    res.json(result.ops[0]);
});

router.get('/:id', async (req, res) => {
    //Obtenemos el id que vamos a pasarle a la db
    const { id } = req.params;
    
    //Conecta a la db
    const db = await connect();

    //Obtenemos el resultado de la búsqueda
    const result = await db.collection('tasks').findOne({_id: ObjectID(id)}); //ObjectID convierte un string en un objeto.

    //Lo mostramos
    res.json(result);

});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    const updateTask = {
        title: req.body.title,
        description: req.body.description
    };

    const db = await connect();
    await db.collection('tasks').updateOne({_id: ObjectID(id)}, {$set: updateTask});

    res.json({
        message: `Task ${id} updated`
    });
});

router.delete('/:id', async (req, res) => {
    //Obtenemos el id que nos estan pasando
    const { id } = req.params;

    //Se conecta a la db
    const db = await connect();
    
    //Eliminamos el objeto con el id que le estamos pasando
    const result = await db.collection('tasks').deleteOne({_id: ObjectID(id)});

    //Muestra un mensaje de respuesta al cliente
    res.json({
        message: `Task ${id} deleted`,
        result
    });
});



export default router;