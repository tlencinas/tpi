import express from "express";
import Articulo from "../models/articulosModel.js";
import {Op, ValidationError} from "sequelize";

const router = express.Router();

router.get('/api/articulos', async (req, res) => {

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Articulos'
    // consulta de artículos con filtros y paginacion


    const {nombre, activo} = req.query;

    let filtroNombre = `%${nombre ? nombre : ''}%`;
    let filtroActivo = `%${activo ? activo : ''}%`;

    let expWhere = {
        nombre: { [Op.like]: filtroNombre },
        activo: { [Op.like]: filtroActivo },
    };

    const Pagina = req.query.Pagina ?? 1;
    const TamanoPagina = 10;

    let parameters = {
        attributes: [
            "IdArticulo",
            "Nombre",
            "Precio",
            "Stock",
            "FechaAlta",
            "Activo",
        ],
        order: [["Nombre", "ASC"]],
        where: expWhere,
        offset: (Pagina - 1) * TamanoPagina,
        limit: TamanoPagina,

    };

    const { count, rows} = await Articulo.findAndCountAll(parameters);
    return res.json({ Items: rows, RegistrosTotal: count })

});

router.get("/api/articulos/:id", async (req, res) => {
    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene un Articulo'
    // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
    const id = req.params.id;
    const item = await Articulo.findByPk(id)
    res.json(item);
});

router.post("/api/articulos/", async (req, res) => {
    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'agrega un Articulo'
    /*    #swagger.parameters['item'] = {
                  in: 'body',
                  description: 'nuevo Artículo',
                  schema: { $ref: '#/definitions/Articulos' }
      } */
    try {
        let item = await Articulo.create({
            Nombre: req.body.Nombre,
            Precio: req.body.Precio,
            CodigoDeBarra: req.body.CodigoDeBarra,
            IdCategoria: req.body.IdCategoria,
            Stock: req.body.Stock,
            FechaAlta: req.body.FechaAlta,
            Activo: req.body.Activo,
        });
        res.status(200).json(item.dataValues); // devolvemos el registro agregado!
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validación, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({message : messages});
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
});

router.put("/api/articulos/:id", async (req, res) => {
    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'actualiza un Artículo'
    // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
    /*    #swagger.parameters['Articulo'] = {
                  in: 'body',
                  description: 'Articulo a actualizar',
                  schema: { $ref: '#/definitions/Articulos' }
      } */

    try {
        let item = await Articulo.findOne({
            attributes: [
                "IdArticulo",
                "Nombre",
                "Precio",
                "CodigoDeBarra",
                "IdCategoria",
                "Stock",
                "FechaAlta",
                "Activo",
            ],
            where: { IdArticulo: req.params.id },
        });
        if (!item) {
            res.status(404).json({ message: "Artículo no encontrado" });
            return;
        }
        item.Nombre = req.body.Nombre;
        item.Precio = req.body.Precio;
        item.CodigoDeBarra = req.body.CodigoDeBarra;
        item.IdCategoria = req.body.IdCategoria;
        item.Stock = req.body.Stock;
        item.FechaAlta = req.body.FechaAlta;
        item.Activo = req.body.Activo;
        await item.save();

        // otra forma de hacerlo
        // let data = await articulos.update(
        //   {
        //     Nombre: req.body.Nombre,
        //     Precio: req.body.Precio,
        //     CodigoDeBarra: req.body.CodigoDeBarra,
        //     IdCategoria: req.body.IdCategoria,
        //     Stock: req.body.Stock,
        //     FechaAlta: req.body.FechaAlta,
        //     Activo: req.body.Activo,
        //   },
        //   { where: { IdArticulo: req.params.id } }
        // );
        res.sendStatus(204);
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validación, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n ');
            res.status(400).json({message : messages});
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
});

router.delete("/api/articulos/:id", async (req, res) => {
    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'elimina un Articulo'
    // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

    let bajaFisica = false;

    if (bajaFisica) {
        // baja fisica
        let filasBorradas = await Articulo.destroy({
            where: { IdArticulo: req.params.id },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } else {
        // baja lógica, si esta activo lo desactiva y viceversa
        try {
            let data = await Articulo.sequelize.query(
                "UPDATE articulos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticulo = :IdArticulo",
                {
                    replacements: { IdArticulo: +req.params.id },
                }
            );
            res.sendStatus(200);
        } catch (err) {
            if (err instanceof ValidationError) {
                // si son errores de validación, los devolvemos
                const messages = err.errors.map((x) => x.message);
                res.status(400).json(messages);
            } else {
                // si son errores desconocidos, los dejamos que los controle el middleware de errores
                throw err;
            }
        }
    }
});

export default router;
