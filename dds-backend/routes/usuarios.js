import express from "express";
import auth from '../auth.js'
import usuarios from "../models/usuariosModel.js";


const router = express.Router();

// Obtener todas los usuarios, con seguridad JWT
router.get('/api/usuarios',
    auth.authenticateJWT,
    async function (req, res, next) {
        try {
            // si llego hasta acá, es porque el token es válido y esta autenticado

            // ahora controlamos autorización, segun el rol
            const user = res.locals.user;
            if (user.rol !== "jefe") {
                return res.status(403).json({ message: "usuario no autorizado!" });
            }

            const items = await usuarios.findAll();
            res.json(items);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
    });

export default router;