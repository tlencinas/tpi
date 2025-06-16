import express from "express";
import {Op} from "sequelize";
import Categorias from "../models/categoriasModel.js";

const router = express.Router();


router.get('/api/categorias', async (req, res) => {
    try {
        const {nombre} = req.query;
        let filtro = `%${nombre ? nombre.toUpperCase() : ''}%`;

        let expWhere = {
            nombre: { [Op.like]: filtro },
        };

        let parameters = {
            where: expWhere
        };

        const all_categorias = await Categorias.findAll(parameters);

        res.json(all_categorias);
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener todas las categorías.'});
    }
});

router.get('/api/categorias/:id', async (req, res) => {
    const id = req.params.id;
    const cat = await Categorias.findByPk(id);
    res.json(cat);
});

export default router;